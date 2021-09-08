import { Component, OnInit, Output, Input, EventEmitter, Inject,  AfterViewInit} from "@angular/core";
import {  FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { TranslatedToastrService } from "app/services/translated-toastr.service";
import { ProvinceService } from "app/services/province.service";
import { CountryService } from "app/services/country.service";

@Component({
  selector: "province-create-dialog",
  templateUrl: "./province-create-dialog.component.html",
  styleUrls: ["./province-create-dialog.component.scss"],
})
export class ProvinceCreateDialogComponent implements OnInit {
  @Output() provinceCreateEventEmitter = new EventEmitter<Object>();
  @Input() data;
  createForm: FormGroup;
  countrie$;
  countries = [];
  obj;

  constructor(
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService,
    private provinceService: ProvinceService,
    private countryService: CountryService
  ) { }

  ngOnInit() {
    this.loadCountries()
    this.createForm = this.formBuilder.group({
      nameEn: ["", [Validators.required]],
      nameDr: ["", [Validators.required]],
      namePs: ["", [Validators.required]],
      country: ["", [Validators.required]]
    });
  }

  onFormSubmit() {
		if (this.createForm.valid) {
      this.spinner.show();
      console.log(this.createForm.value);
      const formData = new FormData();
      formData.append('data', JSON.stringify(this.createForm.value));
      this.provinceService.createProvince(formData).subscribe(res=>{
        this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        this.spinner.hide();
        this.activeModal.close();
        this.provinceCreateEventEmitter.emit(Response);
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

  loadCountries() {
    this.countrie$ = this.countryService.getCountrysList();
    this.countrie$.subscribe(res => {
      this.countries = res;  
    });

  }

  closeModal() {
    this.activeModal.close();
  }
}
