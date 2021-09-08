import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from 'app/services/base-service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrintPreviewComponent } from '../print-preview/print-preview.component';
import { EvaluateDocumentComponent } from '../evaluate-document/evaluate-document.component';
import { DocumentService } from './../../document.service';
import { DateUtil } from 'app/_utils/date-util';
import { FileDownloadService } from 'app/services/file-download.service';
import { Globals } from 'app/_helpers/globals';

@Component({
	selector: 'app-view-document',
	templateUrl: './view-document.component.html',
	styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent implements OnInit {
	editorConfig = {
		height: 842,
		// menubar: true,
		plugins: [
			'print preview wordcount'
		],
		// toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | ltr rtl | bullist numlist outdent indent | image removeformat | help',
		// automatic_uploads: true,
		// file_picker_types: 'image',
		readonly: 1,
	};
	@Input() docId;
	@Input() documentDetails;
	@Output() fetchDocumentEvent: EventEmitter<any> = new EventEmitter();
	dataLoadingFlag = true;
	data;
	document;
	linkedDocuments;
	url = 'api/public/documents/';
	dueDays = 0;
	isOwner = false;
	currentUserId;

	constructor(private cdref: ChangeDetectorRef,
		private route: ActivatedRoute,
		private router: Router,
		public globals: Globals,
		public translate: TranslateService,
		private spinner: NgxSpinnerService,
		private documentService: DocumentService,
		private translatedToastr: TranslatedToastrService,
		private authService: AuthService,
		public baseService: BaseService,
		private modalService: NgbModal,
		public dateUtil: DateUtil,
		private fileDownloadService: FileDownloadService
	) { }

	ngOnInit(): void {
		this.currentUserId = this.globals.principal.id;
		this.url += this.docId + '/genQRCode/250/250'
		// this.documentId = this.route.snapshot.paramMap.get('id');
		let localLang = localStorage.getItem('lang');
		this.setDocumetDetails();
	}

	reload() {
		this.fetchDocumentEvent.emit(null);
	}

	setDocumetDetails() {
		this.documentDetails;
		this.document = this.documentDetails.document;
		this.linkedDocuments = this.documentDetails.linkedDocuments;
		console.log(this.documentDetails);
		this.calculateDueDays();
		this.isOwner = this.documentService.isOwner(this.document, this.authService);
		this.dataLoadingFlag = false;
	}
	// getRecord(id) {
	// 	this.dataLoadingFlag = true;
	// 	this.spinner.show();
	// 	this.documentService.getRecordById(id).subscribe((res: any) => {
	// 		this.spinner.hide();
	// 		this.data = res;
	// 		this.document = this.data.document;
	// 		this.linkedDocuments = this.data.linkedDocuments;
	// 		console.log(this.document);
	// 		console.log(this.data);
	// 		this.calculateDueDays();
	// 		this.isOwner = this.documentService.isOwner(this.document, this.authService);
	// 		this.isReceiver = this.documentService.isReceiver(this.document?.receives, this.authService);
	// 		this.dataLoadingFlag = false;
	// 	}, err => {
	// 		this.spinner.hide();
	// 		this.dataLoadingFlag = false;
	// 		this.translatedToastr.error("DECREE", "FETCHING_ERR_MSG");
	// 		this.authService.checkUserLogin();
	// 	});
	// }

	calculateDueDays() {
		if(this.document.followup) {
			this.dueDays = this.dateUtil.getNumberOfDays(new Date(), this.document?.dueDate)
		}
	}

	parseDateObjectAsDate(obj) {
		return this.baseService.parseDateObjectAsDate(obj);
	}

	editDocument(documentId) {
		this.router.navigate(['/doc_mng/documents/' + documentId + '/edit']);
		// this.spinner.show();
		// this.documentService.getRecordById(documentId).subscribe((data: any) => {
		//   console.log('you data has', data);
		//   const modalRef = this.modalService.open(EditDocumentComponent, { size: 'xl', backdrop: 'static'});
		//   modalRef.componentInstance.data = data.document;
		//   modalRef.componentInstance.editDocumentEventEmitter.subscribe((updatedRecord) => {
		// 	this.getRecord(this.docId);
		//   })
		//   this.spinner.hide();
		// }, (error) => {
		//   this.spinner.hide();
		// });
	}

	addFollowupDetails(documentId) {
		const modalRef = this.modalService.open(EvaluateDocumentComponent, {
			centered: true, size: 'md', keyboard: false,	backdrop: 'static',
		});
		modalRef.componentInstance.docId = documentId;
		modalRef.componentInstance.document = this.document;
		modalRef.componentInstance.response.subscribe((res) => {
			if(res) {
				this.document = res;
				this.calculateDueDays();
			}
		});
	}

	imageError(el) {
		el.onerror = '';
		el.src = '../../../../assets/img/portrait/small/face-0.png';
		return true;
	}

	openPrintPreview() {
		const modal = this.modalService.open(PrintPreviewComponent, {
			size: "lg"
		});
		modal.componentInstance.document = this.data.document;
	}


	print(id) {
		this.documentService.printDocument(id);
	}

	setDocStatusExecuted(docId) {
		this.spinner.show();
		this.documentService.setDocStatusExecuted(docId, {}).subscribe((res: any) => {
			this.spinner.hide();
			if(res) {
				this.fetchDocumentEvent.emit({"document": res});
			}
		}, err => {
			this.spinner.hide();
			this.translatedToastr.error("DOCUMENT", "FETCHING_ERR_MSG");
			this.authService.checkUserLogin();
		});
	}

	finalizeDocStatus(docId) {
		console.log(docId);
		if(this.documentService.hasPendingReview(this.document.reviews)) {
			// you have pendding review
			this.translatedToastr.error("DOCUMENT", "FETCHING_ERR_MSG");
		} else {
			this.spinner.show();
			this.documentService.finalizeDocStatus(docId, {}).subscribe((res: any) => {
				this.spinner.hide();
				if(res) {
					this.fetchDocumentEvent.emit({"document": res});
				}
			}, err => {
				this.spinner.hide();
				this.translatedToastr.error("DOCUMENT", "FETCHING_ERR_MSG");
				this.authService.checkUserLogin();
			});
		}
	}

	receiveDocument(docId, receiveId, decision) {
		console.log("Receive Doc");
		this.spinner.show();
		this.documentService.receivingDocument(docId, receiveId, {'decision': decision, comment: ''}).subscribe((res: any) => {
			this.spinner.hide();
			this.reload();
			console.log(res);
		}, err => {
			this.spinner.hide();
			this.translatedToastr.error("DECREE", "FETCHING_ERR_MSG");
			this.authService.checkUserLogin();
		});
	}

	approveReview(reviewId, docId) {
		let msg = this.translate.instant('ARE_YOU_SURE?');
		const response = confirm(this.translate.instant(msg));
        if (response) {
			let data = { 'docId': docId, 'userId': this.currentUserId, 'decision': 'APPROVED', comment: '' };
			this.spinner.show();
			this.documentService.updateDocumentReviewDecision(reviewId, data).subscribe((res: any) => {
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

	rejectReview(reviewId, docId) {
		let msg = this.translate.instant('PLEASE_ENTER_REASON?');
		var reason =prompt(this.translate.instant(msg));
        if (reason != null) {
			let data = { 'docId': docId, 'userId': this.currentUserId, 'decision': 'REJECTED', comment: reason };
			this.spinner.show();
			this.documentService.updateDocumentReviewDecision(reviewId, data).subscribe((res: any) => {
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

	resetReview(reviewId, docId) {
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

	downloadFile(documentId) {
		this.spinner.show();
		this.fileDownloadService.download(`/api/doc_mng/documents/download-file/${documentId}`);
		this.spinner.hide();
	}

	openLinkedDocument(docId) {
		this.router.navigateByUrl('/doc_mng/documents/' + docId);
	}
}

