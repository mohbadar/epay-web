import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DocMngService } from 'app/doc-mng/doc-mng.service';
import { DocumentService } from 'app/doc-mng/document/document.service';
import { SearchDocumentComponent } from 'app/doc-mng/document/search-document/search-document.component';
import { BaseService } from 'app/services/base-service';
import { DateConvertService } from 'app/services/date-convert.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { Globals } from 'app/_helpers/globals';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-edit-execution-document',
    templateUrl: './edit-execution-document.component.html',
    styleUrls: ['./edit-execution-document.component.scss']
})
export class EditExecutionDocumentComponent implements OnInit {
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
        directionality: "rtl"
    };
    editForm: FormGroup;
    data;
    entities$;
    departments$;
    executionTypes$;
    showEditForm = false;
    entityId;
    departmentId;
    securityLevels;
    formSubmitAttempt = false;
    entitiesDeps$;
    fileName;
    users$;
    filesToBeUploaded;
    priorityTypes;
    selectedExecutionTypeId;
    noteType$;
    showNotType;
    documentTypesList;
    showUploadButton;
    mainDocumentId;
    executionId;
    documentExecutionTypesList;

    constructor(
        private baseService: BaseService,
        private documentService: DocumentService,
        private docMngService: DocMngService,
        private translatedToastr: TranslatedToastrService,
        private formBuilder: FormBuilder,
        private ngModal: NgbModal,
        private translate: TranslateService,
        private spinner: NgxSpinnerService,
        public activeModal: NgbActiveModal,
        private router: Router,
        private dateConvert: DateConvertService,
        private authService: AuthService,
        private changeDetector: ChangeDetectorRef,
        private globals: Globals,
        private modalService: NgbModal,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(routeParams => {
            this.mainDocumentId = routeParams.id;
            this.executionId = routeParams.executionId;
        });
        console.log(this.executionId);

        this.entityId = this.authService.principal.entityId;
        this.departmentId = this.authService.principal.departmentId;
        this.fetchEssentialData();
        this.fetchDocumentExecutionById(this.executionId);
    }

    fetchEssentialData() {
        this.noteType$ = this.docMngService.getDocumentNoteTypesList();
        this.entities$ = this.baseService.getEntityList();
        this.departments$ = this.baseService.getDepartmentList();
        this.entitiesDeps$ = this.baseService.getSubDepartmentList(this.entityId);
        this.users$ = this.docMngService.getModuleUsersList();
        this.loadDocumentSecurityLevels();
        this.loadDocumentPriorityTypes();
        this.loadExecutionTypes();
    }

    loadExecutionTypes() {
        this.docMngService.getDocumentExecutionTypesList().subscribe(res => {
            this.documentExecutionTypesList = res;
        }, err => {
            console.log("error in document executionTypes");
        });
    }

    loadDocumentSecurityLevels() {
        this.docMngService.getDocumentSecurityLevels().subscribe(res => {
            this.securityLevels = res;
        }, err => {
            console.log("error in document securityLevels");
        });
    }

    loadDocumentPriorityTypes() {
        this.docMngService.getDocumentPriorityTypes().subscribe(res => {
            this.priorityTypes = res;
        }, err => {
            console.log("error in document prioritytypes");
        });
    }

    get reviewersArray(): FormArray {
        return this.editForm.get("reviewers") as FormArray
    }

    newReviewer() {
        return this.formBuilder.group({
            userId: [null, [Validators.required]],
        });
    }

    addReviewer() {
        console.log("Adding a reviewer");
        this.reviewersArray.push(this.newReviewer());
    }

    removeReviewer(reviewerIndex: number) {
        this.reviewersArray.removeAt(reviewerIndex);
    }

    submitForm() {
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
        let reviewerIds = [];
        if (obj['reviewers'] != null) {
            for (const reviwer of obj['reviewers']) {
                reviewerIds.push(reviwer.userId);
            }
            obj['reviewerIds'] = reviewerIds;
        }

        const data = new FormData();
        data.append("obj", JSON.stringify(obj));
        data.append("file", this.filesToBeUploaded);
        console.log("all Data: ", obj);
        console.log("submit data >>>>>", data);
        this.spinner.show();
        this.documentService.updateExecution(this.mainDocumentId, this.executionId, data).subscribe((res) => {
            this.spinner.hide();
            this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
            this.router.navigate([`doc_mng/documents/my/${this.mainDocumentId}/executions`]);
        }, (err) => {
            this.spinner.hide();
            console.log("submit execution err >>>>", err);
        });
    }

    fetchDocumentExecutionById(id) {
        this.documentService.getRecordExecutionById(id).subscribe((response: any) => {
            console.log('res', response);
            this.checkExecutionType(response.document, response);
        }, (error) => {
            console.log('Error: ', error);
        });
    }

    fillEditForm(data) {
        console.log(data);
        this.editForm = this.formBuilder.group({
            documentTypeId: [{ value: data.document.documentType.id, disabled: true }, Validators.required],
            scope: [data.document.scope, [Validators.required]],
            documentNo: [data.document.documentNo],
            documentDate: [(data.document.documentDate === null ? null : this.dateConvert.convertToDariDate(data.document.documentDate))],
            fromEntityId: [{ value: this.entityId, disabled: true }, [Validators.required]],
            fromDepartmentId: [{ value: this.departmentId, disabled: true }, [Validators.required]],
            toDepartmentId: [data.document.toDepartment.id, [Validators.required]],
            ccDepartmentsIds: [(data.document.ccDepartments === null ? null : data.document.ccDepartments.map(item => item.id))],

            priorityType: [data.document.documentPriorityType, [Validators.required]],
            securityLevel: [data.document.documentSecurityLevel, [Validators.required]],

            linkedDocumentId: [data.linkedDocuments.length == 0 ? null : data.linkedDocuments[0]?.id],
            linkedDocumentDetails: [data.linkedDocuments.length == 0 ? null : `${data.linkedDocuments[0]?.id}, ${data.linkedDocuments[0]?.title}`],

            title: [data.document.title, Validators.required],
            content: [data.document.content, Validators.required],

            reviewers: this.formBuilder.array([])
        });

        if (data.document.attachment) {
            this.fileName = data.document.attachment;
        }

        if (data.document.reviews != 0) {
            data.document.reviews.forEach(review => {
                this.reviewersArray.push(this.formBuilder.group({
                    userId: [review.createdBy.id, [Validators.required]],
                }))
            });
        }
        this.changeDetector.detectChanges();

        this.showEditForm = true;
        this.showUploadButton = true;
    }

    redirectTo(uri: string) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate([uri]));
    }

    getError(formControlName: string) {
        if (formControlName) {
            if ((!this.editForm.get(formControlName).valid && this.editForm.get(formControlName).touched) ||
                (this.editForm.get(formControlName).untouched && this.formSubmitAttempt)
            ) {
                let error_msg = '';
                // return this.editForm.errors[formControlName];
                let errors = this.editForm.get(formControlName).errors;
                if (errors && errors.required) {
                    error_msg += this.translate.instant('FIELD_IS_REQUIRED');
                }
                return error_msg;
            }
            return;
        }
    }

    onSelectFile(event) {
        const selectedFileInput = event.target as HTMLInputElement;
        if (selectedFileInput.files && selectedFileInput.files[0]) {
            this.fileName = selectedFileInput.files[0].name;
            this.filesToBeUploaded = selectedFileInput.files[0];
        }
    }

    checkExecutionType(executionTypeId, data) {
        this.selectedExecutionTypeId = executionTypeId;
        if (this.selectedExecutionTypeId == 1) {
            // ARCHIVE - آرشیف
            this.enableArchiveFields(data);
        } else if (this.selectedExecutionTypeId == 9) {
            // FORWARD - راجع
            this.enableForwardFields(data);
        } else if (this.selectedExecutionTypeId == 3) {
            // REJECT - رد
            this.enableRejectFields(data);
        } else if (this.selectedExecutionTypeId == 4) {
            // MAKTOB - مکتوب
            this.enableMaktobFields(data);
        } else if (this.selectedExecutionTypeId == 5) {
            // ESTILAM - استعلام
            this.enableEstilamFields(data);
        } else if (this.selectedExecutionTypeId == 6) {
            // PESHNIHAD - پیشنهاد
            this.enablePeshnihadFields(data);
        } else if (this.selectedExecutionTypeId == 7) {
            // ESTILAM RESPONSE جوابیه استعلام
            this.enableEstilamResponseFields(data);
        }
        else if (this.selectedExecutionTypeId == 8) {
            // NOTE یاداشت
            this.enableNoteFields(data);
        }
        // else if (this.selectedExecutionTypeId == 9) {
        // 	// DIRECTOR ORDER احکام ریس
        // 	this.enableDirectorOrderFields(data);
        // }
        else if (this.selectedExecutionTypeId == 10) {
            // NOTE ORDER حکم یاداشت
            this.enableNoteOrder(data);
        }
        else if (this.selectedExecutionTypeId == 11) {
            // HUKUM PESHNIHAD حکم پیشنهاد
            this.enableHukumPeshnihadFields(data);
        }
        else {
            this.enableDefaultFields(data);
        }
    }

    enableDefaultFields(data) {
        this.fillEditForm(data);
        this.showUploadButton = true;
    }

    enableArchiveFields(data) {
        this.editForm = this.formBuilder.group(
            {
                documentTypeId: [{ value: data.documentType.id, disabled: true }, Validators.required],
                content: [data.content, Validators.required]
            });
        this.showUploadButton = false;
        this.filesToBeUploaded = null;
        this.showEditForm = true;
    }

    enableForwardFields(data) {
        this.fillEditForm(data);
        this.showUploadButton = true;
    }

    enableRejectFields(data) {
        this.editForm = this.formBuilder.group(
            {
                documentTypeId: [{ value: data.documentType.id, disabled: true }, Validators.required],
                content: [data.content, Validators.required]
            });
        this.showUploadButton = false;
        this.filesToBeUploaded = null;
        this.showEditForm = true;
    }

    enableMaktobFields(data) {
        this.fillEditForm(data);
        this.showUploadButton = true;
    }

    enableEstilamFields(data) {
        this.fillEditForm(data);
        this.showUploadButton = true;
    }

    enablePeshnihadFields(data) {
        this.fillEditForm(data);
        this.showUploadButton = true;
    }

    enableEstilamResponseFields(data) {
        this.fillEditForm(data);
        this.showUploadButton = true;
    }

    enableHukumPeshnihadFields(data) {
        this.fillEditForm(data);
        this.showUploadButton = true;
    }

    enableNoteFields(data) {
        this.editForm = this.formBuilder.group(
            {
                documentTypeId: [{ value: data.documentType.id, disabled: true }, Validators.required],
                content: [data.content, Validators.required],
                priorityType: [data.documentPriorityType, [Validators.required]],
                securityLevel: [data.documentSecurityLevel, [Validators.required]],
                noteType: [data.noteType?.id],
                reviewers: this.formBuilder.array([])
            });


        if (data.reviews != 0) {
            data.reviews.forEach(review => {
                this.reviewersArray.push(this.formBuilder.group({
                    userId: [review.createdBy.id, [Validators.required]],
                }))
            });
        }
        this.showUploadButton = false;
        this.filesToBeUploaded = null;
        this.showEditForm = true;
    }

    enableNoteOrder(data) {
        this.editForm = this.formBuilder.group(
            {
                documentTypeId: [{ value: data.documentType.id, disabled: true }, Validators.required],
                content: [data.content, Validators.required]
            });
        this.showUploadButton = false;
        this.filesToBeUploaded = null;
        this.showEditForm = true;
    }

    enableDirectorOrderFields(data) {
        this.fillEditForm(data);
        this.showUploadButton = true;
    }

    selectDocument() {
        const modalRef = this.modalService.open(SearchDocumentComponent, {
            centered: true, size: 'xl', keyboard: false, backdrop: 'static',
        });
        modalRef.componentInstance.response.subscribe((res) => {
            if (resizeTo) {
                this.editForm.get('linkedDocumentId').setValue(res.ID);
                this.editForm.get('linkedDocumentDetails').setValue(res.ID + ", " + res.TITLE);
                this.changeDetector.detectChanges();
            }
        });
    }

    unselectDocument() {
        this.editForm.get('linkedDocumentId').setValue(null);
        this.editForm.get('linkedDocumentDetails').setValue("");
    }

    goToThisDocumentsExecutionList() {
        this.router.navigate([`doc_mng/documents/my/${this.mainDocumentId}/executions`]);
    }


	get noteSectionsArray(): FormArray {
        return this.editForm.get("noteSections") as FormArray
    }

    newNoteSection() {
        return this.formBuilder.group({
            title: [null],
            content: [null],
            orderCol: [null]
        });
    }

    addNoteSection() {
        console.log("Adding a NoteSection");
        this.noteSectionsArray.push(this.newNoteSection());
    }

    removeNoteSection(noteSectionIndex: number) {
        this.noteSectionsArray.removeAt(noteSectionIndex);
    }

}
