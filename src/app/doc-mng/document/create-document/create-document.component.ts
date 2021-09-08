import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from 'app/services/base-service';
import { DateConvertService } from 'app/services/date-convert.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DocumentService } from '../document.service';
import { DocMngService } from '../../doc-mng.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentTypeTemplateService } from 'app/doc-mng/config/document-type-template/document-type-template.service';
import { SearchDocumentComponent } from '../search-document/search-document.component';
import { ProvinceService } from 'app/services/province.service';
import { Globals } from 'app/_helpers/globals';

export class UploadAdapter {
    private loader;
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                var myReader = new FileReader();
                myReader.onloadend = (e) => {
                    resolve({ default: myReader.result });
                }

                myReader.readAsDataURL(file);
            }));
    };
}

@Component({
    selector: 'app-create-document',
    templateUrl: './create-document.component.html',
    styleUrls: ['./create-document.component.scss']
})
export class CreateDocumentComponent implements OnInit {
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

    newForm: FormGroup;
    formSubmitAttempt = false;
    currentDate;
    currentTime;
    // showNewDocument;

    entities$;
    departments$;
    documenttypes$;
    myFinalizedDocuments$;
    securityLevels;
    priorityTypes;
    users$

    attachmentFileNames;
    filesToBeUploaded;
    entityId;
    departmentId;
    entitiesDeps$;
    fileName;
    selectedDocumentTypeName;
    issuingAuthorities$;
    categories$;
    provinces;
    documentTypesList;
    noteType$;
    reviewerRequired: boolean;

    mainRoute = '';
    docType = '';
    docId;
    noteSectionsArray;
    reviewersArray;

    constructor(private router: Router, private route: ActivatedRoute,
        private spinner: NgxSpinnerService, private translate: TranslateService,
        private toastr: ToastrService, private fb: FormBuilder,
        private cdr: ChangeDetectorRef, private baseService: BaseService,
        private docMngService: DocMngService,
        private modalService: NgbModal,
        private provinceService: ProvinceService,
        public globals: Globals,
        private dConvert: DateConvertService, private translatedToastr: TranslatedToastrService,
        private authService: AuthService, private documentService: DocumentService,
        private documentTypeTemplate: DocumentTypeTemplateService) { }

    ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.mainRoute = data?.route;
        });

        this.route.params.subscribe(routeParams => {
            this.docId = routeParams?.id;
        });

        this.reviewerRequired = this.globals.principal.reviewerRequired;
        this.entityId = this.authService.principal.entityId;
        this.departmentId = this.authService.principal.departmentId;

        this.fetchEssentialData();
        this.initializeForm();
        let localLang = localStorage.getItem('lang');
    }

    changeScope(event) {
        if (event.target.defaultValue === 'EXTERNAL') {
            this.newForm.get('scope').setValue("EXTERNAL");
            this.newForm.get('fromDepartmentId').setValue(this.departmentId);
            this.entitiesDeps$ = this.baseService.getEntityList();
            this.newForm.get('toDepartmentId').setErrors(null);
            this.newForm.get('toDepartmentId').clearValidators();
            this.newForm.get('toDepartmentId').setValue(null);
            this.cdr.detectChanges();
        }
        else if (event.target.defaultValue === 'INTERNAL') {
            this.newForm.get('scope').setValue("INTERNAL");
            this.newForm.get('fromDepartmentId').setValue(this.departmentId);
            this.entitiesDeps$ = this.baseService.getSubDepartmentList(this.entityId);
            this.newForm.get('toDepartmentId').setErrors(null);
            this.newForm.get('toDepartmentId').clearValidators();
            this.newForm.get('toDepartmentId').setValue(null);
            this.cdr.detectChanges();
        }
    }

    initializeForm() {
        this.currentDate = this.dConvert.convertToDariDate(this.baseService.getTodayDate());
        this.currentTime = this.baseService.getCurrentTime();


        this.newForm = this.fb.group({
            documentTypeId: [null, [Validators.required]]
        });
    }

    fetchEssentialData() {
        console.log(this.authService);
        this.loadDocumentSecurityLevels();
        this.loadDocumentPriorityTypes();
        this.docMngService.getDocumentTypesList().subscribe((data) => {
            this.checkDocumentTypesPermission(data);
        });

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

    selectDocument() {
        const modalRef = this.modalService.open(SearchDocumentComponent, {
            centered: true, size: 'xl', keyboard: false, backdrop: 'static',
        });
        modalRef.componentInstance.response.subscribe((res) => {
            if (resizeTo) {
                this.newForm.get('linkedDocument').setValue(res.ID);
                this.newForm.get('linkedDocumentDetails').setValue(res.ID + ", " + res.TITLE);
                this.cdr.detectChanges();
            }
        });
    }

    unselectDocument() {
        this.newForm.get('linkedDocument').setValue(null);
        this.newForm.get('linkedDocumentDetails').setValue("");
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

    newNoteSection() {
        return this.fb.group({
            title: [null, [Validators.required]],
            content: [null, [Validators.required]],
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

    onSubmit() {
        if (this.reviewerRequired) {
            this.newForm.controls.reviewers.setValidators([Validators.required]);
            this.newForm.controls["reviewers"].updateValueAndValidity();
        }
        console.log(this.newForm.value);
        this.formSubmitAttempt = true;
        if (this.newForm.invalid) {
            console.log(this.newForm.controls.reviewers.hasError('required'));
            if (this.reviewerRequired && this.newForm.controls.reviewers.hasError('required')) {
                this.translatedToastr.error("ERROR", "FORM_INVALID_MSG_REVIWER");
            }
            this.translatedToastr.error("ERROR", "FORM_INVALID_MSG");
            document.getElementById('newForm').classList.add('input-error');
            this.documentService.findInvalidControls(this.newForm);
        } else {
            this.submit();
        }
    }

    submit() {
        let obj = this.newForm.getRawValue();
        console.log("🚀 ~ file: create-document.component.ts ~ line 300 ~ CreateDocumentComponent ~ submit ~ let obj", obj)
        let reviewerIds = [];
        for (const reviwer of obj['reviewers']) {
            reviewerIds.push(reviwer.userId);
        }
        obj['reviewerIds'] = reviewerIds;

        this.spinner.show();
        const data = new FormData();
        data.append("file", this.filesToBeUploaded);
        data.append("obj", JSON.stringify(obj));
        console.log("all Data", this.newForm.getRawValue());

        // if(this.docType == "execution") {
        //     this.documentService.addExecution(this.docId, data).subscribe((res:any) => {
        //         this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        //         this.router.navigateByUrl(`/doc_mng/documents/my/` + res.mainDocument?.id + `/executions`);
        //         this.spinner.hide();
        //     }, (err) => {
        //         this.spinner.hide();
        //         this.translatedToastr.error("ERROR", "ERR_MSG");
        //         this.authService.checkUserLogin();
        //     });
        // } else {
        this.documentService.addRecord(data).subscribe((res: any) => {
            this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
            this.router.navigateByUrl(`/doc_mng/documents/my/` + res.id);
            this.spinner.hide();
        }, err => {
            this.spinner.hide();
            this.translatedToastr.error("ERROR", "ERR_MSG");
            this.authService.checkUserLogin();
        });
        // }
    }

    onSelectFile(event) {
        const selectedFileInput = event.target as HTMLInputElement;
        if (selectedFileInput.files && selectedFileInput.files[0]) {
            this.fileName = selectedFileInput.files[0].name;
            this.filesToBeUploaded = selectedFileInput.files[0];
        }
    }

    onSelectAll() {
        const selected = this.provinces.map(item => item.value);
        this.newForm.get('guidanceProvinces').patchValue(selected);

        this.cdr.detectChanges();
    }

    onClearAll() {
        this.newForm.get('guidanceProvinces').patchValue([]);
    }

    onDocumentTypeChange(event) {
        this.selectedDocumentTypeName = event.slug;
        switch (this.selectedDocumentTypeName) {
            case "HUKUM":
                this.enableHukumFields(event.id);
                break;
            case "HIDAYAT":
                this.enableHidayatFields(event.id);
                break;
            case "FARMAN":
                this.enableFarmanFields(event.id);
                break;
            case "NOTE":
                this.enableNoteFields(event.id);
                break;
            default:
                this.enableDefaultFields(event.id);
        }
        this.reviewersArray = this.newForm.get("reviewers") as FormArray
        if (this.reviewerRequired) {
            this.addReviewer();
        }
    }

    enableHukumFields(documentTypeId) {
        this.newForm = this.fb.group({
            scope: ["EXTERNAL", [Validators.required]],
            documentTypeId: [documentTypeId, [Validators.required]],
            documentNo: [null],
            documentDate: [null],
            fromEntityId: [{ value: this.entityId, disabled: true }, [Validators.required]],
            fromDepartmentId: [{ value: this.departmentId, disabled: true }, [Validators.required]],
            toDepartmentId: [null, [Validators.required]],
            ccDepartmentsIds: [null],
            priorityType: ["NORMAL", [Validators.required]],
            securityLevel: ["NORMAL", [Validators.required]],
            linkedDocument: [null],
            linkedDocumentDetails: [""],
            title: [null, [Validators.required]],
            content: [null, [Validators.required]],
            reviewers: this.fb.array([]),
            offerorDepartment: [null],
            implementationEndDate: [null, [Validators.required]],
            issuingAuthority: [null, [Validators.required]],
            category: [null, [Validators.required]],
            offerNo: [null]
        });
        this.filesToBeUploaded = null;
    }

    enableFarmanFields(documentTypeId) {
        this.newForm = this.fb.group({
            scope: ["EXTERNAL", [Validators.required]],
            documentTypeId: [documentTypeId, [Validators.required]],
            documentNo: [null],
            documentDate: [null],
            fromEntityId: [{ value: this.entityId, disabled: true }, [Validators.required]],
            fromDepartmentId: [{ value: this.departmentId, disabled: true }, [Validators.required]],
            toDepartmentId: [null, [Validators.required]],
            ccDepartmentsIds: [null],
            priorityType: ["NORMAL", [Validators.required]],
            securityLevel: ["NORMAL", [Validators.required]],
            linkedDocument: [null],
            linkedDocumentDetails: [""],
            implementationEndDate: [null, [Validators.required]],
            issuingAuthority: [null, [Validators.required]],
            title: [null, [Validators.required]],
            content: [null, [Validators.required]],
            reviewers: this.fb.array([])
        });
        this.filesToBeUploaded = null;
    }

    enableHidayatFields(documentTypeId) {
        this.newForm = this.fb.group({
            scope: ["EXTERNAL", [Validators.required]],
            documentTypeId: [documentTypeId, [Validators.required]],
            documentNo: [null],
            documentDate: [null],
            fromEntityId: [{ value: this.entityId, disabled: true }, [Validators.required]],
            fromDepartmentId: [{ value: this.departmentId, disabled: true }, [Validators.required]],
            toDepartmentId: [null, [Validators.required]],
            ccDepartmentsIds: [null],
            priorityType: ["NORMAL", [Validators.required]],
            securityLevel: ["NORMAL", [Validators.required]],
            linkedDocument: [null],
            linkedDocumentDetails: [""],
            implementationEndDate: [null, [Validators.required]],
            issuingAuthority: [null, [Validators.required]],
            category: [null, [Validators.required]],
            directorInstruction: [null],
            guidanceProvinces: [null, [Validators.required]],
            verbal: [null],
            maktobNo: [null],
            title: [null, [Validators.required]],
            content: [null, [Validators.required]],
            reviewers: this.fb.array([])
        });
        this.filesToBeUploaded = null;
    }

    enableNoteFields(documentTypeId) {
        this.newForm = this.fb.group({
            scope: ["INTERNAL", [Validators.required]],
            documentTypeId: [documentTypeId, [Validators.required]],
            noteType: [null, [Validators.required]],
            fromEntityId: [{ value: this.entityId, disabled: true }, [Validators.required]],
            fromDepartmentId: [{ value: this.departmentId, disabled: true }, [Validators.required]],
            priorityType: ["NORMAL", [Validators.required]],
            securityLevel: ["NORMAL", [Validators.required]],
            linkedDocument: [null],
            linkedDocumentDetails: [""],
            noteSections: this.fb.array([this.newNoteSection()]),
            reviewers: this.fb.array([])
        });
        this.noteSectionsArray = this.newForm.get("noteSections") as FormArray;
        this.filesToBeUploaded = null;
    }

    enableDefaultFields(documentTypeId) {
        this.newForm = this.fb.group({
            scope: ["EXTERNAL", [Validators.required]],
            documentTypeId: [documentTypeId, [Validators.required]],
            documentNo: [null],
            documentDate: [null],
            fromEntityId: [{ value: this.entityId, disabled: true }, [Validators.required]],
            fromDepartmentId: [{ value: this.departmentId, disabled: true }, [Validators.required]],
            toDepartmentId: [null, [Validators.required]],
            ccDepartmentsIds: [null],

            priorityType: ["NORMAL", [Validators.required]],
            securityLevel: ["NORMAL", [Validators.required]],

            linkedDocument: [null],
            linkedDocumentDetails: [""],

            title: [null, [Validators.required]],
            content: [null, [Validators.required]],

            reviewers: this.fb.array([])
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
                console.log("🚀 ~ file: create-document.component.ts ~ line 494 ~ CreateDocumentComponent ~ checkDocumentTypesPermission ~ this.documentTypesList", this.documentTypesList)
            }
        });
    }

    goToDocumentsList() {
        let route = `doc_mng/documents`;
        if (this.mainRoute && this.mainRoute == 'my') {
            route += `/my`;
        }
        // if documentId is set then it means its called from executions
        if (this.docId) {
            route += `/` + this.docId + `/executions`
        }
        this.router.navigate([route]);
    }

}
