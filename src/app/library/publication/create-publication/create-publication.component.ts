import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from 'app/services/base-service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-publication',
  templateUrl: './create-publication.component.html',
  styleUrls: ['./create-publication.component.scss']
})
export class CreatePublicationComponent implements OnInit {
	newForm: FormGroup;
	formSubmitAttempt = false;

	constructor(private router: Router,
		private spinner: NgxSpinnerService,
		private translate: TranslateService,
		private toastr: ToastrService,
		private fb: FormBuilder,
		public datepipe: DatePipe,
		private cdr: ChangeDetectorRef,
		private baseService: BaseService,
		private translatedToastr: TranslatedToastrService,
		private authService: AuthService) { }

	ngOnInit(): void {
		this.initializeForm();
		this.fetchEssentialData();
	}

	initializeForm() {

		this.newForm = this.fb.group({
			srNo: [null, [Validators.required]],
			host: [null],
			remarks: null,
			visitSource: [null],
			visitSubject: [null, [Validators.required]],
			visitCategory: ["NORMAL", [Validators.required]],
			visitType: ["OFFICIAL", [Validators.required]],
			hasVehicle: [false, [Validators.required]],
		});
	}

	fetchEssentialData() {
	}

	getError(formControlName: string) {
		if (formControlName) {
			if ((!this.newForm.get(formControlName).valid && this.newForm.get(formControlName).touched) ||
				(this.newForm.get(formControlName).untouched && this.formSubmitAttempt)
			) {
				let error_msg = '';
				// return this.newForm.errors[formControlName];
				let errors = this.newForm.get(formControlName).errors;
				if(errors && errors.required) {
					error_msg += this.translate.instant('FIELD_IS_REQUIRED');
				}
				return error_msg;
			}
			return;
		}
	}

	onSubmit() {
		console.log(this.newForm.value);
		this.formSubmitAttempt = true;
		if (this.newForm.invalid) {
			this.translatedToastr.error("ERROR", "FORM_INVALID_MSG");
            document.getElementById('newForm').classList.add('input-error');
        } else {
            this.submit();
        }
	}

	submit() {
        let obj = this.newForm.value;
		// obj['visitDate'] = this.currentDate;
		// obj['visitTime'] = this.currentTime;
        // console.log('Prepared data: ', obj);
		// obj = this.setAttrWithNullToBlank(obj)

        // this.spinner.show();
        // this.visitService.addRecord(obj).subscribe(res => {
        //     this.spinner.hide();
		// 	this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
		// 	this.router.navigateByUrl(`/reception/visits`);
        // }, err => {
        //     this.spinner.hide();
		// 	this.translatedToastr.error("ERROR", "ERR_MSG");
		// 	this.authService.checkUserLogin();
        // })

    }


}
