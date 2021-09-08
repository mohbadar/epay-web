import { AddTaskCompletionDateComponent } from './add-task-completion-date/add-task-completion-date.component';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from 'app/services/base-service';
import { DateConvertService } from 'app/services/date-convert.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { TaskboardService } from 'app/task-mng/taskboard/taskboard.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { AddTaskAssigneeComponent } from './add-task-assignee/add-task-assignee.component';
import { AddTaskDueDateComponent } from './add-task-due-date/add-task-due-date.component';
import { DateUtil } from 'app/_utils/date-util';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {
	@Output() taskUpdated: EventEmitter<any> = new EventEmitter();
	taskId;
	taskboardId;
	data;
	task;
	subTasks;
	taskComments;
	taskExecutions;
	taskAttachments;
	parentTask;
	dataLoadingFlag = true;
	showNewTaskExecution = false;
	showNewTaskAttachment = false;
	showEditTaskDesctiption = false;
	showEditTaskTitle = false;
	showAddSubTask = false;
	selectedSubTask;

	// These flags used to limit the UI based on their access role
	isOwner = false;
	isMember = false;
	isTaskArchived = false;
	dueDays = 0;
	remaingingPassedDays = 0
	completionDays = 0;

	taskboardTasks$;
	taskboardOrphanTasks$;
	commentForm;
	tempTaskTitle = '';
	tempTaskDescription = '';

	constructor(private router: Router, private route: ActivatedRoute,
		private spinner: NgxSpinnerService,
		private translate: TranslateService,
		private toastr: ToastrService,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private baseService: BaseService,
		private dConvert: DateConvertService,
		private translatedToastr: TranslatedToastrService,
		private authService: AuthService,
		private activeModal: NgbActiveModal,
		private modalService: NgbModal,
		private taskService: TaskService,
		private taskboardService: TaskboardService,
		public dateUtil: DateUtil,) {
			this.initializeForm();
	}

	ngOnInit(): void {
		this.getTask(this.taskId);
	}

	initializeForm() {
		this.commentForm = this.fb.group({
			comment: [null, [Validators.required]],
		});
	}

	fetchEssentialData() {
		this.taskboardService.getTasks(this.taskboardId).subscribe((res: any) => {
			this.taskboardTasks$ = res;
			this.cdr.detectChanges();
        }, err => {
			this.taskboardTasks$ = [];
            this.translatedToastr.error("TASKS", "FETCHING_ERR_MSG");
			this.authService.checkUserLogin();
			this.cdr.detectChanges();
        });
	}

	downloadAttachment(id){
		this.taskService.downloadAttachment(id);
	}

	downloadExecutionAttachment(id){
		this.taskService.downloadExecutionAttachment(id);
	}

	getTask(id) {
		this.dataLoadingFlag = true;
		this.spinner.show();
        this.taskService.getRecordById(id).subscribe((res: any) => {
            this.spinner.hide();
			this.data = res;
			this.task = res.task;
			this.subTasks = res.subTasks;
			this.parentTask = this.task.parent;
			this.taskComments = res.taskComments;
			this.taskAttachments = res.taskAttachments;
			this.taskExecutions = res.taskExecutions;
			this.taskboardId = this.task.taskboard.id;
			this.isOwner = this.taskService.isOwner(this.task, this.authService);
			this.isMember = this.taskService.isMember(this.task.assignedTo, this.authService);
			this.isTaskArchived = this.task.archived;

			if(this.task.dueDate) {
				this.dueDays = this.dateUtil.getNumberOfDays(this.baseService.parseDateObjectAsDate(this.task?.createdAt), this.task?.dueDate);
				this.remaingingPassedDays = this.dateUtil.getNumberOfDays(new Date(), this.task?.dueDate);
			}
			if(this.task.completionDate) {
				this.completionDays = this.dateUtil.getNumberOfDays(this.baseService.parseDateObjectAsDate(this.task?.createdAt), this.task?.completionDate)
			}

			console.log(this.task);
			this.fetchEssentialData();
			this.dataLoadingFlag = false;
        }, err => {
            this.spinner.hide();
			this.dataLoadingFlag = false;
            this.translatedToastr.error("DECREE", "FETCHING_ERR_MSG");
			this.authService.checkUserLogin();
        });
	}

	getTaskAttachments(taskId) {
		this.spinner.show();
        this.taskService.getTaskAttachments(taskId).subscribe((res: any) => {
            this.taskAttachments = res;
        }, err => {
            this.spinner.hide();
			this.dataLoadingFlag = false;
            this.translatedToastr.error("DECREE", "FETCHING_ERR_MSG");
			this.authService.checkUserLogin();
        });
	}

	closeModal() {
        this.activeModal.close();
    }

	editTaskDescription() {
		this.showEditTaskDesctiption = true;
		this.tempTaskTitle = this.task.title;
		this.tempTaskDescription = this.task.description;
	}

	cancelEditTaskDescription() {
		this.showEditTaskDesctiption = false;
		this.tempTaskTitle = '';
		this.tempTaskDescription = '';
	}

	updateTaskDescription() {
		// this.showEditTaskDesctiption = true;
		let obj = {'title': this.tempTaskTitle, 'description': this.tempTaskDescription };
        this.spinner.show();
        this.taskService.editRecord(this.taskId, obj).subscribe((res:any) => {
			console.log(res);
            this.spinner.hide();
			this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
			this.task = res;
			this.showEditTaskDesctiption = false;
        }, err => {
            this.spinner.hide();
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
        });
	}

	addComment(){
		let obj = this.commentForm.value;
		this.spinner.show();
		this.taskService.addTaskComment(this.taskId, obj).subscribe((res: any) => {
			this.spinner.hide();
			this.commentForm.reset({});
			this.taskComments.push(res);
			console.log(this.task);
			this.dataLoadingFlag = false;
        }, err => {
            this.spinner.hide();
			this.dataLoadingFlag = false;
            this.translatedToastr.error("DECREE", "FETCHING_ERR_MSG");
			this.authService.checkUserLogin();
        });
	}

	newSubTask() {
		console.log("newSubTask");
		this.showAddSubTask = true;
		this.taskboardService.getTaskboardOrphanTasks(this.taskboardId).subscribe((res: any) => {
			// remove selected task if exists
			res = res.filter((x) => {
				return x.id != this.taskId && x.id != this.parentTask?.id;
			})
			this.taskboardOrphanTasks$ = res;
			this.cdr.detectChanges();
        }, err => {
			this.taskboardOrphanTasks$ = [];
            this.translatedToastr.error("TASKS", "FETCHING_ERR_MSG");
			this.authService.checkUserLogin();
			this.cdr.detectChanges();
        });
	}

	addSubTask() {
		console.log("addSubTask");
		this.taskService.addTaskSubTask(this.taskId, this.selectedSubTask).subscribe((res: any) => {
			this.showAddSubTask = false;
			this.subTasks.push(res);
        }, err => {
            this.translatedToastr.error("DECREE", "FETCHING_ERR_MSG");
			this.authService.checkUserLogin();
        });
	}

	cancelSubTask() {
		this.showAddSubTask = false;
	}

	viewTask(task: Task) {
		const modalRef = this.modalService.open(ViewTaskComponent, {
			centered: true, size: 'lg', backdrop:  true, keyboard: false
		});
		modalRef.componentInstance.taskId = task.id;
	}

	newAttachment() {
		this.showNewTaskAttachment = true;
	}

	addAttachment(newAttachment) {
		// this.taskAttachments.push(newAttachment);
		this.getTaskAttachments(this.task.id);
		this.showNewTaskAttachment = false;
	}

	cancelAttachment() {
		this.showNewTaskAttachment = false;
	}

	newExecution() {
		this.showNewTaskExecution = true;
	}

	addExecution(newExecution) {
		this.task.progress = newExecution.progress;
		this.taskExecutions.push(newExecution);
	}

	cancelExecution() {
		this.showNewTaskExecution = false;
	}

	addTaskAssignee() {
		console.log("newAssignee");
		const modalRef = this.modalService.open(AddTaskAssigneeComponent, {
			centered: true, size: 'md', backdrop:  true, keyboard: false
		});
		modalRef.componentInstance.taskId = this.taskId;
		modalRef.componentInstance.task = this.task;
		modalRef.componentInstance.isOwner = this.isOwner;
		modalRef.componentInstance.addResponse.subscribe((res) => {
			this.task.assignedTo.push(res);
		});
		modalRef.componentInstance.removeResponse.subscribe((res) => {
			this.task.assignedTo = this.task.assignedTo.filter((x) => {
				return x.id != res;
			})
		});
	}

	addMember() {
		console.log("addMember");
	}

	editComment() {
		console.log("editComment");
	}

	deleteComment() {
		console.log("deleteComment");
	}

	archiveTask() {
		this.spinner.show();
        this.taskService.archiveRecord(this.taskId).subscribe((res:any) => {
            this.spinner.hide();
			this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
			if(res == true) {
				this.isTaskArchived = true;
				this.taskUpdated.emit();
			}
        }, err => {
            this.spinner.hide();
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
        });
	}

  addDueDate(){
		const modalRef = this.modalService.open(AddTaskDueDateComponent, {
			centered: true, size: 'md', backdrop:  true, keyboard: false
		});
    console.log("task Id: ", this.taskId);
    modalRef.componentInstance.taskId = this.taskId;
		modalRef.componentInstance.response.subscribe((res) => {
			this.ngOnInit();
		});
  }

  addCompletionDate(){
    const modalRef = this.modalService.open(AddTaskCompletionDateComponent, {
			centered: true, size: 'md', backdrop:  true, keyboard: false
		});
    console.log("task Id: ", this.taskId);
    modalRef.componentInstance.taskId = this.taskId;
		modalRef.componentInstance.response.subscribe((res) => {
			this.ngOnInit();
		});
    }

	showTaskStatusHistory() {
		// const modalRef = this.modalService.open(TaskHistoryComponent, {
		// 	centered: true, size: 'md', backdrop:  true, keyboard: false
		// });
		// modalRef.componentInstance.taskId = this.taskId;
	}

}
