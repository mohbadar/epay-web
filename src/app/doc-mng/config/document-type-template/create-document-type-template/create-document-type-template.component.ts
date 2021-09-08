import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DocMngService } from 'app/doc-mng/doc-mng.service';
import { BaseService } from 'app/services/base-service';
import { DateConvertService } from 'app/services/date-convert.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
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
  selector: 'app-create-document-type-template',
  templateUrl: './create-document-type-template.component.html',
  styleUrls: ['./create-document-type-template.component.scss']
})
export class CreateDocumentTypeTemplateComponent implements OnInit {
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

	newForm: FormGroup;
	formSubmitAttempt = false;
	currentDate;
	currentTime;
	// showNewDocument;

	departments$;
	documentTypesList;
	myFinalizedDocuments$;
	securityLevels$;
	priorityTypes$;

	attachmentFileNames;
	filesToBeUploaded;

	constructor(private router: Router, private route: ActivatedRoute,
		private spinner: NgxSpinnerService, private translate: TranslateService,
		private toastr: ToastrService, private fb: FormBuilder,
		private cdr: ChangeDetectorRef, private baseService: BaseService,
		private docMngService: DocMngService,
		private modalService: NgbModal,
		private dConvert: DateConvertService, private translatedToastr: TranslatedToastrService,
		private authService: AuthService, private documentTypeTemplateService: DocumentTypeTemplateService) { }

	ngOnInit(): void {
		this.initializeForm();
		this.fetchEssentialData();
		let localLang = localStorage.getItem('lang');
	}

	initializeForm() {
		this.currentDate = this.dConvert.convertToDariDate(this.baseService.getTodayDate());
		this.currentTime = this.baseService.getCurrentTime();


		this.newForm = this.fb.group({
			entityId: [null, [Validators.required]],
			departmentId: [null, [Validators.required]],
			documentTypeId:[null, [Validators.required]],
			template: [null, [Validators.required]]
		});
	}

	fetchEssentialData() {
		this.departments$ = this.baseService.getDepartmentList();
    	this.docMngService.getAllDocumentTypesList().subscribe((data: any) => {
			this.documentTypesList = data;
		});
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

	// updateFormValueAndValidity() {
	// 	this.newForm.get("title").updateValueAndValidity();
	// 	this.newForm.get("content").updateValueAndValidity();
	// 	this.newForm.get("documentType").updateValueAndValidity();
	// 	this.newForm.get("document").updateValueAndValidity();
	// }

	// addNewDocument() {
	// 	this.newForm.get("title").setValidators([Validators.required]);
	// 	this.newForm.get("content").setValidators([Validators.required]);
	// 	this.newForm.get("documentType").setValidators([Validators.required]);

	// 	this.newForm.get("document").clearValidators();
	// 	this.updateFormValueAndValidity();
	// }

	// removeNewDocument() {
	// 	this.newForm.get("title").clearValidators();
	// 	this.newForm.get("content").clearValidators();
	// 	this.newForm.get("documentType").clearValidators();

	// 	this.newForm.get("document").setValidators([Validators.required]);
	// 	this.updateFormValueAndValidity();
	// }

	// toggleNewDocumentInfo() {
	// 	let isNewDoc = this.newForm.get('isNewDoc').value;
	// 	console.log(isNewDoc);
	// 	if (isNewDoc) {
	// 		this.addNewDocument();
	// 		this.showNewDocument = true;
	// 	} else {
	// 		this.removeNewDocument();
	// 		this.showNewDocument = false;
	// 	}
	// }

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
		// const {documentNo, documentDate, fromDepartment, toDepartment, ccDepartments, document, isNewDoc, title, content, documentType } = this.newForm.value;
        this.documentTypeTemplateService.addRecord(obj).subscribe(res => {
            this.spinner.hide();
			this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
			this.router.navigateByUrl(`/doc_mng/config/document_type_templates`);
        }, (error) => {
            this.spinner.hide();
			this.translatedToastr.error("ERROR", error.error.message);
			this.authService.checkUserLogin();
        });

    }

}
