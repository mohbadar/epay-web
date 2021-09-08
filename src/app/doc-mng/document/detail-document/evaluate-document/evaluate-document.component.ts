import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from 'app/services/base-service';
import { DateConvertService } from 'app/services/date-convert.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { Globals } from 'app/_helpers/globals';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DocumentService } from '../../document.service';
import { FollowUpDocumentService } from '../follow-up-document/follow-up-document.service';

@Component({
  selector: 'app-evaluate-document',
  templateUrl: './evaluate-document.component.html',
  styleUrls: ['./evaluate-document.component.scss']
})
export class EvaluateDocumentComponent implements OnInit {
	@Output() response = new EventEmitter<Object>();
	@Input() docId;
	@Input() document;
	newForm;
	formSubmitAttempt = false;
	departments$;
	pursuable = false;

	loading = false;
	modelType: boolean = false;
	users$;
	followUp: boolean = false;
	

	constructor(
		public activeModal: NgbActiveModal,
		private ref: ChangeDetectorRef,
		public spinner: NgxSpinnerService,
		private formBuilder: FormBuilder,
		public translate: TranslateService,
		private translatedToastr: TranslatedToastrService,
		public toastr: ToastrService, private baseService: BaseService,
		private followUpDocumentService: FollowUpDocumentService,
		private documentService: DocumentService,
		private cdr: ChangeDetectorRef, private authService: AuthService,
		public globals: Globals,
		private dateService: DateConvertService
	) { }

	ngOnInit(): void {
		this.followUp = this.document.followup;
		if(this.followUp){
			this.pursuable = true;
		}
		console.log("document data: ", this.followUp);
		// this.fetchEssentialData();
		// this.populateForm();
		// if(this.document.referredDepartment) {
			// this.newForm = this.formBuilder.group({
			// 	followup: [this.followUp],
			// 	dueDate: [(this.document.dueDate == null? null: this.dateService.convertToDariDate(this.document.dueDate))],
			// });
		// } else {
		// 	this.newForm = this.formBuilder.group({
		// 		followup: [this.followUp],
		// 		dueDate: [(this.document.dueDate == null? null: this.dateService.convertToDariDate(this.document.dueDate))],
		// 		referredDepartmentId: [(this.document.referredDepartment == null? null: this.document.referredDepartment.id), [Validators.required]],
		// 		ccDepartmentsIds: [null],
		// 		content: [null],
		// 	});
		// }
		this.initializeForm();
	}

	initializeForm() {
		this.newForm = this.formBuilder.group({
			followup: [this.followUp],
			dueDate: [(this.document.dueDate == null? null: this.dateService.convertToDariDate(this.document.dueDate))],
		});
	}

	changeScope(event){
		if (event.target.defaultValue === 'YES') {
			this.pursuable = true;
			this.newForm.get("dueDate").setValidators([Validators.required]);
			this.newForm.get('followup').setValue(true);

			}
		  else if (event.target.defaultValue === 'NO') {
			this.newForm.get("dueDate").clearValidators();
			this.pursuable = false;
			this.newForm.get('followup').setValue(false);
			this.newForm.get('dueDate').setValue(null);
		  }
	}

	// populateForm(){
		// if(this.document.followup) {
			// this.pursuable = true;
			// this.newForm.patchValue({
			// 	followup: this.document.followup,
			// 	dueDate: this.document.dueDate,
			// 	referredDepartmentId: this.document.referredDepartment.id
			// });
		// }
	// }

	// fetchEssentialData() {
	// 	this.departments$ = this.baseService.getDepartmentList();
	// }

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
        this.spinner.show();
		console.log("all Data: ", obj);
        this.documentService.evaluateDocument(this.docId, obj).subscribe(res => {
			console.log(res);
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
}
