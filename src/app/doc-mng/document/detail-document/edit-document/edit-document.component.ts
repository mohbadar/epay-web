import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from 'app/services/base-service';
import { DateConvertService } from 'app/services/date-convert.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { QuillEditorComponent } from 'ngx-quill';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DocumentService } from './../../document.service';
import { DocMngService } from './../../../doc-mng.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchDocumentComponent } from '../../search-document/search-document.component';
import { ProvinceService } from 'app/services/province.service';
import { Globals } from 'app/_helpers/globals';

@Component({
    selector: 'app-edit-document',
    templateUrl: './edit-document.component.html',
    styleUrls: ['./edit-document.component.scss']
})

export class EditDocumentComponent implements OnInit {
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
    formSubmitAttempt = false;
    currentDate;
    currentTime;
    dataLoadingFlag = true;
    data: any;
    documentid: any;
    document: any;
    entityId;
    documentId;
    showEditForm = false;

    securityLevels;
    priorityTypes;
    entities$;
    departments$;
    documenttypes$;
    myFinalizedDocuments$;
    securityLevels$;
    priorityTypes$;
    attachmentFileNames;
    filesToBeUploaded;
    uploadedFile;
    departmentId;
    external;
    internal;
    entitiesDeps$;
    fileName;
    selectedDocumentTypeName;
    users$;
    issuingAuthorities$;
    categories$;
    provinces;
    noteType$;
    documentTypesList = [];
    noteSectionsArray;
    reviewersArray;
    mainRoute;


    constructor(private router: Router, private route: ActivatedRoute,
        private spinner: NgxSpinnerService, private translate: TranslateService,
        private toastr: ToastrService, private formBuilder: FormBuilder,
        private changeDetector: ChangeDetectorRef, private baseService: BaseService,
        private provinceService: ProvinceService, public globals: Globals,
        private docMngService: DocMngService, private modalService: NgbModal,
        private dateConvert: DateConvertService, private translatedToastr: TranslatedToastrService,
        private authService: AuthService, private documentService: DocumentService) { }

    ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.mainRoute = data?.route;
        });

        this.route.params.subscribe(routeParams => {
            this.documentId = routeParams?.id;
        });
        this.currentDate = this.dateConvert.convertToDariDate(this.baseService.getTodayDate());
        this.currentTime = this.baseService.getCurrentTime();
        this.entityId = this.authService.principal.entityId;
        this.departmentId = this.authService.principal.departmentId;

        this.route.paramMap.subscribe(params => {
            const id = params.get("id");
            // patch user details for edit
            this.documentId = id;
            this.fetchDocumentById(this.documentId);
        });
        this.fetchEssentialData();
        let localLang = localStorage.getItem('lang');
    }

    fetchDocumentById(documentId) {
        this.spinner.show();
        this.documentService.getRecordById(documentId).subscribe((response: any) => {
            console.log('res', response);
            this.fillEditResolutionForm(response.document, response.linkedDocuments);
            if (response.document.scope == 'EXTERNAL') {
                this.external = true;
                this.internal = false;
                this.entitiesDeps$ = this.baseService.getEntityList();
            }
            else if (response.document.scope == 'INTERNAL') {
                this.internal = true;
                this.external = false;
                this.entitiesDeps$ = this.baseService.getSubDepartmentList(this.entityId);
            }
            this.showEditForm = true;
            this.spinner.hide();
        }, (error) => {
            console.log('Error: ', error);
            this.spinner.hide();
        });
    }

    fillEditResolutionForm(document, linkedDocuments) {
        this.selectedDocumentTypeName = document.documentType.nameEn;

        this.onDocumentTypeChange(document, linkedDocuments);

        if (document.attachment) {
            this.fileName = document.attachment;
        }

        this.reviewersArray = this.editForm.get("reviewers") as FormArray

        if (document.reviews != 0) {
            document.reviews.forEach(review => {
                this.reviewersArray.push(this.formBuilder.group({
                    userId: [review.createdBy.id, [Validators.required]],
                }))
            });
        }

        this.changeDetector.detectChanges();
    }

    fetchEssentialData() {
        console.log(this.authService);
        this.loadDocumentSecurityLevels();
        this.loadDocumentPriorityTypes();
        this.docMngService.getDocumentTypesList().subscribe((data) => {
            this.checkDocumentTypesPermission(data);
        });
        console.log(this.documenttypes$);
        this.entitiesDeps$ = this.baseService.getEntityList();
        this.departments$ = this.baseService.getDepartmentList();
        this.myFinalizedDocuments$ = this.docMngService.getMyFinalizedDocumentList();
        this.users$ = this.docMngService.getModuleUsersList();
        this.issuingAuthorities$ = this.baseService.getIssuingAuthorityList();
        this.categories$ = this.baseService.getCategoryList();
        this.provinceService.getProvincesList().subscribe(res => {
            this.provinces = res;
        });
        this.noteType$ = this.docMngService.getDocumentNoteTypesList();
    }

    changeScope(event) {
        if (event.target.defaultValue === 'EXTERNAL') {
            this.editForm.get('scope').setValue("EXTERNAL");
            this.editForm.get('fromDepartmentId').setValue(this.departmentId);
            this.entitiesDeps$ = this.baseService.getEntityList();
            this.editForm.get('toDepartmentId').setErrors(null);
            this.editForm.get('toDepartmentId').clearValidators();
            this.editForm.get('toDepartmentId').setValue(null);
            this.changeDetector.detectChanges();
        }
        else if (event.target.defaultValue === 'INTERNAL') {
            this.editForm.get('scope').setValue("INTERNAL");
            this.editForm.get('fromDepartmentId').setValue(this.departmentId);
            this.entitiesDeps$ = this.baseService.getSubDepartmentList(this.entityId);
            this.editForm.get('toDepartmentId').setErrors(null);
            this.editForm.get('toDepartmentId').clearValidators();
            this.editForm.get('toDepartmentId').setValue(null);
            this.changeDetector.detectChanges();

        }
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
        let reviewerIds = [];
        for (const reviwer of obj['reviewers']) {
            reviewerIds.push(reviwer.userId);
        }
        obj['reviewerIds'] = reviewerIds;

        const data = new FormData();
        data.append("obj", JSON.stringify(obj));
        data.append("file", this.filesToBeUploaded);
        console.log("all Data: ", obj);
        // const {documentNo, documentDate, fromDepartment, toDepartment, ccDepartments, document, isNewDoc, title, content, documentType } = this.editForm.value;
        this.documentService.editRecord(this.documentId, data).subscribe((res: any) => {
            this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
            this.router.navigateByUrl(`/doc_mng/documents/my/` + res.id);
            this.spinner.hide();
        }, err => {
            this.spinner.hide();
            this.translatedToastr.error("ERROR", "ERR_MSG");
            this.authService.checkUserLogin();
        });

    }

    selectDocument() {
        const modalRef = this.modalService.open(SearchDocumentComponent, {
            centered: true, size: 'xl', keyboard: false, backdrop: 'static',
        });
        modalRef.componentInstance.response.subscribe((res) => {
            if (resizeTo) {
                this.editForm.get('linkedDocument').setValue(res.ID);
                this.editForm.get('linkedDocumentDetails').setValue(res.ID + ", " + res.TITLE);
                this.changeDetector.detectChanges();
            }
        });
    }

    unselectDocument() {
        this.editForm.get('linkedDocument').setValue(null);
        this.editForm.get('linkedDocumentDetails').setValue("");
    }

    onSelectFile(event) {
        const selectedFileInput = event.target as HTMLInputElement;
        if (selectedFileInput.files && selectedFileInput.files[0]) {
            this.fileName = selectedFileInput.files[0].name;
            this.filesToBeUploaded = selectedFileInput.files[0];
        }
    }


    onDocumentTypeChange(document, linkedDocuments) {
        this.selectedDocumentTypeName = document.documentType.nameEn;
        switch (this.selectedDocumentTypeName) {
            case "HUKUM":
                this.enableHukumFields(document, linkedDocuments);
                break;
            case "HIDAYAT":
                this.enableHidayatFields(document, linkedDocuments);
                break;
            case "FARMAN":
                this.enableFarmanFields(document, linkedDocuments);
                break;
            case "NOTE":
                this.enableNoteFields(document, linkedDocuments);
                break;
            default:
                this.enableDefaultFields(document, linkedDocuments);
        }
    }


    onSelectAll() {
        const selected = this.provinces.map(item => item.value);
        this.editForm.get('guidanceProvinces').patchValue(selected);

        this.changeDetector.detectChanges();
    }

    onClearAll() {
        this.editForm.get('guidanceProvinces').patchValue([]);
    }

    enableHukumFields(document, linkedDocuments) {
        this.editForm = this.formBuilder.group({
            scope: [document.scope, [Validators.required]],
            documentTypeId: [{ value: document.documentType.id, disabled: true }, [Validators.required]],
            documentNo: [document.documentNo],
            documentDate: [(document.documentDate === null ? null : this.dateConvert.convertToDariDate(document.documentDate))],
            fromEntityId: [{ value: this.entityId, disabled: true }, [Validators.required]],
            fromDepartmentId: [{ value: this.departmentId, disabled: true }, [Validators.required]],
            toDepartmentId: [document.toDepartment?.id, [Validators.required]],
            ccDepartmentsIds: [(document.ccDepartments === null ? null : document.ccDepartments.map(item => item.id))],
            priorityType: [document.documentPriorityType, [Validators.required]],
            securityLevel: [document.documentSecurityLevel, [Validators.required]],
            linkedDocument: [linkedDocuments.length === 0 ? null : linkedDocuments[0]?.id],
            linkedDocumentDetails: [linkedDocuments.length === 0 ? null : `${linkedDocuments[0]?.id}, ${linkedDocuments[0]?.title}`],
            title: [document.title, [Validators.required]],
            content: [document.content, [Validators.required]],
            reviewers: this.formBuilder.array([]),
            offerorDepartment: [document.offerorDepartment?.id],
            implementationEndDate: [(document.implementationEndDate === null ? null : this.dateConvert.convertToDariDate(document.implementationEndDate)), [Validators.required]],
            issuingAuthority: [document.issuingAuthority?.id, [Validators.required]],
            category: [document.category?.id],
            offerNo: [document.offerNo]
        });
        this.filesToBeUploaded = null;
    }

    enableFarmanFields(document, linkedDocuments) {
        this.editForm = this.formBuilder.group({
            scope: [document.scope, [Validators.required]],
            documentTypeId: [{ value: document.documentType.id, disabled: true }, [Validators.required]],
            documentNo: [document.documentNo],
            documentDate: [(document.documentDate === null ? null : this.dateConvert.convertToDariDate(document.documentDate))],
            fromEntityId: [{ value: this.entityId, disabled: true }, [Validators.required]],
            fromDepartmentId: [{ value: this.departmentId, disabled: true }, [Validators.required]],
            toDepartmentId: [document.toDepartment?.id, [Validators.required]],
            ccDepartmentsIds: [(document.ccDepartments === null ? null : document.ccDepartments.map(item => item.id))],
            priorityType: [document.documentPriorityType, [Validators.required]],
            securityLevel: [document.documentSecurityLevel, [Validators.required]],
            linkedDocument: [linkedDocuments.length === 0 ? null : linkedDocuments[0]?.id],
            linkedDocumentDetails: [linkedDocuments.length === 0 ? null : `${linkedDocuments[0]?.id}, ${linkedDocuments[0]?.title}`],
            implementationEndDate: [(document.implementationEndDate === null ? null : this.dateConvert.convertToDariDate(document.implementationEndDate)), [Validators.required]],
            issuingAuthority: [document.issuingAuthority?.id, [Validators.required]],
            title: [document.title, [Validators.required]],
            content: [document.content, [Validators.required]],
            reviewers: this.formBuilder.array([])
        });
        this.filesToBeUploaded = null;
    }

    enableHidayatFields(document, linkedDocuments) {
        this.editForm = this.formBuilder.group({
            scope: [document.scope, [Validators.required]],
            documentTypeId: [{ value: document.documentType.id, disabled: true }, [Validators.required]],
            documentNo: [document.documentNo],
            documentDate: [(document.documentDate === null ? null : this.dateConvert.convertToDariDate(document.documentDate))],
            fromEntityId: [{ value: this.entityId, disabled: true }, [Validators.required]],
            fromDepartmentId: [{ value: this.departmentId, disabled: true }, [Validators.required]],
            toDepartmentId: [document.toDepartment?.id, [Validators.required]],
            ccDepartmentsIds: [(document.ccDepartments === null ? null : document.ccDepartments.map(item => item.id))],
            priorityType: [document.documentPriorityType, [Validators.required]],
            securityLevel: [document.documentSecurityLevel, [Validators.required]],
            linkedDocument: [linkedDocuments.length === 0 ? null : linkedDocuments[0]?.id],
            linkedDocumentDetails: [linkedDocuments.length === 0 ? null : `${linkedDocuments[0]?.id}, ${linkedDocuments[0]?.title}`],
            implementationEndDate: [(document.implementationEndDate === null ? null : this.dateConvert.convertToDariDate(document.implementationEndDate)), [Validators.required]],
            issuingAuthority: [document.issuingAuthority?.id, [Validators.required]],
            category: [document.category?.id, [Validators.required]],
            directorInstruction: [document.directorInstruction],
            guidanceProvinces: [(document.guidanceProvinces === null ? null : document.guidanceProvinces.map(item => item.id)), [Validators.required]],
            verbal: [document.verbal],
            maktobNo: [document.maktobNo],
            title: [document.title, [Validators.required]],
            content: [document.content, [Validators.required]],
            reviewers: this.formBuilder.array([])
        });
        this.filesToBeUploaded = null;
    }

    enableNoteFields(document, linkedDocuments) {
        this.editForm = this.formBuilder.group({
            scope: [document.scope, [Validators.required]],
            documentTypeId: [{ value: document.documentType.id, disabled: true }, [Validators.required]],
            noteType: [document.noteType?.id, [Validators.required]],
            fromEntityId: [{ value: this.entityId, disabled: true }, [Validators.required]],
            fromDepartmentId: [{ value: this.departmentId, disabled: true }, [Validators.required]],
            priorityType: [document.documentPriorityType, [Validators.required]],
            securityLevel: [document.documentSecurityLevel, [Validators.required]],
            linkedDocument: [linkedDocuments.length === 0 ? null : linkedDocuments[0]?.id],
            linkedDocumentDetails: [linkedDocuments.length === 0 ? null : `${linkedDocuments[0]?.id}, ${linkedDocuments[0]?.title}`],
            noteSections: this.formBuilder.array([]),
            reviewers: this.formBuilder.array([])
        });
        this.filesToBeUploaded = null;
        this.noteSectionsArray = this.editForm.get("noteSections") as FormArray;
        if (document.noteSections != 0) {
            document.noteSections.forEach(noteSection => {
                this.noteSectionsArray.push(this.formBuilder.group({
                    title: [noteSection.title, [Validators.required]],
                    content: [noteSection.content, [Validators.required]],
                    orderCol: [noteSection.orderCol]
                }))
            });
        }
    }

    enableDefaultFields(document, linkedDocuments) {
        this.editForm = this.formBuilder.group({
            scope: [document.scope, [Validators.required]],
            documentTypeId: [{ value: document.documentType.id, disabled: true }, [Validators.required]],
            documentNo: [document.documentNo],
            documentDate: [(document.documentDate === null ? null : this.dateConvert.convertToDariDate(document.documentDate))],
            fromEntityId: [{ value: this.entityId, disabled: true }, [Validators.required]],
            fromDepartmentId: [{ value: this.departmentId, disabled: true }, [Validators.required]],
            toDepartmentId: [document.toDepartment?.id, [Validators.required]],
            ccDepartmentsIds: [(document.ccDepartments === null ? null : document.ccDepartments.map(item => item.id))],
            priorityType: [document.documentPriorityType, [Validators.required]],
            securityLevel: [document.documentSecurityLevel, [Validators.required]],

            linkedDocument: [linkedDocuments.length === 0 ? null : linkedDocuments[0]?.id],
            linkedDocumentDetails: [linkedDocuments.length === 0 ? null : `${linkedDocuments[0]?.id}, ${linkedDocuments[0]?.title}`],

            title: [document.title, [Validators.required]],
            content: [document.content, [Validators.required]],

            reviewers: this.formBuilder.array([])
        });
        this.filesToBeUploaded = null;
    }


    checkDocumentTypesPermission(allDocumentTypes) {
        this.documentTypesList = [];
        allDocumentTypes.forEach(element => {
            if (element.slug === 'HUKUM') {
                if (this.globals.principal.hasAuthority(['DOCMNG_DOC_TYPE_HUKUM'])) {
                    this.documentTypesList.push(element);
                }
            } else if (element.slug === 'ESTILAM') {
                if (this.globals.principal.hasAuthority(['DOCMNG_DOC_TYPE_ESTILAM'])) {
                    this.documentTypesList.push(element);
                }
            } else if (element.slug === 'PESHNIHAD') {
                if (this.globals.principal.hasAuthority(['DOCMNG_DOC_TYPE_PESHNIHAD'])) {
                    this.documentTypesList.push(element);
                }
            } else if (element.slug === 'MAKTOB') {
                if (this.globals.principal.hasAuthority(['DOCMNG_DOC_TYPE_MAKTOB'])) {
                    this.documentTypesList.push(element);
                }
            } else if (element.slug === 'FARMAN') {
                if (this.globals.principal.hasAuthority(['DOCMNG_DOC_TYPE_FARMAN'])) {
                    this.documentTypesList.push(element);
                }
            } else if (element.slug === 'HIDAYAT') {
                if (this.globals.principal.hasAuthority(['DOCMNG_DOC_TYPE_HIDAYAT'])) {
                    this.documentTypesList.push(element);
                }
            } else if (element.slug === 'NOTE') {
                if (this.globals.principal.hasAuthority(['DOCMNG_DOC_TYPE_NOTE'])) {
                    this.documentTypesList.push(element);
                }
            } else {
                this.documentTypesList.push(element);
            }
        });
    }

    newNoteSection() {
        return this.formBuilder.group({
            title: [null],
            content: [null],
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

    goToDocumentsList() {
        let route = `doc_mng/documents`;
        if (this.mainRoute && this.mainRoute == 'my') {
            route += `/my`;
        }
        // if documentId is set then it means its called from executions
        if (this.documentId) {
            route += `/` + this.documentId + `/executions`
        }
        this.router.navigate([route]);
    }
}