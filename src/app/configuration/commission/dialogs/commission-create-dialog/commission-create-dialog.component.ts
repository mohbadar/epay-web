import { Component, OnInit, Output, Input, EventEmitter, Inject,  AfterViewInit} from "@angular/core";
import {  FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { CommissionService } from "app/services/commission.service";
import { TranslatedToastrService } from "app/services/translated-toastr.service";

@Component({
  selector: "commission-create-dialog",
  templateUrl: "./commission-create-dialog.component.html",
  styleUrls: ["./commission-create-dialog.component.scss"],
})
export class CommissionCreateDialogComponent implements OnInit {
  @Output() commissionCreateEventEmitter = new EventEmitter<Object>();
  @Input() data;
  createForm: FormGroup;

  constructor(
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService,
    private commissionService: CommissionService
  ) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      nameEn: ["", [Validators.required]],
      nameDr: ["", [Validators.required]],
      namePs: ["", [Validators.required]]
    });
  }

  onFormSubmit() {
		if (this.createForm.valid) {
      this.spinner.show();
      const { nameEn, nameDr, namePs } = this.createForm.value;
      this.commissionService.createCommission({nameEn, nameDr, namePs}).subscribe((response) => {
        this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        this.spinner.hide();
        this.activeModal.close();
        this.commissionCreateEventEmitter.emit(response);
      }, (error) => {
        this.spinner.hide();
        this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
        console.log(error);
      })
		}
	  
		if (this.createForm.invalid) {
		// To display errors below forms
		Object.keys(this.createForm.controls).forEach(field => {
			const control = this.createForm.get(field);
			control.markAsTouched({ onlySelf: true });
		});
		}
  }

  closeModal() {
    this.activeModal.close();
  }
}
