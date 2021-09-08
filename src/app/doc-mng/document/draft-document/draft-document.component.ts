import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-draft-document',
  templateUrl: './draft-document.component.html',
  styleUrls: ['./draft-document.component.scss']
})
export class DraftDocumentComponent implements OnInit {
	activeTab = "documents_list";
	docId;
	routesList = ['documents_list', 'executions_list', 'followups_list', 'comments_list'];

	constructor(private router: Router, private route: ActivatedRoute, 
		private cdref: ChangeDetectorRef) { }

	ngOnInit(): void {
		let url = this.router.url;
		console.log(url);
		let segment = url.split("/");
		let lastSegment = segment.pop();
		if(this.routesList.includes(lastSegment)) {
			this.activeTab = lastSegment;
		}
	}

	setActiveTab(tab) {
		this.activeTab = tab;
	}
}
