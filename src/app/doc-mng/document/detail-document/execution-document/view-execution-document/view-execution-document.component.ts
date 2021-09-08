import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DocMngService } from 'app/doc-mng/doc-mng.service';
import { DocumentService } from 'app/doc-mng/document/document.service';
import { SearchDocumentComponent } from 'app/doc-mng/document/search-document/search-document.component';
import { BaseService } from 'app/services/base-service';
import { FileDownloadService } from 'app/services/file-download.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { Globals } from 'app/_helpers/globals';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddNoteHukmComponent } from '../../execution-note/add-note-hukm.component';

@Component({
    selector: 'app-view-execution-document',
    templateUrl: './view-execution-document.component.html',
    styleUrls: ['./view-execution-document.component.scss']
})
export class ViewExecutionDocumentComponent implements OnInit {

    @Output() viewEventEmitter = new EventEmitter<Object>();
    @Input() docId;
    exec;
    linkDocument;
    mainDocumentId;
    currentUserId;
    dataLoading = false;

    constructor(
        private baseService: BaseService,
        private documentService: DocumentService,
        private docMngService: DocMngService,
        private translatedToastr: TranslatedToastrService,
        private fb: FormBuilder, 
        private authService: AuthService,
        private ngModal: NgbModal,
        private translate: TranslateService,
        private spinner: NgxSpinnerService,
        public activeModal: NgbActiveModal,
        private changeDetector: ChangeDetectorRef,
        private router: Router,
        private modalService: NgbModal,
        private globals: Globals,
        private route: ActivatedRoute,
        private fileDownloadService: FileDownloadService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(routeParams => {
			this.mainDocumentId = routeParams.id;
		});

        this.currentUserId = this.globals.principal.id;

        this.getDocumentDetail(this.docId);
    }


    getDocumentDetail(docId) {
		this.documentService.getRecordById(docId).subscribe((res: any) => {
			console.log("document by Id:", res);
			this.exec = res['document'];
            this.dataLoading = true;
            this.linkDocument = res['linkedDocuments'];
            this.changeDetector.detectChanges();
		}, err => {
			this.translatedToastr.error("DECREE", "FETCHING_ERR_MSG");
            this.dataLoading = false;
			this.authService.checkUserLogin();
		});
	}



    closeModal(data = null) {
		this.activeModal.close(data);
        this.viewEventEmitter.emit(this.exec);
	}

	dismiss() {
		this.closeModal();
	}



    editExecution(executionId) {
        this.dismiss();
		this.router.navigate([`doc_mng/documents/my/${this.mainDocumentId}/executions/${executionId}/edit`])
	}
	de

	deleteExecution(executionId) {
		this.documentService.removeRecordExecutions(executionId).subscribe(
			(res) => {
				console.log("remove execution res >>>>", res);
				this.redirectTo("/doc_mng/document/" + this.mainDocumentId);
			},
			(err) => {
				console.log("remove execution err >>>", err);
			}
		);
	}

	redirectTo(uri: string) {
		this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
			this.router.navigate([uri]));
	}

	finalizeExecution(exec) {
		// Only owner/creator of the execution can finalize the execution.
		// Also the execution will be finalizable only if all reviews are approved
		console.log(exec);
		if (this.documentService.hasPendingReview(exec.reviews)) {
			// you have pendding review
			this.translatedToastr.error("DOCUMENT", "FETCHING_ERR_MSG");
		} else {
			this.spinner.show();
			this.documentService.finalizeExecutionStatus(this.mainDocumentId, exec.id, {}).subscribe((res: any) => {
				this.spinner.hide();
				if (res) {
					this.getDocumentDetail(this.docId);
				}
			}, err => {
				this.spinner.hide();
				this.translatedToastr.error("DOCUMENT", "FETCHING_ERR_MSG");
				this.authService.checkUserLogin();
			});
		}
	}

	receiveExecution(execId, receiveId, decision) {
		this.spinner.show();
		this.documentService.receivingExecution(this.mainDocumentId, execId, receiveId, {'decision': decision, comment: ''}).subscribe((res: any) => {
			this.spinner.hide();
			if (res) {
                this.getDocumentDetail(this.docId);
			}
		}, err => {
			this.spinner.hide();
			this.translatedToastr.error("DOCUMENT", "FETCHING_ERR_MSG");
			this.authService.checkUserLogin();
		});
	}

	approveReview(reviewId, executionid) {
		const response = confirm('Are you sure you want to approve?');
		if (response) {
			let data = { 'executionId': executionid, 'userId': this.currentUserId, 'decision': 'APPROVED', comment: '' };
			this.spinner.show();
			this.documentService.updateExecutionReviewDecision(this.mainDocumentId, reviewId, data).subscribe((res: any) => {
				this.spinner.hide();
				this.reload();
				console.log(res);
			}, err => {
				this.spinner.hide();
				this.translatedToastr.error("DECREE", "FETCHING_ERR_MSG");
				this.authService.checkUserLogin();
			});
		}
	}

    reload() {
		this.getDocumentDetail(this.docId);
	}

	rejectReview(reviewId, executionid) {
		var reason = prompt("Please enter the reason:");
		if (reason != null) {
			let data = { 'executionId': executionid, 'userId': this.currentUserId, 'decision': 'REJECTED', comment: reason };
			this.spinner.show();
			this.documentService.updateExecutionReviewDecision(this.mainDocumentId, reviewId, data).subscribe((res: any) => {
				this.spinner.hide();
				this.reload();
				console.log(res);
			}, err => {
				this.spinner.hide();
				this.translatedToastr.error("DECREE", "FETCHING_ERR_MSG");
				this.authService.checkUserLogin();
			});
		}
	}

	resetReview(reviewId, execId) {
		let msg = this.translate.instant('ARE_YOU_SURE?');
		const response = confirm(this.translate.instant(msg));
        if (response) {
			this.spinner.show();
			this.documentService.resetDocumentReviewDecision(reviewId, {}).subscribe((res: any) => {
				this.spinner.hide();
				this.reload();
				console.log(res);
			}, err => {
				this.spinner.hide();
				this.translatedToastr.error("DECREE", "FETCHING_ERR_MSG");
				this.authService.checkUserLogin();
			});
		}
	}

	downloadExecutionAttachment(documentExecutionId) {
		this.spinner.show();
		this.fileDownloadService.download(`/api/doc_mng/document-execution/download-file/${documentExecutionId}`);
		this.spinner.hide();
	}

	printDocumentExecution(documentExecutionId) {
		this.documentService.printDocumentExecution(this.mainDocumentId, documentExecutionId);
	}


	addNoteHukm(id) {
		const modalRef = this.modalService.open(AddNoteHukmComponent, { size: 'lg', backdrop: true },);
		modalRef.componentInstance.docId = this.mainDocumentId;
		modalRef.componentInstance.id = id;
		modalRef.componentInstance.addNoteHukmEvent.subscribe((res) => {
			this.getDocumentDetail(this.mainDocumentId);
			this.changeDetector.markForCheck();
		});
	}

   
}
