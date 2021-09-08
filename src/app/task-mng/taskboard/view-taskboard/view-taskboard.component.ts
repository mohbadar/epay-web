import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { CreateTaskComponent } from 'app/task-mng/task/create-task/create-task.component';
import { TaskService } from 'app/task-mng/task/task.service';
import { ViewTaskComponent } from 'app/task-mng/task/view-task/view-task.component';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { DragulaService } from 'ng2-dragula';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AddTaskboardMemberComponent } from '../add-taskboard-member/add-taskboard-member.component';
import { ArchivedTasksComponent } from '../archived-tasks/archived-tasks.component';
import { CreateTaskboardStatusComponent } from '../create-taskboard-status/create-taskboard-status.component';
import { EditTaskboardComponent } from '../edit-taskboard/edit-taskboard.component';
import { TaskboardService } from '../taskboard.service';
import { Task } from './../../task/task.model';

@Component({
  selector: 'app-view-taskboard',
  templateUrl: './view-taskboard.component.html',
  styleUrls: ['./view-taskboard.component.scss']
})
export class ViewTaskboardComponent implements OnInit {
	taskboardId;
	taskboard;
	statusList;
	memberList;
	taskGroups = [];
	tasks: Task[];
	taskboardLoadingFlag = true;
	dataLoadingFlag = true;

	// These flags used to limit the UI based on their access role
	isOwner = false;
	isMember = false;
	
	@ViewChild('marketingTitle') titleInputRef: ElementRef;
	@ViewChild('marketingMessage') messageInputRef: ElementRef;

	BAG = "task-group";
	subscription = new Subscription();

	marketingTasks: Task[];
	uiDesigningTasks: Task[];
	developingTasks: Task[];
	managementTasks: Task[];

	constructor(private route: ActivatedRoute, private dragulaService: DragulaService, private elRef: ElementRef,
			private taskboardService: TaskboardService, private taskService: TaskService, private cdr: ChangeDetectorRef,
			private modalService: NgbModal, private spinner: NgxSpinnerService,
			private translatedToastr: TranslatedToastrService, private authService: AuthService,) {
	}

	ngOnInit(): void {
		// throw new Error('Method not implemented.');
		this.taskboardId = this.route.snapshot.paramMap.get('id');
		this.renderTaskboard();
	}

	renderTaskboard() {
		this.fetchTaskboardDetails(this.taskboardId);
	}

	fetchTaskboardDetails(taskboardId) {
		this.taskboardLoadingFlag = true;
		this.spinner.show();
		this.taskboardService.getRecordById(taskboardId).subscribe((res: any) => {
            this.spinner.hide();
			console.log(res);
			this.taskboard = res.taskboard;
			this.statusList = res.status;
			this.memberList = res.members;
			this.isOwner = this.taskboardService.isOwner(this.taskboard, this.authService);
			this.isMember = this.taskboardService.isMember(this.memberList, this.authService);
			this.fetchTasks(this.taskboardId);
			this.taskboardLoadingFlag = false;
			this.cdr.detectChanges();
        }, err => {
            this.spinner.hide();
			this.taskboardLoadingFlag = false;
			this.cdr.detectChanges();
            this.translatedToastr.error("TASKBOARD", "FETCHING_ERR_MSG");
			this.authService.checkUserLogin();
        });
	}

	editTaskboard() {
		const modalRef = this.modalService.open(EditTaskboardComponent, {
			centered: true, size: 'md', backdrop:  true, keyboard: false
		});
		modalRef.componentInstance.taskboardId = this.taskboardId;
		modalRef.componentInstance.response.subscribe((response) => {
			console.log(response);
			this.renderTaskboard();
		});
	}

	fetchTasks(taskboardId) {
		this.dataLoadingFlag = true;
		this.spinner.show();
		this.taskboardService.getTasks(taskboardId).subscribe((res: any) => {
            this.spinner.hide();
			console.log(res);
			this.tasks = res;
			this.loadTasks();
			console.log(this.tasks);
			this.dataLoadingFlag = false;

			this.subscription.add(this.dragulaService.drop(this.BAG).subscribe(({ el, target }) => {
				this.updateTaskStatus(el.getAttribute('task-id'), target.id)
			}));
			this.cdr.detectChanges();
        }, err => {
            this.spinner.hide();
			this.tasks = [];
			this.dataLoadingFlag = false;
            this.translatedToastr.error("TASKS", "FETCHING_ERR_MSG");
			this.authService.checkUserLogin();
			this.cdr.detectChanges();
        });
	}

	loadTasks() {
		let statusTitles = [];
		for (let i = 0; i < this.statusList.length; i++) {
			let status = this.statusList[i];
			let tasksList = this.tasks.filter((task: Task) => task.status === status.status);
			this.statusList[i]["tasks"] = tasksList;
			statusTitles.push(status.status);
		}
		let statelessTasks = this.tasks.filter((task: Task) => !statusTitles.includes(task.status));
		if(this.statusList) {
			let _StatusIndex = this.statusList.findIndex(x => x.status === '-');
			if(_StatusIndex > -1) {
				this.statusList[_StatusIndex]["tasks"].push(...statelessTasks);
			} else {
				this.statusList.unshift({'status': '-', 'tasks': statelessTasks});
			}
		}
		
		this.cdr.markForCheck();
	}

	refresh() {
		this.renderTaskboard();
	}
	
	createTask() {
		const modalRef = this.modalService.open(CreateTaskComponent, {
			centered: true, size: 'md', backdrop:  true, keyboard: false
		});
		modalRef.componentInstance.taskboard = this.taskboard;
		modalRef.componentInstance.response.subscribe((taskObj) => {
			this.renderTaskboard();
		});
	}

	editTask() {
		
		// const modalRef = this.modalService.open(CrudModalComponent);
		// modalRef.componentInstance.id = task.taskId; // should be the id
		// modalRef.componentInstance.data = { title: task.taskTitle, message: task.taskMessage, type: task.status }; // should be the data

		// modalRef.result.then((result) => {
		// 	task.taskTitle = result.title;
		// 	task.taskMessage = result.message;
		// 	task.status = result.type;
		// 	this.updateTaskStatus(task.taskId.toString(), task.status, task);
		// }).catch((error) => {
		// 	console.log(error);
		// });
	}

	viewTask(task: Task) {
		console.log("View Task");
		const modalRef = this.modalService.open(ViewTaskComponent, {
			centered: true, size: 'lg', backdrop:  true, keyboard: false
		});
		modalRef.componentInstance.taskId = task.id;
		modalRef.componentInstance.taskUpdated.subscribe(() => {
			this.renderTaskboard();
		});
	}

	updateTaskStatus(id: string, status: string, task?: Task) {
		// let badgeClass = 'primary';

		// if (status === 'Marketing') {
		// 	badgeClass = 'primary'
		// }
		// else if (status === 'UI-Designing') {
		// 	badgeClass = 'warning'
		// }
		// else if (status === 'Developing') {
		// 	badgeClass = 'success'
		// }
		// else if (status === 'Management') {
		// 	badgeClass = 'info'
		// }

		let currentTask;

		if (task) {
			currentTask = task;
		}
		else {
			currentTask = this.tasks.find(x => x.id === +id);
		}
		console.log(status);

		this.spinner.show();
		this.taskService.updateTaskStatus(currentTask.id, {"status": status}).subscribe((updatedTask: any) => {
            this.spinner.hide();
			console.log(updatedTask);
			let index = this.tasks.indexOf(currentTask);
			// currentTask.status = status;
			// currentTask.badgeClass = badgeClass;
			// this.tasks.splice(index, 1, updatedTask);
			// this.tasks = [...this.tasks];
			this.loadTasks();
			this.cdr.detectChanges();
        }, err => {
            this.spinner.hide();
			// this.tasks = [];
			// this.dataLoadingFlag = false;
            this.translatedToastr.error("TASKS", "FETCHING_ERR_MSG");
			this.authService.checkUserLogin();
			this.cdr.detectChanges();
        });






		
	}

	deleteTask(task) {
		this.spinner.show();
		this.taskService.deleteRecord(task.id).subscribe((res: any) => {
            this.spinner.hide();
			console.log(res);
			// let task: Task = this.tasks.find(x => x.id === id);
			// let index = this.tasks.indexOf(task);
			// this.tasks.splice(index, 1);
			// // this.tasks = [...this.tasks];
			// this.loadTasks();
			this.renderTaskboard();
			this.cdr.detectChanges();
        }, err => {
            this.spinner.hide();
			// this.tasks = [];
			// this.dataLoadingFlag = false;
            this.translatedToastr.error("TASKS", "FETCHING_ERR_MSG");
			this.authService.checkUserLogin();
			this.cdr.detectChanges();
        });
	}

	addTask() {
		// const modalRef = this.modalService.open(CrudModalComponent);
		// modalRef.componentInstance.id = 0; // should be the id
		// modalRef.componentInstance.data = { title: '', message: '', type: 'Marketing' }; // should be the data

		// modalRef.result.then((result) => {
		// 	this.taskService.addRecord(result.title, result.message, result.type).subscribe(data => {
		// 		this.tasks = data;
		// 		this.loadTasks();
		// 	});
		// }).catch((error) => {
		// 	console.log(error);
		// });
	}

	createStatus() {
		const modalRef = this.modalService.open(CreateTaskboardStatusComponent, {
			centered: true, size: 'md', backdrop:  true, keyboard: false
		});
		modalRef.componentInstance.taskboardId = this.taskboardId;
		modalRef.componentInstance.response.subscribe((response) => {
			console.log(response);
			this.renderTaskboard();
		});
	}

	addTaskboardMember() {
		const modalRef = this.modalService.open(AddTaskboardMemberComponent, {
			centered: true, size: 'md', backdrop:  true, keyboard: false
		});
		modalRef.componentInstance.taskboardId = this.taskboardId;
		modalRef.componentInstance.taskboardMembers = this.memberList;
		modalRef.componentInstance.taskboard = this.taskboard;
		modalRef.componentInstance.addResponse.subscribe((res) => {
			this.memberList.push(res);
		});
		modalRef.componentInstance.removeResponse.subscribe((res) => {
			this.memberList = this.memberList.filter((x) => {
				return x.id != res;
			})
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	showArchievedTasks() {
		const modalRef = this.modalService.open(ArchivedTasksComponent, {
			centered: true, size: 'xl', backdrop:  true, keyboard: false
		});
		modalRef.componentInstance.taskboardId = this.taskboardId;
	}

}
