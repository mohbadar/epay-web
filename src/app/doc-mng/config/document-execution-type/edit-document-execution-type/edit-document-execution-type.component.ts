import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DocMngService } from 'app/doc-mng/doc-mng.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-document-execution-type',
  templateUrl: './edit-document-execution-type.component.html',
  styleUrls: ['./edit-document-execution-type.component.scss']
})
export class EditDocumentExecutionTypeComponent implements OnInit {
  @Output() shuraEditEventEmitter = new EventEmitter<Object>();
	@Input() data;
	isLoading = false;
	docCreateForm;

	formControl = new FormControl('', [
		Validators.required
	]);
  constructor(
    private formBuilder: FormBuilder,
		private translate: TranslateService,
		private activeModal: NgbActiveModal,
		private spinner: NgxSpinnerService,
		private docMngService: DocMngService,
		private translatedToastr: TranslatedToastrService
  ) { }

  ngOnInit(): void {
    this.docCreateForm = this.formBuilder.group({
			nameEn: [this.data.nameEn, [Validators.required]],
			nameDr: [this.data.nameDr, [Validators.required]],
			namePs: [this.data.namePs, [Validators.required]]
		  });
  }

  onFormSubmit() {
		if (this.docCreateForm.valid) {
			this.spinner.show();
			const { id } = this.data;
			console.log(id);
			const { nameEn, nameDr, namePs } = this.docCreateForm.value;
      console.log("All Data ", this.docCreateForm.value);
      console.log("id ", id);

			this.docMngService.updateDocumentTypeById(id, { nameEn, nameDr, namePs }).subscribe((response) => {
				this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
				this.spinner.hide();
				this.activeModal.close();
				this.shuraEditEventEmitter.emit(response);
			}, (error) => {
				this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
				console.log(error);
				this.spinner.hide();
			});
		}

		if (this.docCreateForm.invalid) {
			// To display errors below forms
			Object.keys(this.docCreateForm.controls).forEach(field => {
				const control = this.docCreateForm.get(field);
				control.markAsTouched({ onlySelf: true });
			});
		}
	}

	closeModal() {
		this.activeModal.close();
	}

}
