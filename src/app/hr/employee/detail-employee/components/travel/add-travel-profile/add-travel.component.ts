import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CountryService } from 'app/services/country.service';
import { ProvinceService } from 'app/services/province.service';
import { EmployeeService } from 'app/hr/employee/employee.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilityService } from 'app/hr/employee/utility.service';
import { TravelService } from './../travel.service';

@Component({
  selector: 'app-travel-profile',
  templateUrl: './add-travel.component.html',
  styleUrls: ['./add-travel.component.scss']
})
export class AddTravelComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  addFormSubmitted = false;
  showCountry: boolean = true;
  showProvince: boolean = true;
  province$;
  country$;
  profileJob$;
  travelTypes;
  
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private formBuilder: FormBuilder,
    private utilityService:UtilityService,
    private travelService:TravelService,
    private countryService: CountryService,
    private employeeService: EmployeeService,
    private provinceService: ProvinceService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);

    this.preLoadingData();
    this.addForm = this.formBuilder.group({
      type:[null,[Validators.required]],
      MaktubNo:[null,[Validators.required]],
      date:[null, [Validators.required]],
      profileJob:[null],
      country:[null,[Validators.required]],
      province:[null, [Validators.required]],
      purpose:[null,[Validators.required]],
      
    });

  }

  preLoadingData(){
    this.loadProvinces();
    this.loadCountry();
    this.loadTravelTypes();
    this.loadProfileJobs();
  }

  loadProfileJobs(){
    this.profileJob$ = this.employeeService.getJobsByProfile(this.data);
  }

  changeTravel(event){

    console.log(event);
    if(event.id == 1)
    {
      this.showProvince = true;
      this.showCountry = false;
      this.addForm.get('province').setValidators([Validators.required]);
      this.addForm.get('country').setErrors(null);
      this.addForm.get('country').clearValidators();
      this.addForm.get('country').setValue(null);
    }
    else{
    
      console.log("id:", event.id, event.name);
      this.showCountry = true;
      this.showProvince = false;
      this.addForm.get('country').setValidators([Validators.required]);
      this.addForm.get('province').setErrors(null);
      this.addForm.get('province').clearValidators();
      this.addForm.get('province').setValue(null);
    
    }

  }

  loadProvinces(){
    this.province$ = this.provinceService.getProvinceByCountry(1);
  }

  loadTravelTypes(){
    this.travelTypes = this.utilityService.getTravelType();
  }

  loadCountry(){
    this.country$ = this.countryService.getCountrysList();
  }


  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'create', title:'TRAVEL_INFORMATION'};
    }
    
    this.activeModal.close(data);
  }

  get cpf() {
    return this.addForm.controls;
  }

  setToNull(formName, name) {
    console.log(name);
    formName.controls[name].setValue(null);
  }

  submit(){
    this.addFormSubmitted = true;
    if (this.addForm.invalid) {
      return;
    }
    else{
      this.addForm.addControl('profile',new FormControl(null));
      this.addForm.get('profile').setValue(Number(this.data));
      console.log("all Data: ", this.addForm.value);
      const formData = new FormData();
      formData.append('data', JSON.stringify(this.addForm.value));
      this.loading = true;
      this.travelService.addTravel(formData).subscribe(res=>{
          console.log("come from server: ", res);
          this.modelType = true;
          this.loading = false;
          this.closeModal();
      }, err=>{
          console.log("error from server: ", err);
          this.loading = false;
      });
      
    }
  }

}
