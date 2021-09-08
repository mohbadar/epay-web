import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TaskboardService } from '../taskboard.service';

@Component({
  selector: 'app-create-taskboard-status',
  templateUrl: './create-taskboard-status.component.html',
  styleUrls: ['./create-taskboard-status.component.scss']
})
export class CreateTaskboardStatusComponent implements OnInit {
	@Output() response: EventEmitter<any> = new EventEmitter();
	@Input() taskboardId;
	newForm: FormGroup;
	
	constructor(private spinner: NgxSpinnerService, private fb: FormBuilder,
		private cdr: ChangeDetectorRef, private translatedToastr: TranslatedToastrService,
		private authService: AuthService, private activeModal: NgbActiveModal,
		private taskboardService: TaskboardService) { }

	ngOnInit(): void {
		this.initializeForm();
		this.fetchEssentialData();
	}

	initializeForm() {
		this.newForm = this.fb.group({
			status: [null, [Validators.required]],
		});
	}

	fetchEssentialData() {
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
        this.taskboardService.addTaskboardStatus(this.taskboardId, obj).subscribe(res => {
			console.log(res);
			this.response.emit(res);
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
