import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TaskService } from '../../task.service';

@Component({
  selector: 'add-task-attachment',
  templateUrl: './add-task-attachment.component.html',
  styleUrls: ['./add-task-attachment.component.scss']
})
export class AddTaskAttachmentComponent implements OnInit {
	@Output() response: EventEmitter<any> = new EventEmitter();
	@Output() cancelResponse: EventEmitter<any> = new EventEmitter();
	@Input() taskId;
	newForm: FormGroup;
	attachmentFile;
	uploadIcon = false;

	progress = 50;

	constructor(private spinner: NgxSpinnerService,
		private translatedToastr: TranslatedToastrService,
		private fb: FormBuilder,
		private authService: AuthService,
		private taskService: TaskService,) { }

	ngOnInit(): void {
		this.initializeForm();
		console.log("Working attachement: ", this.taskId);
	}

	initializeForm() {
		this.newForm = this.fb.group({
			attachment: [null],
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

	submit() {
		console.log("attachement file: ", this.attachmentFile);
		const file: FormData = new FormData();
		file.append('file', this.attachmentFile);
		this.spinner.show();
		this.taskService.uploadTaskAttachment(this.taskId, file).subscribe(res => {
			if (res.type === HttpEventType.UploadProgress) {
				
            } else if (res instanceof HttpResponse) {
				if (res !== null) {
					this.spinner.hide();
					this.translatedToastr.success("SUCCESS", "FILE_UPLOADED_SUCCESSFULLY");
					this.response.emit(res);
				} else {
					this.progress = 0;
					this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_IN_UPLOADING_THE_FILE");
					console.log(res);
				}
            }
		}, err => {
			this.spinner.hide();
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
		});
	}

	cancel() {
		this.cancelResponse.emit();
	}


	fileChangeListener(event): void {
		if(event != null)
		{
		  if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();
			this.attachmentFile = event.target.files[0];
			document.getElementById('fileName').innerHTML = event.target.files[0].name;
			this.uploadIcon = true;
	
		  }
		}
		else{
		  this.uploadIcon = false;
		  document.getElementById('fileName').innerHTML = null;
		}
	
	  }

}
