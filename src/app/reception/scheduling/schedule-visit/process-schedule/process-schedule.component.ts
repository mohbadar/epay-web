import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-process-schedule',
  templateUrl: './process-schedule.component.html',
  styleUrls: ['./process-schedule.component.scss']
})
export class ProcessScheduleComponent implements OnInit {
	prcessForm: FormGroup;

	constructor(private spinner: NgxSpinnerService,
		private translate: TranslateService,
		public activeModal: NgbActiveModal,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private translatedToastr: TranslatedToastrService,
		private authService: AuthService) { }

	ngOnInit(): void {
		this.initializeForm();
	}

	initializeForm() {
		this.prcessForm = this.fb.group({
			vehicles: this.fb.array([]),
			visitors: this.fb.array([]),
		});
	}

	closeModal() {
		this.activeModal.close();
	}
}
