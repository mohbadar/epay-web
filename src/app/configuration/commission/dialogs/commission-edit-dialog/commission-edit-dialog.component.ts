import { Component, OnInit, Output, Input, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommissionService } from 'app/services/commission.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';


@Component({
	selector: 'commission-edit-dialog',
	templateUrl: './commission-edit-dialog.component.html',
	styleUrls: ['./commission-edit-dialog.component.scss']
})
export class CommissionEditDialogComponent implements OnInit {
	@Output() commissionEditEventEmitter = new EventEmitter<Object>();
	@Input() data;
	isLoading = false;
	editForm;

	constructor(
		private formBuilder: FormBuilder, 
		private translate: TranslateService,
		private activeModal: NgbActiveModal,
		private spinner: NgxSpinnerService,
		private translatedToastr: TranslatedToastrService,
		private commissionService: CommissionService
		
		) {
	}

	ngOnInit() {
		this.editForm = this.formBuilder.group({
			nameEn: [this.data.nameEn, [Validators.required]],
			nameDr: [this.data.nameDr, [Validators.required]],
			namePs: [this.data.namePs, [Validators.required]]
		  });
	}

	onFormSubmit() {
		if (this.editForm.valid) {
			this.spinner.show();
			const { id } = this.data;
			const { nameEn, nameDr, namePs } = this.editForm.value;

			this.commissionService.updateCommissionById(id, { nameEn, nameDr, namePs }).subscribe((response) => {
				this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
				this.spinner.hide();
				this.activeModal.close();
				this.commissionEditEventEmitter.emit(response);
			}, (error) => {
				this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
				console.log(error);
				this.spinner.hide();
			})
		}
			
		if (this.editForm.invalid) {
			// To display errors below forms
			Object.keys(this.editForm.controls).forEach(field => {
				const control = this.editForm.get(field);
				control.markAsTouched({ onlySelf: true });
			});
		}
	}

	closeModal() {
		this.activeModal.close();
	}

}
