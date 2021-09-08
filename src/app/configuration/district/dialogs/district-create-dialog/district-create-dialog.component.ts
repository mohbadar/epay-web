import { Component, OnInit, Output, Input, EventEmitter, Inject,  AfterViewInit} from "@angular/core";
import {  FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { TranslatedToastrService } from "app/services/translated-toastr.service";
import { ProvinceService } from "app/services/province.service";
import { CountryService } from "app/services/country.service";
import { DistrictService } from "app/services/district.service";

@Component({
  selector: "district-create-dialog",
  templateUrl: "./district-create-dialog.component.html",
  styleUrls: ["./district-create-dialog.component.scss"],
})
export class DistrictCreateDialogComponent implements OnInit {
  @Output() districtCreateEventEmitter = new EventEmitter<Object>();
  @Input() data;
  createForm: FormGroup;
  province$;
  provinces = [];
  obj;

  constructor(
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService,
    private districtService: DistrictService,
    private provinceService: ProvinceService
  ) { }

  ngOnInit() {
    this.loadProvinces()
    this.createForm = this.formBuilder.group({
      nameEn: ["", [Validators.required]],
      nameDr: ["", [Validators.required]],
      namePs: ["", [Validators.required]],
      province: ["", [Validators.required]]
    });
  }

  onFormSubmit() {
		if (this.createForm.valid) {
      this.spinner.show();
      console.log(this.createForm.value);
      const formData = new FormData();
      formData.append('data', JSON.stringify(this.createForm.value));
      this.districtService.createDistrict(formData).subscribe(res=>{
        this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        this.spinner.hide();
        this.activeModal.close();
        this.districtCreateEventEmitter.emit(Response);
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

  loadProvinces() {
    this.province$ = this.provinceService.getProvincesList();
    this.province$.subscribe(res => {
      this.provinces = res;  
    });

  }

  closeModal() {
    this.activeModal.close();
  }
}
