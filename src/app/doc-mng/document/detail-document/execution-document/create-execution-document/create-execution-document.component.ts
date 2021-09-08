import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DocMngService } from 'app/doc-mng/doc-mng.service';
import { DocumentService } from 'app/doc-mng/document/document.service';
import { SearchDocumentComponent } from 'app/doc-mng/document/search-document/search-document.component';
import { BaseService } from 'app/services/base-service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { Globals } from 'app/_helpers/globals';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-create-execution-document',
    templateUrl: './create-execution-document.component.html',
    styleUrls: ['./create-execution-document.component.scss']
})
export class CreateExecutionDocumentComponent implements OnInit {
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

    @Input() mainDocumentId;
    @Output() newExecutionEvent: EventEmitter<any> = new EventEmitter();
    newForm: FormGroup;
    executionTypes$;
    entities$;
    departments$;

    formSubmitAttempt = false;
    entityId;
    departmentId;
    entitiesDeps$;
    users$;
    documenttypes$;
    securityLevels;
    priorityTypes;
    fileName: string;
    filesToBeUploaded: File;
    selectedTypeId;
    selectedDocumentTypeName;
    showUploadButton;
    noteType$;
    showNotType;
    documentExecutionTypesList;


    constructor(
        private baseService: BaseService,
        private documentService: DocumentService,
        private docMngService: DocMngService,
        private translatedToastr: TranslatedToastrService,
        private fb: FormBuilder, private authService: AuthService,
        private ngModal: NgbModal,
        private translate: TranslateService,
        private spinner: NgxSpinnerService,
        public activeModal: NgbActiveModal,
        private changeDetector: ChangeDetectorRef,
        private router: Router,
        private modalService: NgbModal,
        private globals: Globals,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(routeParams => {
            this.mainDocumentId = routeParams.id;
        });
        console.log(this.globals);
        this.entityId = this.authService.principal.entityId;
        this.departmentId = this.authService.principal.departmentId;
        this.fetchEssentialData();
        this.initializeForm();
    }

    initializeDefaultForm() {
        this.newForm = this.fb.group(
            {
                documentTypeId: [this.selectedTypeId, Validators.required],
                scope: ["INTERNAL", [Validators.required]],
                documentNo: [null],
                documentDate: [null],
                fromEntityId: [{ value: this.entityId, disabled: true }, [Validators.required]],
                fromDepartmentId: [{ value: this.departmentId, disabled: true }, [Validators.required]],
                toDepartmentId: [null, [Validators.required]],
                ccDepartmentsIds: [null],

                priorityType: ["NORMAL", [Validators.required]],
                securityLevel: ["NORMAL", [Validators.required]],

                linkedDocumentId: [null],
                linkedDocumentDetails: [""],

                title: [null, Validators.required],
                content: [null, Validators.required],

                reviewers: this.fb.array([])
            });
        this.showUploadButton = true;
    }

    initializeForm() {
        this.newForm = this.fb.group(
            {
                documentTypeId: [null, Validators.required]
            })
    }

    fetchEssentialData() {
        this.loadDocumentSecurityLevels();
        this.loadDocumentPriorityTypes();
        this.loadNotTypes();
        this.documenttypes$ = this.docMngService.getDocumentTypesList();
        this.entities$ = this.baseService.getEntityList();
        this.baseService.getEntityList().subscribe(data => {
            console.log(data);
        });
        this.baseService.getDepartmentList().subscribe(data => {
            console.log(data);
        });
        this.departments$ = this.baseService.getDepartmentList();
        this.users$ = this.docMngService.getModuleUsersList();
        this.entitiesDeps$ = this.baseService.getSubDepartmentList(this.entityId);
        this.loadExecutionTypes();
    }

    loadDocumentPriorityTypes() {
        this.docMngService.getDocumentPriorityTypes().subscribe(res => {
            this.priorityTypes = res;
        }, err => {
            console.log("error in document prioritytypes");
        });
    }

    loadDocumentSecurityLevels() {
        this.docMngService.getDocumentSecurityLevels().subscribe(res => {
            this.securityLevels = res;
        }, err => {
            console.log("error in document securityLevels");
        });
    }

    loadExecutionTypes() {
        this.docMngService.getDocumentExecutionTypesList().subscribe(res => {
            this.executionTypes$ = res;
            this.checkDocumentTypesPermissions(res);
        }, err => {
            console.log("error in document executionTypes");
        });
    }

    loadNotTypes() {
        this.noteType$ = this.docMngService.getDocumentNoteTypesList();
    }

    onExecutionTypeChange(event) {
        console.log(event);
        this.selectedTypeId = event.id;
        this.selectedDocumentTypeName = event.slug;
        if (event.slug == 'ARCHIVE') {
            // ARCHIVE - آرشیف
            this.enableArchiveFields();
        } else if (event.slug == 'FORWARD') {
            // FORWARD - راجع
            this.enableForwardFields();
        } else if (event.slug == 'REJECT') {
            // REJECT - رد
            this.enableRejectFields();
        } else if (event.slug == 'MAKTOB') {
            // MAKTOB - مکتوب
            this.enableMaktobFields();
        } else if (event.slug == 'ESTILAM') {
            // ESTILAM - استعلام
            this.enableEstilamFields();
        } else if (event.slug == 'PESHNIHAD') {
            // PESHNIHAD - پیشنهاد
            this.enablePeshnihadFields();
        } else if (event.slug == 'ESTILAM_RESPONSE') {
            // ESTILAM RESPONSE جوابیه استعلام
            this.enableEstilamResponseFields();
        } else if (event.slug == 'NOTE') {
            // NOTE یاداشت
            this.enableNoteFields();
        } else if (event.slug == 'DIR_ORDER') {
            // DIRECTOR ORDER احکام ریس
            this.enableDirectorOrderFields();
        } else if (event.slug == 'NOTE_ORDER') {
            // NOTE ORDER حکم یاداشت
            this.enableNoteOrder();
        } else if (event.slug == 'HUKUM_PESHNIHAD') {
            // HUKUM PESHNIHAD حکم پیشنهاد
            this.enableHukumPeshnihadFields();
        }
        else {
            this.removeAllFields();
        }
    }

    removeAllFields() {
        this.newForm = this.fb.group({});
        this.showUploadButton = false;
    }

    enableArchiveFields() {
        this.newForm = this.fb.group(
            {
                documentTypeId: [this.selectedTypeId, Validators.required],
                content: [null, Validators.required],
                reviewers: this.fb.array([])
            });
        this.showUploadButton = false;
        this.filesToBeUploaded = null;
    }

    enableForwardFields() {
        this.newForm = this.fb.group({
            documentTypeId: [this.selectedTypeId, Validators.required],
            scope: ["INTERNAL", [Validators.required]],
            fromEntityId: [{ value: this.entityId, disabled: true }, [Validators.required]],
            fromDepartmentId: [{ value: this.departmentId, disabled: true }, [Validators.required]],
            toDepartmentId: [null, [Validators.required]],
            ccDepartmentsIds: [null],

            priorityType: ["NORMAL", [Validators.required]],
            securityLevel: ["NORMAL", [Validators.required]],

            content: [null, Validators.required],

            reviewers: this.fb.array([])
        });
        this.showUploadButton = true;
    }

    enableRejectFields() {
        this.newForm = this.fb.group(
            {
                documentTypeId: [this.selectedTypeId, Validators.required],
                content: [null, Validators.required],
                reviewers: this.fb.array([])
            });
        this.showUploadButton = false;
        this.filesToBeUploaded = null;
    }

    enableMaktobFields() {
        this.initializeDefaultForm();
        this.showUploadButton = true;
    }

    enableEstilamFields() {
        this.initializeDefaultForm();
        this.showUploadButton = true;
    }

    enablePeshnihadFields() {
        this.initializeDefaultForm();
        this.showUploadButton = true;
    }

    enableEstilamResponseFields() {
        this.initializeDefaultForm();
        this.showUploadButton = true;
    }

    enableNoteFields() {
        this.newForm = this.fb.group(
            {
                documentTypeId: [this.selectedTypeId, Validators.required],
                fromEntityId: [{ value: this.entityId, disabled: true }, [Validators.required]],
                fromDepartmentId: [{ value: this.departmentId, disabled: true }, [Validators.required]],
                priorityType: ["NORMAL", [Validators.required]],
                securityLevel: ["NORMAL", [Validators.required]],
                noteType: [null, [Validators.required]],
                reviewers: this.fb.array([]),
                noteSections: this.fb.array([this.newNoteSection()]),
            });
        this.showUploadButton = false;
        this.filesToBeUploaded = null;
    }

    enableDirectorOrderFields() {
        this.initializeDefaultForm();
        this.showUploadButton = true;
    };


    enableNoteOrder() {
        this.newForm = this.fb.group(
            {
                documentTypeId: [this.selectedTypeId, Validators.required],
                content: [null, Validators.required],
            });
        this.showUploadButton = false;
        this.filesToBeUploaded = null;
    }

    enableHukumPeshnihadFields() {
		this.newForm = this.fb.group(
            {
                documentTypeId: [this.selectedTypeId, Validators.required],
                content: [null, Validators.required],
            });
        this.filesToBeUploaded = null;
        this.showUploadButton = true;
    }

    changeScope(event) {
        if (event.target.defaultValue === 'EXTERNAL') {
            this.newForm.get('scope').setValue("EXTERNAL");
            this.entitiesDeps$ = this.baseService.getEntityList();
            this.changeDetector.detectChanges();
        }
        else if (event.target.defaultValue === 'INTERNAL') {
            this.newForm.get('scope').setValue("INTERNAL");
            this.entitiesDeps$ = this.baseService.getSubDepartmentList(this.entityId);
            this.changeDetector.detectChanges();
        }
    }

    get reviewersArray(): FormArray {
        return this.newForm.get("reviewers") as FormArray
    }

    newReviewer() {
        return this.fb.group({
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

    get noteSectionsArray(): FormArray {
        return this.newForm.get("noteSections") as FormArray
    }

    newNoteSection() {
        return this.fb.group({
            title: [""],
            content: [""],
            orderCol: [1]
        });
    }

    addNoteSection() {
        console.log("Adding a NoteSection");
        this.noteSectionsArray.push(this.newNoteSection());
    }

    removeNoteSection(noteSectionIndex: number) {
        this.noteSectionsArray.removeAt(noteSectionIndex);
    }

    getError(formControlName: string) {
        if (formControlName) {
            if ((!this.newForm.get(formControlName).valid && this.newForm.get(formControlName).touched) ||
                (this.newForm.get(formControlName).untouched && this.formSubmitAttempt)
            ) {
                let error_msg = '';
                // return this.newForm.errors[formControlName];
                let errors = this.newForm.get(formControlName).errors;
                if (errors && errors.required) {
                    error_msg += this.translate.instant('FIELD_IS_REQUIRED');
                }
                return error_msg;
            }
            return;
        }
    }

    submitForm() {
        this.formSubmitAttempt = true;
        if (this.newForm.invalid) {
            this.translatedToastr.error("ERROR", "FORM_INVALID_MSG");
            document.getElementById('newForm').classList.add('input-error');
            return;
        } else {
            this.submit();
        }
    }

    submit() {
        const obj = this.newForm.getRawValue();
        let reviewerIds = [];
        if (obj['reviewers'] != null) {
            for (const reviwer of obj['reviewers']) {
                reviewerIds.push(reviwer.userId);
            }
            obj['reviewerIds'] = reviewerIds;
        }
        console.log("submit Object >>>>>", obj);
        const data = new FormData();
        data.append("file", this.filesToBeUploaded);
        data.append("obj", JSON.stringify(obj));

        this.spinner.show();
        this.documentService.addExecution(this.mainDocumentId, data).subscribe((res) => {
            this.spinner.hide();
            this.router.navigate([`doc_mng/documents/my/${this.mainDocumentId}/executions`]);
            this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        }, (err) => {
            this.spinner.hide();
            console.log("submit execution err >>>>", err);
        });
    }

    selectDocument() {
        const modalRef = this.modalService.open(SearchDocumentComponent, {
            centered: true, size: 'xl', keyboard: false, backdrop: 'static',
        });
        modalRef.componentInstance.response.subscribe((res) => {
            if (resizeTo) {
                this.newForm.get('linkedDocumentId').setValue(res.ID);
                this.newForm.get('linkedDocumentDetails').setValue(res.ID + ", " + res.TITLE);
                this.changeDetector.detectChanges();
            }
        });
    }

    unselectDocument() {
        this.newForm.get('linkedDocumentId').setValue(null);
        this.newForm.get('linkedDocumentDetails').setValue("");
    }

    onSelectFile(event) {
        const selectedFileInput = event.target as HTMLInputElement;
        if (selectedFileInput.files && selectedFileInput.files[0]) {
            this.fileName = selectedFileInput.files[0].name;
            this.filesToBeUploaded = selectedFileInput.files[0];
        }
    }

    checkDocumentTypesPermissions(allDocumentExecutionTypes) {
        this.documentExecutionTypesList = [];
        allDocumentExecutionTypes.forEach(element => {
            if (element.slug === 'ARCHIVE') {
                if (this.globals.principal.hasAuthority(['DOCMNG_DOC_EXECUTION_TYPE_ARCHIVE'])) {
                    this.documentExecutionTypesList.push(element);
                }
            } else if (element.slug === 'FORWARD') {
                if (this.globals.principal.hasAuthority(["DOCMNG_DOC_EXECUTION_TYPE_FORWARD"])) {
                    this.documentExecutionTypesList.push(element);
                }
            } else if (element.slug === 'REJECT') {
                if (this.globals.principal.hasAuthority(["DOCMNG_DOC_EXECUTION_TYPE_REJECT"])) {
                    this.documentExecutionTypesList.push(element);
                }
            } else if (element.slug === 'MAKTOB') {
                if (this.globals.principal.hasAuthority(["DOCMNG_DOC_EXECUTION_TYPE_MAKTOB"])) {
                    this.documentExecutionTypesList.push(element);
                }
            } else if (element.slug === 'ESTILAM') {
                if (this.globals.principal.hasAuthority(["DOCMNG_DOC_EXECUTION_TYPE_ESTILAM"])) {
                    this.documentExecutionTypesList.push(element);
                }
            } else if (element.slug === 'PESHNIHAD') {
                if (this.globals.principal.hasAuthority(["DOCMNG_DOC_EXECUTION_TYPE_PESHNIHAD"])) {
                    this.documentExecutionTypesList.push(element);
                }
            } else if (element.slug === 'ESTILAM_RESPONSE') {
                if (this.globals.principal.hasAuthority(["DOCMNG_DOC_EXECUTION_TYPE_ESTILAM_RESPONSE"])) {
                    this.documentExecutionTypesList.push(element);
                }
            } else if (element.slug === 'NOTE') {
                if (this.globals.principal.hasAuthority(["DOCMNG_DOC_EXECUTION_TYPE_NOTE"])) {
                    this.documentExecutionTypesList.push(element);
                }
            } else if (element.slug === 'DIR_ORDER') {
                if (this.globals.principal.hasAuthority(["DOCMNG_DOC_EXECUTION_TYPE_DIRECTOR_ORDER"])) {
                    this.documentExecutionTypesList.push(element);
                }
            } else if (element.slug === 'NOTE_ORDER') {
                if (this.globals.principal.hasAuthority(["DOCMNG_DOC_EXECUTION_TYPE_NOTE_ORDER"])) {
                    this.documentExecutionTypesList.push(element);
                }
            } else if (element.slug === 'HUKUM_PESHNIHAD') {
                if (this.globals.principal.hasAuthority(["DOCMNG_DOC_EXECUTION_TYPE_HUKUM_PESHNIHAD"])) {
                    this.documentExecutionTypesList.push(element);
                }
            } else {
                this.documentExecutionTypesList.push(element);
            }
        });
    }

    goToThisDocumentsExecutionList() {
        this.router.navigate([`doc_mng/documents/my/${this.mainDocumentId}/executions`]);
    }
}
