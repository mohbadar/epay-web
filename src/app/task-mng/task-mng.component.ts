import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTaskboardComponent } from './taskboard/create-taskboard/create-taskboard.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';

@Component({
  selector: 'app-task-mng',
  templateUrl: './task-mng.component.html',
  styleUrls: ['./task-mng.component.scss']
})
export class TaskMngComponent implements OnInit {

	constructor(private modalService: NgbModal) { }

	ngOnInit(): void {
	}

	createBoard() {
		const modalRef = this.modalService.open(CreateTaskboardComponent, {
			centered: true, size: 'md', backdrop:  true, keyboard: false
		});
	}

	createTask() {
		const modalRef = this.modalService.open(CreateTaskComponent, {
			centered: true, size: 'md', backdrop:  true, keyboard: false
		});
		modalRef.componentInstance.response.subscribe((response) => {
			console.log(response);
		});
	}
}
