import { Component, OnInit, Output, Input, EventEmitter, Inject,  AfterViewInit} from "@angular/core";
import {  FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { MinistryService } from "app/services/ministry.service";
import { TranslatedToastrService } from "app/services/translated-toastr.service";

@Component({
  selector: "ministry-create-dialog",
  templateUrl: "./ministry-create-dialog.component.html",
  styleUrls: ["./ministry-create-dialog.component.scss"],
})
export class MinistryCreateDialogComponent implements OnInit {
  @Output() ministryCreateEventEmitter = new EventEmitter<Object>();
  @Input() data;
  ministryCreateForm: FormGroup;

  constructor(
    private ministryService: MinistryService,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService
  ) { }

  ngOnInit() {
    this.ministryCreateForm = this.formBuilder.group({
      nameEn: ["", [Validators.required]],
      nameDr: ["", [Validators.required]],
      namePs: ["", [Validators.required]]
    });
  }

  onFormSubmit() {
		if (this.ministryCreateForm.valid) {
      this.spinner.show();
      const { nameEn, nameDr, namePs } = this.ministryCreateForm.value;
      this.ministryService.createMinistry({nameEn, nameDr, namePs}).subscribe((response) => {
        this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        this.spinner.hide();
        this.activeModal.close();
        this.ministryCreateEventEmitter.emit(response);
      }, (error) => {
        this.spinner.hide();
        this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
        console.log(error);
      })
		}
	  
		if (this.ministryCreateForm.invalid) {
		// To display errors below forms
		Object.keys(this.ministryCreateForm.controls).forEach(field => {
			const control = this.ministryCreateForm.get(field);
			control.markAsTouched({ onlySelf: true });
		});
		}
  }

  closeModal() {
    this.activeModal.close();
  }
}
