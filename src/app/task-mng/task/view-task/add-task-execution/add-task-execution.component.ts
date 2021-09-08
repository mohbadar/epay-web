import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TaskService } from '../../task.service';

@Component({
  selector: 'add-task-execution',
  templateUrl: './add-task-execution.component.html',
  styleUrls: ['./add-task-execution.component.scss']
})
export class AddTaskExecutionComponent implements OnInit {
	@Output() response: EventEmitter<any> = new EventEmitter();
	@Output() cancelResponse: EventEmitter<any> = new EventEmitter();
	@Input() taskId;
	newForm: FormGroup;
	attachmentFile;

	constructor(private spinner: NgxSpinnerService,
		private translatedToastr: TranslatedToastrService,
		private fb: FormBuilder,
		private authService: AuthService,
		private taskService: TaskService,) { }

	ngOnInit(): void {
		this.initializeForm();
	}

	initializeForm() {
		this.newForm = this.fb.group({
			details: [null, [Validators.required]],
			attachment: [null],
			progress: [10],
		});
	}

	submitForm() {
		if (this.newForm.invalid) {
			this.translatedToastr.error("ERROR", "FORM_INVALID_MSG");
            document.getElementById('newForm').classList.add('input-error');
        } else {
            this.submit();
        }
	}

	fileChangeListener(event): void {
		if(event != null)
		{
		  if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();
			this.attachmentFile = event.target.files[0];
			document.getElementById('fileName').innerHTML = event.target.files[0].name;
	
		  }
		}
		else{
		  document.getElementById('fileName').innerHTML = null;
		}
	
	  }

	submit() {
		const formData = new FormData();
		console.log("attachement: ", this.attachmentFile);
		formData.append('avatar', this.attachmentFile);
		formData.append('data', JSON.stringify(this.newForm.value));
        this.spinner.show();
        this.taskService.addTaskExecution(this.taskId, formData).subscribe(res => {
			console.log(res);
            this.spinner.hide();
			this.response.emit(res);
			this.cancelResponse.emit();
			this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        }, err => {
            this.spinner.hide();
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
        });
    }

	cancel() {
		this.cancelResponse.emit();
	}

}
