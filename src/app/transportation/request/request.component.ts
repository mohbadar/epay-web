import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
	@ViewChild('nav') nav: ElementRef<NgbNav>;
	activeTabId;

	constructor(private router: Router, private route: ActivatedRoute,) { }

	ngOnInit(): void {
		console.log(this.route.snapshot.url)
		if(this.route.snapshot.url[2] == undefined) {
			this.activeTabId = 1
		} else if(this.route.snapshot.url[2].path == "pending") {
			this.activeTabId = 1
		} else if(this.route.snapshot.url[2].path == "closed") {
			this.activeTabId = 2
		} else {
			this.activeTabId = 1
		}
	}
}
