import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTicketComponent } from './ticket/create-ticket/create-ticket.component';

@Component({
  selector: 'app-helpdesk',
  templateUrl: './helpdesk.component.html',
  styleUrls: ['./helpdesk.component.scss']
})
export class HelpdeskComponent implements OnInit {

	constructor(private modalService: NgbModal) { }

	ngOnInit(): void {
	}

	createTicket() {
		const modalRef = this.modalService.open(CreateTicketComponent, {
			centered: true, size: 'md', backdrop:  true, keyboard: false
		});
		modalRef.componentInstance.response.subscribe((response) => {
			console.log(response);
		});
	}

}
