import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from 'app/services/base-service';
import { DateConvertService } from 'app/services/date-convert.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../task.service';
import { TaskboardService } from '../../taskboard/taskboard.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
	@Output() response: EventEmitter<any> = new EventEmitter();
	@Input() taskboard;
	newForm: FormGroup;
	taskboards$ = [];

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
		private taskService: TaskService,
		private taskboardService: TaskboardService) { }

	ngOnInit(): void {
		this.initializeForm();
		this.fetchEssentialData();
	}

	initializeForm() {
		this.newForm = this.fb.group({
			title: [null, [Validators.required]],
			description: [null],
			tags:[],
			taskboard: [null, [Validators.required]],
			assignedTo: [null]
		});
	}

	fetchEssentialData() {
		if(this.taskboard) {
			this.taskboards$.push(this.taskboard);
			this.newForm.controls['taskboard'].setValue(this.taskboard.id);
		} else {
			let taskboards = this.taskboardService.getAccessableTaskboards();
			taskboards.subscribe((res: any) => {
				console.log(res);
				if(res.taskboards != null) {
					this.taskboards$ = res.taskboards
				}
			});
		}
		
		
	}

	closeModal() {
        this.activeModal.close();
    }

	submitForm() {
		if (this.newForm.invalid) {
			this.translatedToastr.error("ERROR", "FORM_INVALID_MSG");
            document.getElementById('newForm').classList.add('input-error');
        } else {
            this.submit();
        }
	}

	submit() {
        let obj = this.newForm.value;
        this.spinner.show();
        this.taskService.addRecord(obj).subscribe(res => {
			console.log(res);
            this.spinner.hide();
			this.response.emit(res);
			this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
			this.closeModal();
        }, err => {
            this.spinner.hide();
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
        });
    }

}
