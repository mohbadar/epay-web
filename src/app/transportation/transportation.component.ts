import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CreateRequestComponent } from './request/create-request/create-request.component';

@Component({
  selector: 'app-transportation',
  templateUrl: './transportation.component.html',
  styleUrls: ['./transportation.component.scss']
})
export class TransportationComponent implements OnInit {

	constructor(private cdref: ChangeDetectorRef, public translate: TranslateService,
		private router: Router) { }

	ngOnInit(): void {
	}

	createRequest() {
		// const modalRef = this.modalService.open(CreateRequestComponent, {
		// 	centered: true, size: 'md', backdrop:  true, keyboard: false
		// });
		// modalRef.componentInstance.response.subscribe((response) => {
		// 	console.log(response);
		// });
	}

}
