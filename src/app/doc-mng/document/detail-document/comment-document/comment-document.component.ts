import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from 'app/services/base-service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentService } from '../../document.service';

@Component({
  selector: 'app-comment-document',
  templateUrl: './comment-document.component.html',
  styleUrls: ['./comment-document.component.scss']
})
export class CommentDocumentComponent implements OnInit {
	@Input() docId;
	documentComments;
	dataLoadingFlag: boolean;
	
	constructor(private spinner: NgxSpinnerService, private translatedToastr: TranslatedToastrService,
		private authService: AuthService,
		private activeModal: NgbActiveModal,
		private baseService: BaseService,
		private documentService: DocumentService,) {
	}

	ngOnInit(): void {
		console.log("Show Comments");
		this.getComments(this.docId);
	}

	getComments(docId) {
		this.dataLoadingFlag = true;
		this.spinner.show();
        this.documentService.getRecordComments(docId).subscribe((res: any) => {
            this.spinner.hide();
			this.documentComments = res;
			this.dataLoadingFlag = false;
        }, err => {
            this.spinner.hide();
			this.dataLoadingFlag = false;
            this.translatedToastr.error("DECREE", "FETCHING_ERR_MSG");
			this.authService.checkUserLogin();
        });
	}

	addComment(comment) {
		this.documentComments.push(comment);
	}

	editComment(commentId) {

	}

	deleteComment(commentId) {

	}
}
