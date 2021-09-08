import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DocMngService } from 'app/doc-mng/doc-mng.service';
import { BaseService } from 'app/services/base-service';
import { DateConvertService } from 'app/services/date-convert.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { QuillEditorComponent } from 'ngx-quill';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DocumentTypeTemplateService } from '../document-type-template.service';

export class UploadAdapter {
	private loader;
	constructor( loader ) {
	   this.loader = loader;
	}
  
	upload() {
	   return this.loader.file
			 .then( file => new Promise( ( resolve, reject ) => {
				   var myReader= new FileReader();
				   myReader.onloadend = (e) => {
					  resolve({ default: myReader.result });
				   }
  
				   myReader.readAsDataURL(file);
			 } ) );
	};
}

@Component({
  selector: 'app-edit-document-type-template',
  templateUrl: './edit-document-type-template.component.html',
  styleUrls: ['./edit-document-type-template.component.scss']
})
export class EditDocumentTypeTemplateComponent implements OnInit {
	editorConfig = {
		height: 500,
		menubar: true,
		plugins: [
			'print preview advlist autolink lists link image charmap print preview anchor',
			'searchreplace visualblocks code fullscreen',
			'insertdatetime media table paste code directionality help wordcount'
		],
		toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | ltr rtl | bullist numlist outdent indent | image removeformat | help',
		automatic_uploads: true,
		file_picker_types: 'image',
        directionality :"rtl"
	};

	@ViewChild('editor', {static: true}) editor: QuillEditorComponent
	editForm: FormGroup;
	formSubmitAttempt = false;
	departments$;
	documentTypesList;
	currentDate;
	currentTime;
	dataLoadingFlag = true;
	data: any;
	documentid:any;
	documentTypeTemplate:any;

	constructor(private router: Router, private route: ActivatedRoute,
			private spinner: NgxSpinnerService, private translate: TranslateService,
			private toastr: ToastrService, private fb: FormBuilder,
			private cdr: ChangeDetectorRef, private baseService: BaseService,
			private docMngService: DocMngService,
			private dConvert: DateConvertService, private translatedToastr: TranslatedToastrService,
			private authService: AuthService, private documentTypeTemplateService: DocumentTypeTemplateService) { }

	ngOnInit(): void {
		this.currentDate = this.dConvert.convertToDariDate(this.baseService.getTodayDate());
		this.currentTime = this.baseService.getCurrentTime();
		this.documentid = this.route.snapshot.paramMap.get('id');
		this.getRecord(this.documentid);
		this.fetchEssentialData();
	}

	fetchEssentialData() {
		this.departments$ = this.baseService.getDepartmentList();
		this.docMngService.getAllDocumentTypesList().subscribe((data: any) => {
			this.documentTypesList = data;
		});
	}

	getRecord(id) {
		this.spinner.show();
		this.documentTypeTemplateService.getRecordById(id).subscribe((res: any) => {
			console.log("Document", res);
			this.documentTypeTemplate = res.template;
			this.editForm = this.fb.group({
				entityId: [this.documentTypeTemplate.entity.id, [Validators.required]],
				departmentId: [this.documentTypeTemplate.department.id, [Validators.required]],
				template: [this.documentTypeTemplate.template, [Validators.required]],
				documentTypeId:[{ value: this.documentTypeTemplate.documentType.id, disabled: true }, [Validators.required]]
			});
			this.spinner.hide();
		}, err => {
			this.spinner.hide();
			this.translatedToastr.error("DECREE", "FETCHING_ERR_MSG");
			this.authService.checkUserLogin();
		});
	}

	getError(formControlName: string) {
		if (formControlName) {
			if ((!this.editForm.get(formControlName).valid && this.editForm.get(formControlName).touched) ||
			(this.editForm.get(formControlName).untouched && this.formSubmitAttempt)
			) {
			let error_msg = '';
			// return this.editForm.errors[formControlName];
			let errors = this.editForm.get(formControlName).errors;
			if(errors && errors.required) {
				error_msg += this.translate.instant('FIELD_IS_REQUIRED');
			}
			return error_msg;
			}
			return;
		}
	}

	onSubmit() {
		console.log(this.editForm.value);
		this.formSubmitAttempt = true;
		if (this.editForm.invalid) {
			this.translatedToastr.error("ERROR", "FORM_INVALID_MSG");
			document.getElementById('editForm').classList.add('input-error');
		} else {
			this.submit();
		}
	}

	submit() {
		let obj = this.editForm.getRawValue();
		this.spinner.show();
		this.documentTypeTemplateService.editRecord(this.documentid, obj).subscribe(res => {
			this.spinner.hide();
			this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
			this.router.navigateByUrl(`/doc_mng/config/document_type_templates`);
		}, err => {
			this.spinner.hide();
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
		});

	}

}
