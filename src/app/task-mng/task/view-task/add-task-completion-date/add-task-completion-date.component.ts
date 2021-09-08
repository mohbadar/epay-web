import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { TaskService } from '../../task.service';

@Component({
  selector: 'add-task-completion-date',
  templateUrl: './add-task-completion-date.component.html',
  styleUrls: ['./add-task-completion-date.component.scss']
})
export class AddTaskCompletionDateComponent implements OnInit {
	@Output() response: EventEmitter<any> = new EventEmitter();
	taskId;

	newForm: FormGroup;
	member;

  constructor(private spinner: NgxSpinnerService,
    private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
    private translatedToastr: TranslatedToastrService,
    private activeModal: NgbActiveModal,
		private taskService: TaskService,
    private translate: TranslateService) { }

	ngOnInit(): void {
		this.initializeForm();
	}

	initializeForm() {
		this.newForm = this.fb.group({
			completionDate: [null, [Validators.required]],
		});
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
        this.taskService.addTaskCompletionDate(this.taskId, obj).subscribe(res => {
        console.log(res);
        this.response.emit(res);
        this.spinner.hide();
        this.translatedToastr.success("SUCCESS", "RECORD_UPLOADED_SUCCESSFULLY");
        this.closeModal();
        }, err => {
          this.spinner.hide();
          this.translatedToastr.error("ERROR", "ERR_MSG");
        });
      }

}
