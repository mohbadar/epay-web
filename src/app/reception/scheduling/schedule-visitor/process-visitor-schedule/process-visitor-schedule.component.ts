import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CapturePhotoComponent } from 'app/reception/visit/capture-photo/capture-photo.component';
import { VisitorService } from 'app/reception/visitor/visitor.service';
import { BaseService } from 'app/services/base-service';
import { DateConvertService } from 'app/services/date-convert.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-process-visitor-schedule',
  templateUrl: './process-visitor-schedule.component.html',
  styleUrls: ['./process-visitor-schedule.component.scss'],
})
export class ProcessVisitorScheduleComponent implements OnInit {
	@Output() response: EventEmitter<any> = new EventEmitter();
	@Input() data: any;
	prcessForm: FormGroup;
	visitorPhotoURL;
	currentDate;
	currentTime;
	formSubmitAttempt = false;

	visitId;
	visitorId;

	statuses$ = [
		{ "id": "DONE","name": "DONE"},
		{ "id": "CANCELED","name": "CANCELED"},
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
		private visitorService: VisitorService) { }

	ngOnInit(): void {
		this.initializeForm();
		this.populateForm();
	}

	initializeForm() {
		this.currentDate = this.dConvert.convertToDariDate(this.baseService.getTodayDate());
		this.currentTime = this.baseService.getCurrentTime();

		this.prcessForm = this.fb.group({
			visitId: [null, [Validators.required]],
			visitorId: [null, [Validators.required]],
			status: ['DONE', [Validators.required]],
			photo: [null, [Validators.required]],
		});
	}

	populateForm() {
		this.visitId = this.data['VISIT_ID']
		this.visitorId = this.data['ID']
		this.prcessForm.get('visitId').setValue(this.visitId);
		this.prcessForm.get('visitorId').setValue(this.visitorId);
	}

	capturePhoto() {
		const modalRef = this.modalService.open(CapturePhotoComponent, {
			centered: true, size: 'md', backdrop:  true, keyboard: false
		});

		modalRef.componentInstance.capturePhoto.subscribe((photo) => {
			console.log(photo);
			this.visitorPhotoURL = photo.imageAsDataUrl;
			this.prcessForm.get('photo').setValue(this.visitorPhotoURL);
		});
	}

	imageError(el) {
		el.onerror = '';
		el.src = '../../../../assets/img/portrait/small/face-0.png';
		return true;
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
		obj['entryDate'] = this.currentDate;
		obj['entryTime'] = this.currentTime;

        this.spinner.show();
        this.visitorService.processRecord(this.visitId, this.visitorId, obj).subscribe(res => {
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
