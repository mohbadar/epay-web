import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { RequestService } from './../request.service';
import { BaseService } from 'app/services/base-service';
import {TransportService} from 'app/transportation/transport.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Globals } from 'app/_helpers/globals';


@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {
	@Output() response: EventEmitter<any> = new EventEmitter();
	newForm: FormGroup;
	spinners = false;
	currentDate;
	currentTime;
	minDate;
	departments$;
	drivers$;
	vehicles$;
	isRequest = false;
	
	showReturnTime = false;
	constructor(private router: Router, private route: ActivatedRoute,
		private spinner: NgxSpinnerService,
		private translate: TranslateService,
		private toastr: ToastrService,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private baseService: BaseService,
		private dConvert: DateConvertService,
		private translatedToastr: TranslatedToastrService,
		private authService: AuthService,
		private globals: Globals,
		private activeModal: NgbActiveModal,
		private requestService: RequestService,
		private transportService:TransportService,) { }

	ngOnInit(): void {
		if(!this.globals.principal.hasAuthority(["TRANSPORTATION_MODULE", "TRANS_REQUEST_CREATE"])) {
			return;
		}

		if(this.route.snapshot.url[1].path == "requests") {
			this.isRequest = true;
			console.log("Request");
		}

		const current = new Date();
		this.minDate = {
			year: current.getFullYear(),
			month: current.getMonth() + 1,
			day: current.getDate()
		}
		this.initializeForm();
		this.fetchEssentialData();
	}

	initializeForm() {
    	this.currentDate = this.dConvert.convertToDariDate(this.baseService.getTodayDate());
		this.currentTime = this.baseService.getCurrentTime();
		this.newForm = this.fb.group({
			requestingDepartmentId: [null, [Validators.required]],
			hasReturn: [false, [Validators.required]],
			pickupLocation: ["", [Validators.required]],
			dropOffLocation:["", [Validators.required]],
			pickupDate: [this.currentDate, [Validators.required]],
			pickupTime: [this.currentTime, [Validators.required]],
			returnTime:[null],
			details:[null, [Validators.required]],
		});
	}

	fetchEssentialData() {
		this.departments$ = this.baseService.getDepartmentList();
		// this.drivers$=this.transportService.getDrivers();
		// this.vehicles$=this.transportService.getVehicles();
	}

	updateFormValueAndValidity() {
		this.newForm.get("returnTime").updateValueAndValidity();
	}

	toggleReturnTime() {
		let hasReturn = this.newForm.get('hasReturn').value;
		if (hasReturn) {
			this.newForm.get("returnTime").setValidators([Validators.required]);
			this.showReturnTime = true;
		} else {
			this.newForm.get("returnTime").clearValidators();
			this.showReturnTime = false;
		}
		this.updateFormValueAndValidity();
	}

	closeModal() {
        this.activeModal.close();
    }

	submitForm() {
		if (this.newForm.invalid) {
			this.translatedToastr.error("ERROR", "FORM_INVALID_MSG");
            document.getElementById('newForm').classList.add('input-error');
        } else {
            this.submit();
        }
	}
	submit() {
        let obj = this.newForm.value;
        console.log("date", obj);
        this.spinner.show();
        this.requestService.addRecord(obj).subscribe(res => {
			console.log(res);
            this.spinner.hide();
			this.response.emit(res);
			this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
			this.router.navigateByUrl(`/transport/requests/my`);
			this.closeModal();
        }, err => {
            this.spinner.hide();
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
        });
    }
}
