import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { concat, Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Globals } from 'app/_helpers/globals';
import { FollowUpDocumentService } from './../follow-up-document.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { DocumentService } from 'app/doc-mng/document/document.service';
import { DocMngService } from 'app/doc-mng/doc-mng.service';
import { ActivatedRoute } from '@angular/router';


@Component({
	selector: 'app-create-follow-up-document',
	templateUrl: './create-follow-up-document.component.html',
	styleUrls: ['./create-follow-up-document.component.scss']
})
export class CreateFollowUpDocumentComponent implements OnInit {
	@Input() docFollowUpId;
	@Output() newFollowupEvent: EventEmitter<any> = new EventEmitter();

	data;
	newForm: FormGroup;
	addFormSubmitted = false;
	loading = false;
	modelType: boolean = false;
	users$;
	type$;
	followupStatus$;
	documentStatus$;
	attachmentFile: any;
	followUpTypes$;

	constructor(
		public activeModal: NgbActiveModal,
		public spinner: NgxSpinnerService,
		private formBuilder: FormBuilder,
		public translate: TranslateService,
		public toastr: ToastrService,
		private followUpDocumentService: FollowUpDocumentService,
		private documentService: DocumentService,
		private docMngService: DocMngService,
		private cdr: ChangeDetectorRef,
		public globals: Globals,
	) { }

	ngOnInit(): void {
		this.buildForm();
		console.log("Document Id: ", this.docFollowUpId);
		this.loadTypes();
	}

	buildForm() {
		this.newForm = this.formBuilder.group({
			docFollowUpId: [this.docFollowUpId, Validators.required],
			summary: [null, Validators.required],
			documentFollowupTypeNo: [null, Validators.required],
			documentFollowupStatusNo: [2, Validators.required],
		});
	}


	setToNull(formName, name) {
		console.log(name);
		formName.controls[name].setValue(null);
	}

	get cpf() {
		return this.newForm.controls;
	}

	loadTypes() {
		this.followUpDocumentService.getFollowUpTypes().subscribe((data) => {
			this.checkFollowUpTypesPermission(data);
		});
		this.followupStatus$ = this.followUpDocumentService.getFollowUpStatues();
		this.documentStatus$ = this.documentService.getDocumentStatuesList();
		this.users$ = this.docMngService.getModuleUsersList();
	}


	closeModal() {
		let data;
		if (this.modelType) {
			data = { type: 'create', title: 'FOLLOWUP' };
		}

		this.activeModal.close(data);
	}

	dismiss() {
		this.activeModal.dismiss();
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

	submit() {
		this.addFormSubmitted = true;
		if (this.newForm.invalid) {
			console.log("invalid form");
			return;
		}
		else {
			// this.newForm.addControl('docFollowUpId', new FormControl(null));
			// this.newForm.get('docFollowUpId').setValue(Number(this.docFollowUpId));
			const formData = new FormData();
			formData.append('attachment', this.attachmentFile);
			formData.append('data', JSON.stringify(this.newForm.value));
			console.log("submitted successfully:", this.newForm.value);
			console.log("attachment:", this.attachmentFile);
			this.loading = true;
			this.followUpDocumentService.createDocFollowUpActivity(formData).subscribe(res => {
				console.log("come from server: ", res);
				this.modelType = true;
				this.loading = false;
				this.newFollowupEvent.emit(res);
				this.closeModal();
			}, err => {
				console.log("error from server: ", err);
				this.loading = false;
			});


		}
	}

	checkFollowUpTypesPermission(allFollowUpTypes) {
		this.followUpTypes$ = [];
		allFollowUpTypes.forEach(element => {
			// Remove the assign option from the list
			if (element.id != 1) {
				this.followUpTypes$.push(element);
			}
		});
	}

}
