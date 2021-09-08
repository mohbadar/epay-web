import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DocMngService } from 'app/doc-mng/doc-mng.service';
import { BaseService } from 'app/services/base-service';
import { DateConvertService } from 'app/services/date-convert.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
	newForm: FormGroup;
	formSubmitAttempt = false;
	departments$;
	
	constructor(private router: Router, private route: ActivatedRoute,
		private spinner: NgxSpinnerService, private translate: TranslateService,
		private toastr: ToastrService, private fb: FormBuilder,
		private cdr: ChangeDetectorRef, private baseService: BaseService,
		private docMngService: DocMngService,
		private dConvert: DateConvertService, private translatedToastr: TranslatedToastrService,
		private authService: AuthService, private employeeService: EmployeeService) { }

	ngOnInit(): void {
		this.initializeForm();
		this.fetchEssentialData();
	}

	initializeForm() {
		this.newForm = this.fb.group({
			documentNo: [null, [Validators.required]],
			documentDate: [null, [Validators.required]],
			fromDepartment: [null, [Validators.required]],
			toDepartment: [null, [Validators.required]],
			ccDepartments:[null],

			document:[null],

			isNewDoc: [true, [Validators.required]],
			title: [null],
			content: [null],
			documentType:[null],
		});
	}

	fetchEssentialData() {
		this.departments$ = this.baseService.getDepartmentList();
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
		this.spinner.show();
		const {documentNo, documentDate, fromDepartment, toDepartment, ccDepartments, document, isNewDoc, title, content, documentType } = this.newForm.value;
		this.employeeService.addRecord({
			documentNo, documentDate, fromDepartmentId: fromDepartment, toDepartmentId: toDepartment, ccDepartmentsIds: ccDepartments, 
			documentId: document, isNewDoc, title, content, documentTypeId: documentType
		}).subscribe(res => {
			this.spinner.hide();
			this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
			this.router.navigateByUrl(`/doc_mng/incoming`);
		}, err => {
			this.spinner.hide();
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
		});

	}

}
