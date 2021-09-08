import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TodoService } from './../todo.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {
	@Output() todo: EventEmitter<any> = new EventEmitter();
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
			subject: [null, [Validators.required]],
			details: [null],
			bgColor: []
		});
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
        this.todoService.addRecord(obj).subscribe(res => {
			console.log(res);
			this.todo.emit(res);
            this.spinner.hide();
			this.translatedToastr.success("SUCCESS", "RECORD_UPLOADED_SUCCESSFULLY");
			this.closeModal();
        }, err => {
            this.spinner.hide();
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
        });
    }

}
