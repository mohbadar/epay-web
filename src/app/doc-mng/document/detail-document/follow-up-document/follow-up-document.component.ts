import { ChangeDetectionStrategy, Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MinistryService } from 'app/services/ministry.service';
import { AuthorityService } from 'app/services/authority.service';
import { CommissionService } from 'app/services/commission.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { CreateFollowUpDocumentComponent } from './create-follow-up-document/create-follow-up-document.component';
import { FollowUpDocumentService } from './follow-up-document.service';
import { EditFollowUpDocumentComponent } from './edit-follow-up-document/edit-follow-up-document.component';
import { Globals } from 'app/_helpers/globals';
import { DocumentService } from '../../document.service';
import { DocMngService } from 'app/doc-mng/doc-mng.service';
import { DateConvertService } from 'app/services/date-convert.service';

@Component({
    selector: 'app-follow-up-document',
    templateUrl: './follow-up-document.component.html',
    styleUrls: ['./follow-up-document.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FollowUpDocumentComponent implements OnInit, AfterViewInit {
    @Input() docId;
    @Input() documentDetails;
    documentFollowups;

    users$;
    // These fields belong to the assign user modal
    assignedUser;
    dueDate = '';

    modalRef;
    assignSubmitted = false;

    // the following variables belong to edit due data
    showDueDateEditField;
    selectedDocFollowUpId;
    currentDueDate;


    dataCount = new Array();
    // followData = [];
    userId;
    departmentId;
    toBeDeletedRecordId;
    recentAssignees;
    recentStatus;

    constructor(
        private cdref: ChangeDetectorRef,
        public spinner: NgxSpinnerService,
        private formBuilder: FormBuilder,
        private router: Router,
        private docMngService: DocMngService,
        public globals: Globals,
        private followUpDocumentService: FollowUpDocumentService,
        public translate: TranslateService,
        private modalService: NgbModal,
        private ministryService: MinistryService,
        private authorityService: AuthorityService,
        private commissionService: CommissionService,
        public toastr: ToastrService,
        private dateConvertService: DateConvertService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        console.log("Doc id in FollowUp: ", this.docId);
        this.userId = this.globals.principal.id;
        console.log('Department ID: ', this.globals.principal.departmentId);
        this.departmentId = this.globals.principal.departmentId;
        
        this.getFollowups();
        this.loadCountFollow();
        this.loadUsers();
    }

    loadUsers() {
        this.users$ = this.docMngService.getModuleUsersList();
    }

    reload() {
        this.getFollowups();
    }

    getFollowups() {
        this.spinner.show('followSpinner');
        this.followUpDocumentService.getFollowUpByDocument(this.docId).subscribe(res => {
            console.log("follow up data: ", res);
            this.spinner.hide('followSpinner');
            this.documentFollowups = res;
            // this.getRecentAssignees();
            // this.getRecentStatus();
            this.cdr.detectChanges();

        }, err => {
            this.spinner.hide('followSpinner');
            this.documentFollowups = [];
            console.log("follow up error: ", err);
        });
    }

    loadCountFollow() {
        this.dataCount = [];
        this.spinner.show();
        this.followUpDocumentService.getFollowUpCountByType(this.docId).subscribe(res => {
            console.log("followUp Count: ", res);


            for (let i = 0; i < res.length; i++) {
                let item = {}
                item["count"] = res[i][0];
                item["name"] = res[i][1];
                this.dataCount.push(item);
            }
            this.cdr.detectChanges();
            this.spinner.hide();

            console.log("dataCount: ", this.dataCount);
        }, err => {
            console.log("error in data: ", err);
            this.spinner.hide();
        });
    }


    downloadAttachment(id) {
        this.followUpDocumentService.downloadAttachment(id);
    }

    reloadPage() {
        // save current route first
        const currentRoute = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentRoute]); // navigate to same route
        });
    }

    confirmDeleteModal(content, id) {
        console.log("record to be deleted: ", id);
        this.toBeDeletedRecordId = id;
        this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
    }

    deleteRecord() {
        console.log("record to be deleted called: ", this.toBeDeletedRecordId);
        this.followUpDocumentService.deleteFollowUp(this.toBeDeletedRecordId).subscribe(res => {
            this.showSuccessToast("FOLLOWUP", "DELETED_SUCCESSFULLY");
            this.ngOnInit();
        }, err => {
            this.showErrorToast("FOLLOWUP", "ERROR");
        });
    }

    openAssignModal(content) {
        this.modalRef = this.modalService.open(content, { ariaLabelledBy: "modal-basic-title", backdrop: 'static', keyboard: false });
    }

    closeAssignModal() {
        this.modalRef.close();
        this.assignedUser = null;
        this.dueDate = '';
    }

    assignUserToFollowUp() {
        console.log('Users are: ', this.assignedUser);
        this.assignSubmitted = true;
        const data = {
            userId: this.assignedUser,
            dueDate: this.dueDate
        }

        this.followUpDocumentService.assignUser(this.docId, data).subscribe(res => {
            this.assignSubmitted = false;
            this.assignedUser = null;
            this.dueDate = '';
            this.getFollowups();
            console.log('Users assigned: ', res);
            this.modalRef.close();
        }, err => {
            this.assignSubmitted = false;
        });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.cdref.detectChanges();
        }, 100);

    }

    showErrorToast(title, message) {
        const header = this.translate.instant(title);
        const msg = this.translate.instant(message);
        this.toastr.error(msg, header, {
            positionClass: 'toast-top-left',
        });
    }

    showSuccessToast(title, message) {
        const header = this.translate.instant(title);
        const msg = this.translate.instant(message);
        this.toastr.success(msg, header, {
            positionClass: 'toast-top-left',
        });
    }


    open(decreeData, component, cType = 'other', size = 'lg') {
        const modalRef = this.modalService.open(component, {
            centered: true,
            size: <any>size,
            backdrop: cType == 'view' ? true : 'static',
            keyboard: cType == 'view' ? true : false
        });
        if (decreeData) {
            modalRef.componentInstance.data = decreeData;
            modalRef.componentInstance.docId = this.docId;
            modalRef.componentInstance.followupEventEmitter.subscribe((data) => {
                this.ngOnInit();
            })

        }
        modalRef.result.then(data => {
            console.log("🚀 ~ file: decree.component.ts ~ line 225 ~ DecreeComponent ~ open ~ data", data)
            switch (data.type) {
                case 'edit':
                    this.showSuccessToast(data.title, 'Successfully edited');
                    this.loadCountFollow();
                    this.getFollowups();
                    // this.reloadPage();
                    break;
                case 'create':
                    this.showSuccessToast(data.title, 'Successfully created');
                    this.loadCountFollow();
                    this.getFollowups();
                    // this.reloadPage();
                    break;
            }
        }).catch(err => {
            console.log('Modal dismissed');
        });
    }

    editFollowUP(id) {
        this.followUpDocumentService.getFollowUpDetails(id).subscribe(res => {
            let data = res;
            console.log('-------------- data: ', res);
            this.open(data, EditFollowUpDocumentComponent, 'edit', 'lg');
        }, err => {
            console.log("error in data: ", err);
            this.showErrorToast("ERROR", "ERROR");
        });
    }


    createFollowUp(docFollowUpId) {
        const modalRef = this.modalService.open(CreateFollowUpDocumentComponent, { size: 'lg', backdrop: true },);
        modalRef.componentInstance.docFollowUpId = docFollowUpId;
        modalRef.componentInstance.newFollowupEvent.subscribe((res) => {
            // this.documentFollowups.push(res);
            this.getFollowups();
            this.cdref.markForCheck();
        });
    }

    deleteActivity(e) {
        this.getFollowups();
    }

    editDueDate(content, id, date) {
        this.showDueDateEditField = true;
        this.dueDate = this.dateConvertService.convertToDariDate(date);
        this.currentDueDate = this.dueDate;
        this.selectedDocFollowUpId = id;

        this.modalRef = this.modalService.open(content, {
            centered: true,
            backdrop: 'static',
            keyboard: false
        });
    }

    updateDueDate() {
        this.assignSubmitted = true;
        this.followUpDocumentService.updateDueDate(this.selectedDocFollowUpId, this.dueDate).subscribe((res: any) => {
            this.assignSubmitted = false;
            this.dueDate = '';
            this.modalRef.close();
            this.documentFollowups.forEach(element => {
                if (element.id == this.selectedDocFollowUpId) {
                    element.dueDate = res.dueDate;
                    this.showDueDateEditField = false;
                }
            });

            this.cdref.detectChanges();
        }, err => {
            this.assignSubmitted = false;
        })
    }

    // getRecentAssignees() {
    //     if (this.documentFollowups != 0) {
    //         for (let i = 0; i < this.documentFollowups.length; i++) {
    //             if (this.documentFollowups[i].assignedTo.length !== 0) {
    //                 console.log(this.documentFollowups);
    //                 this.recentAssignees = this.documentFollowups.assignedTo.map(a => a.name);
    //                 break;
    //             }
    //         }
    //     }
    // }

    // getRecentStatus() {
    //     if (this.documentFollowups.length != 0) {
    //         this.recentStatus = this.documentFollowups[0].followupStatus.nameDr;
    //     }
    // }

}
