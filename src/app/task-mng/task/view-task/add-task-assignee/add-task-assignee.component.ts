import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from 'app/services/base-service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { TaskboardService } from 'app/task-mng/taskboard/taskboard.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { TaskService } from '../../task.service';

@Component({
  selector: 'add-task-assignee',
  templateUrl: './add-task-assignee.component.html',
  styleUrls: ['./add-task-assignee.component.scss']
})
export class AddTaskAssigneeComponent implements OnInit {
	@Output() addResponse: EventEmitter<any> = new EventEmitter();
	@Output() removeResponse: EventEmitter<any> = new EventEmitter();
	@Input() taskId;
	@Input() task;
	@Input() isOwner;

	newForm: FormGroup;
	member;
	searching = false;
	searchFailed = false;

  constructor(private spinner: NgxSpinnerService, private fb: FormBuilder,
		private cdr: ChangeDetectorRef, private translatedToastr: TranslatedToastrService,
		private authService: AuthService, private activeModal: NgbActiveModal,
		private taskService: TaskService,
		private baseService: BaseService) { }

	ngOnInit(): void {
		this.initializeForm();
		this.fetchEssentialData();
	}

	initializeForm() {
		this.newForm = this.fb.group({
			member: [null, [Validators.required]],
		});
	}

	fetchEssentialData() {
	}

	closeModal() {
        this.activeModal.close();
    }

	searchUser: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => text$.pipe(
		debounceTime(300),
		distinctUntilChanged(),
		tap(() => this.searching = true),
		switchMap(term =>
			this.baseService.searchUser(term).pipe(
				tap(() => this.searchFailed = false),
				catchError(() => {
					this.searchFailed = true;
				return of([]);
			}))
		),
		tap(() => this.searching = false)
	);

	formatter = (x: { name: String }) => x.name;

	addNewAssignee() {
		console.log("Member Details: "+ this.member);
		// this.spinner.show();
		if(this.member) {
			this.taskService.addTaskAssignee(this.taskId, { userId: this.member.id }).subscribe(res => {
				console.log(res);
				this.member = {};
				this.addResponse.emit(res);
				// this.spinner.hide();
				this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
				// this.closeModal();
			}, err => {
				// this.spinner.hide();
				this.translatedToastr.error("ERROR", "ERR_MSG");
				this.authService.checkUserLogin();
			});
		}
	}

	removeAssignee(memberId) {
		this.taskService.removeTaskAssignee(this.taskId, memberId).subscribe(res => {
			console.log(res);
			this.removeResponse.emit(memberId);
			this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
			// this.closeModal();
		}, err => {
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
		});
	}
}
