import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss']
})
export class SchedulingComponent implements OnInit {
	@ViewChild('nav') nav: ElementRef<NgbNav>;
	activeTabId;

	constructor(private router: Router, private route: ActivatedRoute,) { }

	ngOnInit(): void {
		console.log(this.route.snapshot.url)
		if(this.route.snapshot.url[2] == undefined) {
			this.activeTabId = 1
		} else if(this.route.snapshot.url[2].path == "visits") {
			this.activeTabId = 1
		} else if(this.route.snapshot.url[2].path == "visitors") {
			this.activeTabId = 2
		} else if(this.route.snapshot.url[2].path == "vehicles") {
			this.activeTabId = 3
		} else {
			this.activeTabId = 1
		}
	}

}
