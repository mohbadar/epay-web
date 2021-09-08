import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-detail-document',
  templateUrl: './detail-document.component.html',
  styleUrls: ['./detail-document.component.scss']
})
export class DetailDocumentComponent implements OnInit {
	activeTab = "document";
	docId;
	active = 'document';
	loading = true;
	documentDetails;
	mainRoute = '';
	tabs = ['document', 'executions', 'followups', 'comments', 'attachments']

	constructor(private router: Router, private route: ActivatedRoute, 
		private cdref: ChangeDetectorRef, private spinner: NgxSpinnerService,
		private documentService: DocumentService, private translatedToastr: TranslatedToastrService,
		private authService: AuthService,) { }

	ngOnInit(): void {
		this.route.params.subscribe(routeParams => {
			this.loading = true;
			this.cdref.detectChanges();
			this.docId = routeParams.id;
			let url = this.router.url;
			let segment = url.split("/");
			let lastSegment = segment.pop();
			if(this.tabs.includes(lastSegment)) {
				this.active = lastSegment;
				this.cdref.detectChanges();
			}
			
			this.getDocument(this.docId);
		});

		this.route.data.subscribe(data => {
			this.mainRoute = data?.route;
		});
		
	}

	setActiveTab(tab) {
		this.activeTab = tab;
	}

	goToDocumentsList() {
		if(this.mainRoute && this.mainRoute == 'my') {
			this.router.navigate([`doc_mng/documents/my`]);
		} else {
			this.router.navigate([`doc_mng/documents`]);
		}
	}

	getDocument(id) {
		this.loading = true;
		this.spinner.show();
		this.documentService.getRecordById(id).subscribe((res: any) => {
			this.spinner.hide();
			this.documentDetails = res;
			this.loading = false;
			this.cdref.detectChanges();
		}, err => {
			this.spinner.hide();
			this.loading = false;
			this.translatedToastr.error("", "FETCHING_ERR_MSG");
			this.authService.checkUserLogin();
		});
	}

	fetchDocument(data) {
		console.log(data);
		if(data) {
			this.loading = true;
			this.spinner.show();
			let temp = this.documentDetails;
			this.documentDetails = {};
			this.cdref.detectChanges();
			
			if(data.document) {
				temp.document = data.document;
			}
			if(data.linkedDocuments) {
				temp.linkedDocuments = data.linkedDocuments;
			}
			this.documentDetails = temp;
			this.spinner.hide();
			this.loading = false;
			this.cdref.detectChanges();
		} else {
			this.getDocument(this.docId);
		}
	}

}
