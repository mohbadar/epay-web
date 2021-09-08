import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from 'app/services/base-service';
import { FileDownloadService } from 'app/services/file-download.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { Globals } from 'app/_helpers/globals';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentService } from '../../document.service';
import { AddNoteHukmComponent } from '../execution-note/add-note-hukm.component';
import { CreateExecutionDocumentComponent } from './create-execution-document/create-execution-document.component';
import { EditExecutionDocumentComponent } from './edit-execution-document/edit-execution-document.component';
import { ViewExecutionDocumentComponent } from './view-execution-document/view-execution-document.component';

@Component({
	selector: 'app-execution-document',
	templateUrl: './execution-document.component.html',
	styleUrls: ['./execution-document.component.scss']
})
export class ExecutionDocumentComponent implements OnInit {
	mainDocumentId;
	editorConfig = {
		height: 500,
		// menubar: true,
		plugins: [
			'print preview wordcount'
		],
		// toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | ltr rtl | bullist numlist outdent indent | image removeformat | help',
		// automatic_uploads: true,
		// file_picker_types: 'image',
		readonly: 1,
	};
	documentExecutions;
	currentUserId;
	dataLoadingFlag: boolean;
	isOwner = false;
	currentDepartment;
	implementationEndDate;
	mainRoute;

	constructor(private cdref: ChangeDetectorRef,
		private route: ActivatedRoute,
		public globals: Globals,
		private router: Router,
		public translate: TranslateService,
		private spinner: NgxSpinnerService,
		public documentService: DocumentService,
		private translatedToastr: TranslatedToastrService,
		public authService: AuthService,
		public baseService: BaseService,
		private modalService: NgbModal,
		private fileDownloadService: FileDownloadService
	) { }

	ngOnInit(): void {
		this.route.params.subscribe(routeParams => {
			this.mainDocumentId = routeParams.id;
		});
		this.route.data.subscribe(data => {
			this.mainRoute = data?.route;
			console.log(data);
		});

		this.currentUserId = this.globals.principal.id;
		this.getExecutions(this.mainDocumentId);
	}

	reload() {
		this.getExecutions(this.mainDocumentId);
	}

	getExecutions(docId) {
		this.dataLoadingFlag = true;
		this.spinner.show();
		this.documentService.getRecordExecutions(docId).subscribe((res: any) => {
			this.spinner.hide();
			console.log("all data execution:", res);
			this.documentExecutions = res;
			this.dataLoadingFlag = false;
			this.getCurrentDepartment();
			this.cdref.detectChanges();
		}, err => {
			this.spinner.hide();
			this.dataLoadingFlag = false;
			this.translatedToastr.error("DECREE", "FETCHING_ERR_MSG");
			this.authService.checkUserLogin();
		});
	}

	addExecution() {
		this.router.navigate([`doc_mng/documents/my/${this.mainDocumentId}/executions/add`])
	}


	redirectTo(uri: string) {
		this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
			this.router.navigate([uri]));
	}


	getCurrentDepartment() {
		if (this.documentExecutions != null) {
			for (let i = 0; i < this.documentExecutions.length; i++) {
				if (this.documentExecutions[i] != null) {
					if (this.documentExecutions[i].toDepartment != null) {
						this.currentDepartment = this.documentExecutions[i].toDepartment.nameDr;
					}
					break;
				}
			}
		}
	}

	


	viewDetial(id){
		const modalRef = this.modalService.open(ViewExecutionDocumentComponent, { size: 'xl', backdrop: true },);
		modalRef.componentInstance.docId = id;
		modalRef.componentInstance.viewEventEmitter.subscribe((res) => {
			this.getExecutions(this.mainDocumentId);
			this.cdref.markForCheck();
		});

	}

}
