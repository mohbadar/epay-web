import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TodoService } from './../todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {
	@Output() todo: EventEmitter<any> = new EventEmitter();
	@Input() data:any;
	newForm: FormGroup;
	bgColors$ = [
		{ "id": "bg-primary","name": "PURPUL"},
		{ "id": "bg-success","name": "GREEN"},
		{ "id": "bg-info","name": "BLUE"},
		{ "id": "bg-warning","name": "ORANGE"},
		{ "id": "bg-secondary","name": "DARK_GRAY"},
		{ "id": "bg-grey","name": "GRAY"},
		{ "id": "bg-black","name": "BLACK"}
	];

	constructor(private translatedToastr: TranslatedToastrService,
		private authService: AuthService,
		private activeModal: NgbActiveModal,
		private spinner: NgxSpinnerService,
		private fb: FormBuilder,
		private todoService: TodoService) { }

	ngOnInit(): void {
		this.initializeForm();
		this.fetchEssentialData();
	}

	initializeForm() {
		this.newForm = this.fb.group({
			subject: [this.data.subject, [Validators.required]],
			details: [this.data.details],
			bgColor: [null]
		});

		if(this.data.bgColor != 'null') {
			this.newForm.get('bgColor').setValue(this.data.bgColor);
		}
	}

	fetchEssentialData() {
		this.bgColors$;
	}

	closeModal() {
        this.activeModal.close();
    }

	submitForm() {
		if (this.newForm.invalid) {
			this.translatedToastr.error("ERROR", "FORM_INVALID_MSG");
            document.getElementById('excelUploadForm').classList.add('input-error');
        } else {
            this.submit();
        }
	}

	submit() {
        let obj = this.newForm.value;
        this.spinner.show();
        this.todoService.updateRecord(this.data.id, obj).subscribe(res => {
			console.log(res);
			this.todo.emit(res);
            this.spinner.hide();
			this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
			this.closeModal();
        }, err => {
            this.spinner.hide();
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
        });
    }
}
