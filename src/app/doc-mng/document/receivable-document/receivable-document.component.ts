import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-receivable-document',
    templateUrl: './receivable-document.component.html',
    styleUrls: ['./receivable-document.component.scss']
})
export class ReceivableDocumentComponent implements OnInit {

    activeTab = "documents_list";
    docId;
    routesList = ['documents_list', 'executions_list'];

    constructor(private router: Router, private route: ActivatedRoute,
        private cdref: ChangeDetectorRef) { }

    ngOnInit(): void {
        let url = this.router.url;
        console.log(url);
        let segment = url.split("/");
        let lastSegment = segment.pop();
        if (this.routesList.includes(lastSegment)) {
            this.activeTab = lastSegment;
        }
    }

    setActiveTab(tab) {
        this.activeTab = tab;
    }
}
