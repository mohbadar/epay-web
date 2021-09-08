import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DocumentService } from 'app/doc-mng/document/document.service';
import { BaseService } from 'app/services/base-service';
import { DateConvertService } from 'app/services/date-convert.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-comment-document',
  templateUrl: './create-comment-document.component.html',
  styleUrls: ['./create-comment-document.component.scss']
})
export class CreateCommentDocumentComponent implements OnInit {
	@Input() docId;
	@Output() newCommentEvent: EventEmitter<any> = new EventEmitter();
	dataLoadingFlag = true;
	commentForm;

	constructor(private router: Router, private route: ActivatedRoute,
		private spinner: NgxSpinnerService,
		private translate: TranslateService,
		private toastr: ToastrService,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private baseService: BaseService,
		private dConvert: DateConvertService,
		private translatedToastr: TranslatedToastrService,
		private authService: AuthService,
		private activeModal: NgbActiveModal,
		private documentService: DocumentService) {
		this.initializeForm();
	}

	ngOnInit(): void {
	}

	initializeForm() {
		this.commentForm = this.fb.group({
			comment: [null, [Validators.required]],
		});
	}

	addComment(){ 
		let obj = this.commentForm.value;
		this.spinner.show();
		this.documentService.addComment(this.docId, obj).subscribe((res: any) => {
			this.spinner.hide();
			this.commentForm.reset({});
			this.newCommentEvent.emit(res);
			this.dataLoadingFlag = false;
        }, err => {
            this.spinner.hide();
			this.dataLoadingFlag = false;
            this.translatedToastr.error("DECREE", "FETCHING_ERR_MSG");
			this.authService.checkUserLogin();
        });
	}
}
