import { Component, OnInit, Output, Input, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { ProvinceService } from 'app/services/province.service';
import { CountryService } from 'app/services/country.service';


@Component({
	selector: 'province-edit-dialog',
	templateUrl: './province-edit-dialog.component.html',
	styleUrls: ['./province-edit-dialog.component.scss']
})
export class ProvinceEditDialogComponent implements OnInit {
	@Output() provinceEditEventEmitter = new EventEmitter<Object>();
	@Input() data;
	isLoading = false;
	editForm;
	countrie$;
	countries = [];


	constructor(
		private formBuilder: FormBuilder,
		private translate: TranslateService,
		private activeModal: NgbActiveModal,
		private spinner: NgxSpinnerService,
		private translatedToastr: TranslatedToastrService,
		private provinceService: ProvinceService,
		private countryService: CountryService

	) {
	}

	ngOnInit() {
		this.editForm = this.formBuilder.group({
			nameEn: [this.data.province.nameEn, [Validators.required]],
			nameDr: [this.data.province.nameDr, [Validators.required]],
			namePs: [this.data.province.namePs, [Validators.required]],
			country: [this.data.province.country.id, [Validators.required]]
		});
		console.log(this.data, "data")
	}

	onFormSubmit() {
		if (this.editForm.valid) {
			this.spinner.show();

			const formData = new FormData();
			formData.append('data', JSON.stringify(this.editForm.value));
			this.provinceService.updateProvince(this.data.province.id, formData).subscribe(res => {
				console.log("come from server: ", res);
				this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
				this.spinner.hide();
				this.closeModal();
				this.provinceEditEventEmitter.emit(Response);
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
