import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Globals } from 'app/_helpers/globals';
import { FollowUpDocumentService } from './../follow-up-document.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { DocumentService } from 'app/doc-mng/document/document.service';
import { DocMngService } from 'app/doc-mng/doc-mng.service';


@Component({
	selector: 'app-edit-follow-up-document',
	templateUrl: './edit-follow-up-document.component.html',
	styleUrls: ['./edit-follow-up-document.component.scss']
})
export class EditFollowUpDocumentComponent implements OnInit {
	@Output() followupEventEmitter = new EventEmitter<Object>();
	@Input() docFollowUpId;

	docId;
	data;
	editForm: FormGroup;
	addFormSubmitted = false;
	loading = false;
	modelType: boolean = false;
	type$;
	users$;
	followupStatus$;
	documentStatus$;
	attachmentFile: any;
	followUpTypes;

	constructor(
		public activeModal: NgbActiveModal,
		private ref: ChangeDetectorRef,
		public spinner: NgxSpinnerService,
		private formBuilder: FormBuilder,
		public translate: TranslateService,
		public toastr: ToastrService,
		private dConvert: DateConvertService,
		private followUpDocumentService: FollowUpDocumentService,
		private documentService: DocumentService,
		private docMngService: DocMngService,
		private cdr: ChangeDetectorRef,
		public globals: Globals,
	) { }

	ngOnInit(): void {
		this.buildForm();
		console.log("follow up data: ", this.data);
		this.setForm(this.data);
		this.loadTypes();
	}


	buildForm() {
		this.editForm = this.formBuilder.group({
			docFollowUpId: [this.docFollowUpId, Validators.required],
			summary: [null, Validators.required],
			documentFollowupTypeNo: [null, Validators.required],
			documentFollowupStatusNo: [2, Validators.required],
		});
	}


	fileChangeListener(event): void {
		if (event != null) {
			if (event.target.files && event.target.files[0]) {
				const reader = new FileReader();
				this.attachmentFile = event.target.files[0];
				document.getElementById('fileName').innerHTML = event.target.files[0].name;
			}
		}
		else {
			document.getElementById('fileName').innerHTML = null;
		}

	}

	setForm(editRecord: any) {
		this.editForm.patchValue(editRecord);
		this.editForm.patchValue({
			docFollowUpId: this.docFollowUpId,
			summary: editRecord.summary ? editRecord.summary : null,
			documentFollowupTypeNo: editRecord.documentFollowupTypeNo ? editRecord.documentFollowupTypeNo : null,
			documentFollowupStatusNo: editRecord.documentFollowupStatusNo ? editRecord.documentFollowupStatusNo : null,
		});

		document.getElementById('fileName').innerHTML = this.data.fileName;
	}



	setToNull(formName, name) {
		console.log(name);
		formName.controls[name].setValue(null);
	}

	get cpf() {
		return this.editForm.controls;
	}

	loadTypes() {
		this.followUpDocumentService.getFollowUpTypes().subscribe((data) => {
			this.checkFollowUpTypesPermission(data);
		});
		this.followupStatus$ = this.followUpDocumentService.getFollowUpStatues();;
		this.documentStatus$ = this.documentService.getDocumentStatuesList();
		this.users$ = this.docMngService.getModuleUsersList();
	}


	closeModal(data = null) {
		this.activeModal.close(data);
	}

	dismiss() {
		this.activeModal.dismiss();
	}

	submit() {
		this.addFormSubmitted = true;
		if (this.editForm.invalid) {
			console.log("invalid form");
			return;
		}
		else {
			const formData = new FormData();
			console.log("----------- loging", this.editForm.value);

			formData.append('attachment', this.attachmentFile);
			formData.append('data', JSON.stringify(this.editForm.value));
			console.log("submitted successfully:", this.editForm.value);
			console.log("attachment:", this.attachmentFile);
			this.loading = true;
			this.followUpDocumentService.updateDocFollowUpActivity(this.data.id, formData).subscribe(res => {
				console.log("come from server: ", res);
				this.data = res;
				this.modelType = true;
				this.loading = false;
				this.closeModal(res);
				this.followupEventEmitter.emit(res);
			}, err => {
				console.log("error from server: ", err);
				this.loading = false;
			});
		}
	}

	checkFollowUpTypesPermission(allFollowUpTypes) {
		this.followUpTypes = [];
		allFollowUpTypes.forEach(element => {
			// Remove assign type from here
			if (element.id != 1) {
				this.followUpTypes.push(element);
			}
		});
	}


}
