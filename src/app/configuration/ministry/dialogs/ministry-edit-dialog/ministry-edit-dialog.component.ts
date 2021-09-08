import { Component, OnInit, Output, Input, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MinistryService } from 'app/services/ministry.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';


@Component({
	selector: 'ministry-edit-dialog',
	templateUrl: './ministry-edit-dialog.component.html',
	styleUrls: ['./ministry-edit-dialog.component.scss']
})
export class MinistryEditDialogComponent implements OnInit {
	@Output() ministryEditEventEmitter = new EventEmitter<Object>();
	@Input() data;
	isLoading = false;
	ministryEditForm;

	formControl = new FormControl('', [
		Validators.required
	]);

	constructor(
		private formBuilder: FormBuilder, 
		private translate: TranslateService,
		private activeModal: NgbActiveModal,
		private spinner: NgxSpinnerService,
		private ministryService: MinistryService,
		private translatedToastr: TranslatedToastrService
		) {
	}

	ngOnInit() {
		this.ministryEditForm = this.formBuilder.group({
			nameEn: [this.data.nameEn, [Validators.required]],
			nameDr: [this.data.nameDr, [Validators.required]],
			namePs: [this.data.namePs, [Validators.required]]
		  });
	}

	onFormSubmit() {
		if (this.ministryEditForm.valid) {
			this.spinner.show();
			const { id } = this.data;
			console.log(id);
			const { nameEn, nameDr, namePs } = this.ministryEditForm.value;

			this.ministryService.updateMinistry(id, { nameEn, nameDr, namePs }).subscribe((response) => {
				this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
				this.spinner.hide();
				this.activeModal.close();
				this.ministryEditEventEmitter.emit(response);
			}, (error) => {
				this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
				console.log(error);
				this.spinner.hide();
			})
		}
			
		if (this.ministryEditForm.invalid) {
			// To display errors below forms
			Object.keys(this.ministryEditForm.controls).forEach(field => {
				const control = this.ministryEditForm.get(field);
				control.markAsTouched({ onlySelf: true });
			});
		}
	}

	closeModal() {
		this.activeModal.close();
	}

}
