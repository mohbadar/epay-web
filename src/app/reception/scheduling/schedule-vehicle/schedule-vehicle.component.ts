import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-schedule-vehicle',
  templateUrl: './schedule-vehicle.component.html',
  styleUrls: ['./schedule-vehicle.component.scss']
})
export class ScheduleVehicleComponent implements OnInit {
	@ViewChild('nav') nav: ElementRef<NgbNav>;
	activeTabId = 1;
	
	constructor() { }

	ngOnInit(): void {
	}

}
