import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from 'app/services/base-service';
import { DateConvertService } from 'app/services/date-convert.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { TransportService } from 'app/transportation/transport.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-process-request',
  templateUrl: './process-request.component.html',
  styleUrls: ['./process-request.component.scss']
})
export class ProcessRequestComponent implements OnInit {
	@Input() data: any;
	@Output() response: EventEmitter<any> = new EventEmitter();
	requestId;
	prcessForm: FormGroup;
	currentDate;
	currentTime;
	formSubmitAttempt = false;

	showComment = false;
	drivers$;
	vehicles$;

	statuses$ = [
		{ "id": "COMPLETED","name": "COMPLETED"},
		{ "id": "REJECTED","name": "REJECTED"},
	];

	constructor(private spinner: NgxSpinnerService,
		private translate: TranslateService,
		public activeModal: NgbActiveModal,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private baseService: BaseService,
		private dConvert: DateConvertService,
		private translatedToastr: TranslatedToastrService,
		private authService: AuthService,
		private modalService: NgbModal,
		private requestService: RequestService,
		private transportService: TransportService) { }

	ngOnInit(): void {
		this.initializeForm();
		this.populateForm();
	}

	initializeForm() {
		this.currentDate = this.dConvert.convertToDariDate(this.baseService.getTodayDate());
		this.currentTime = this.baseService.getCurrentTime();

		this.prcessForm = this.fb.group({
			driverId: [null, [Validators.required]],
			vehicleId: [null, [Validators.required]],
			resolution: ['COMPLETED', [Validators.required]],
			processedComment: [""]
		});
	}

	populateForm() {
		this.requestId = this.data['ID'];
		this.drivers$=this.transportService.getDrivers();
		this.vehicles$=this.transportService.getVehicles();
	}

	toggleStatus(event) {
		console.log(event);
		if(event == 'REJECTED') {
			this.prcessForm.get("processedComment").setValidators([Validators.required]);
			this.prcessForm.get("driverId").clearValidators();
			this.prcessForm.get("vehicleId").clearValidators();
			this.showComment = true;
		} else {
			this.prcessForm.get("processedComment").clearValidators();
			this.prcessForm.get("driverId").setValidators([Validators.required]);
			this.prcessForm.get("vehicleId").setValidators([Validators.required]);
			this.showComment = false;
		}
		this.prcessForm.get("processedComment").updateValueAndValidity();
	}

	getError(formControlName: string) {
		if (formControlName) {
			if ((!this.prcessForm.get(formControlName).valid && this.prcessForm.get(formControlName).touched) ||
				(this.prcessForm.get(formControlName).untouched && this.formSubmitAttempt)
			) {
				let error_msg = '';
				// return this.newForm.errors[formControlName];
				let errors = this.prcessForm.get(formControlName).errors;
				if(errors && errors.required) {
					error_msg += this.translate.instant('FIELD_IS_REQUIRED');
				}
				return error_msg;
			}
			return;
		}
	}

	onFormSubmit() {
		console.log(this.prcessForm.value);
		this.formSubmitAttempt = false;
		if (this.prcessForm.invalid) {
			this.translatedToastr.error("ERROR", "FORM_INVALID_MSG");
            document.getElementById('prcessForm').classList.add('input-error');
        } else {
            this.submit();
        }
	}

	submit() {
        let obj = this.prcessForm.value;
        this.spinner.show();
        this.requestService.processRequest(this.requestId, obj).subscribe(res => {
            this.spinner.hide();
			this.response.emit(res);
			this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
			this.closeModal();
        }, err => {
            this.spinner.hide();
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
        });

    }

	closeModal() {
		this.activeModal.close();
	}

}
