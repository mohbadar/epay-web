import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { EditDocumentComponent } from 'app/doc-mng/document/detail-document/edit-document/edit-document.component';
import { DocumentService } from 'app/doc-mng/document/document.service';
import { BaseService } from 'app/services/base-service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentTypeTemplateService } from '../document-type-template.service';


@Component({
  selector: 'app-view-document-type-template',
  templateUrl: './view-document-type-template.component.html',
  styleUrls: ['./view-document-type-template.component.scss']
})
export class ViewDocumentTypeTemplateComponent implements OnInit {
	editorConfig = {
		height: 500,
		// menubar: true,
		plugins: [
			'print preview wordcount'
		],
		// toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | ltr rtl | bullist numlist outdent indent | image removeformat | help',
		// automatic_uploads: true,
		// file_picker_types: 'image',
		readonly : 1,
	};

	@Input() docId;
	dataLoadingFlag = true;
	data;
	document;

	constructor(private cdref: ChangeDetectorRef,
		private route: ActivatedRoute,
        public translate: TranslateService,
        private spinner: NgxSpinnerService,
		private documentService: DocumentService,
		private translatedToastr: TranslatedToastrService,
		private documentTypeTemplateService: DocumentTypeTemplateService,
		private authService: AuthService,
		public baseService: BaseService,
		private modalService: NgbModal,
		) { 
			this.docId = this.route.snapshot.paramMap.get('id');
		}

	ngOnInit(): void {
		// this.documentId = this.route.snapshot.paramMap.get('id');
		console.log("docID: ", this.docId);
		let localLang = localStorage.getItem('lang');
		this.getRecord(this.docId);
	}

	getRecord(id) {
		this.dataLoadingFlag = true;
		this.spinner.show();
        this.documentTypeTemplateService.getRecordById(id).subscribe((res: any) => {
            this.spinner.hide();
			this.data = res;
			this.document = this.data.template;
			console.log("Data:", this.data);
			this.dataLoadingFlag = false;
        }, err => {
            this.spinner.hide();
			this.dataLoadingFlag = false;
            this.translatedToastr.error("DECREE", "FETCHING_ERR_MSG");
			this.authService.checkUserLogin();
        });
	}

	parseDateObjectAsDate(obj) {
		return this.baseService.parseDateObjectAsDate(obj);
	}

	editDocument(documentId) {
		this.spinner.show();
		this.documentService.getRecordById(documentId).subscribe((data: any) => {
		  console.log('you data has', data);
		  const modalRef = this.modalService.open(EditDocumentComponent, { size: 'xl', backdrop: 'static'});
		  modalRef.componentInstance.data = data.document;
		  modalRef.componentInstance.editDocumentEventEmitter.subscribe((updatedRecord) => {
			this.getRecord(this.docId);
		  })
		  this.spinner.hide();
		}, (error) => {
		  this.spinner.hide();
		});
	}

  print(id){
    this.documentService.printDocument(id);
  }
}
