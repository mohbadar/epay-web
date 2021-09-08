import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from 'app/services/base-service';
import { DateConvertService } from 'app/services/date-convert.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TaskboardService } from '../taskboard.service';

@Component({
  selector: 'app-edit-taskboard',
  templateUrl: './edit-taskboard.component.html',
  styleUrls: ['./edit-taskboard.component.scss']
})
export class EditTaskboardComponent implements OnInit {
	@Output() response: EventEmitter<any> = new EventEmitter();
	@Input() taskboardId;
	editForm: FormGroup;
	taskboard;
	statusList;
	memberList;
	dataLoadingFlag = true;

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
		private taskboardService: TaskboardService) { }

	ngOnInit(): void {
		this.getRecord(this.taskboardId);
		this.fetchEssentialData();
	}

	initializeForm() {
		this.editForm = this.fb.group({
			title: [this.taskboard.title, [Validators.required]],
			description: [this.taskboard.description, [Validators.required]],
			tags:[null],
		});
	}

	fetchEssentialData() {
		// this.departments$ = this.baseService.getDepartmentList();
	}

	getRecord(taskboardId) {
		this.dataLoadingFlag = true;
		this.spinner.show();
		this.taskboardService.getRecordById(taskboardId).subscribe((res: any) => {
            this.spinner.hide();
			console.log(res);
			this.taskboard = res.taskboard;
			this.statusList = res.status;
			this.memberList = res.members;
			this.initializeForm();
			this.dataLoadingFlag = false;
			this.cdr.detectChanges();
        }, err => {
            this.spinner.hide();
			this.dataLoadingFlag = false;
			this.cdr.detectChanges();
            this.translatedToastr.error("TASKBOARD", "FETCHING_ERR_MSG");
			this.authService.checkUserLogin();
        });
	}

	closeModal() {
        this.activeModal.close();
    }

	submitForm() {
		if (this.editForm.invalid) {
			this.translatedToastr.error("ERROR", "FORM_INVALID_MSG");
            document.getElementById('editForm').classList.add('input-error');
        } else {
            this.submit();
        }
	}

	submit() {
        let obj = this.editForm.value;
        this.spinner.show();
        this.taskboardService.editRecord(this.taskboardId, obj).subscribe((res:any) => {
			console.log(res);
            this.spinner.hide();
			this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
			this.response.emit(res);
			this.closeModal();
        }, err => {
            this.spinner.hide();
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
        });
    }


}
