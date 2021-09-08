import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { TaskboardService } from './../taskboard.service';

@Component({
  selector: 'app-create-taskboard',
  templateUrl: './create-taskboard.component.html',
  styleUrls: ['./create-taskboard.component.scss']
})
export class CreateTaskboardComponent implements OnInit {
	newForm: FormGroup;
	submitted = false;
	
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
		this.submitted = false;
		this.initializeForm();
		this.fetchEssentialData();
	}

	initializeForm() {
		this.newForm = this.fb.group({
			title: [null, [Validators.required]],
			description: [null, [Validators.required]],
			tags:[null],
			isPublic: ['false', [Validators.required]]
		});
	}

	fetchEssentialData() {
		// this.departments$ = this.baseService.getDepartmentList();
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
		this.submitted = true;
        this.taskboardService.addRecord(obj).subscribe((res:any) => {
			console.log(res);
            this.spinner.hide();
			this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
			this.closeModal()
			this.router.navigateByUrl(`/task_mng/taskboards/`+ res.id);
        }, err => {
            this.spinner.hide();
			this.submitted = false;
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
        });
    }

}
