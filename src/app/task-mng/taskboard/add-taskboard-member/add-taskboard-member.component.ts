import { value } from './../../../template/shared/data/dropdowns';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseService } from 'app/services/base-service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { TaskboardService } from '../taskboard.service';

@Component({
  selector: 'app-add-taskboard-member',
  templateUrl: './add-taskboard-member.component.html',
  styleUrls: ['./add-taskboard-member.component.scss']
})
export class AddTaskboardMemberComponent implements OnInit {
	@Output() addResponse: EventEmitter<any> = new EventEmitter();
	@Output() removeResponse: EventEmitter<any> = new EventEmitter();
	@Input() taskboardId;
	@Input() taskboardMembers;
	@Input() taskboard;

	newForm: FormGroup;
	member;
	searching = false;
	searchFailed = false;

  constructor(private spinner: NgxSpinnerService, private fb: FormBuilder,
		private cdr: ChangeDetectorRef, private translatedToastr: TranslatedToastrService,
		private authService: AuthService, private activeModal: NgbActiveModal,
		private taskboardService: TaskboardService,
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

	// submitForm() {
	// 	if (this.newForm.invalid) {
	// 		this.translatedToastr.error("ERROR", "FORM_INVALID_MSG");
    //         document.getElementById('newForm').classList.add('input-error');
    //     } else {
    //         this.submit();
    //     }
	// }

	// submit() {
    //     let obj = this.newForm.value;
    //     this.spinner.show();
    //     this.taskboardService.addTaskboardMember(this.taskboardId, obj).subscribe(res => {
	// 		console.log(res);
	// 		this.response.emit(res);
    //         this.spinner.hide();
	// 		this.translatedToastr.success("SUCCESS", "RECORD_UPLOADED_SUCCESSFULLY");
	// 		this.closeModal();
    //     }, err => {
    //         this.spinner.hide();
	// 		this.translatedToastr.error("ERROR", "ERR_MSG");
	// 		this.authService.checkUserLogin();
    //     });
    // }

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

	addNewMember() {
		console.log("Member Details: "+ this.member);
		// this.spinner.show();
		if(this.member) {
			this.taskboardService.addTaskboardMember(this.taskboardId, { userId: this.member.id }).subscribe(res => {
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

	removeMember(memberId) {
		this.taskboardService.removeTaskboardMember(this.taskboardId, memberId).subscribe(res => {
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
