import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CountryService } from 'app/services/country.service';
import { ProvinceService } from 'app/services/province.service';
import { EmployeeService } from 'app/hr/employee/employee.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TravelService } from '../travel.service';
import { UtilityService } from 'app/hr/employee/utility.service';

@Component({
  selector: 'app-edit-travel-profile',
  templateUrl: './edit-travel.component.html',
  styleUrls: ['./edit-travel.component.scss']
})
export class EditTravelComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  addFormSubmitted = false;
  showCountry: boolean = false;
  showProvince: boolean = false;
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
    private dConvert: DateConvertService,
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
      country:[null],
      province:[null],
      purpose:[null,[Validators.required]],
      
    });

    if(this.data.country){
      this.showCountry = true;
      this.showProvince = false;
    }
    else if(this.data.province){
      this.showProvince = true;
      this.showCountry = false;
    }

    this.changeDate(this.data);

  }

  changeDate(data){
    this.data.date = (data.date === null? null: this.dConvert.convertToDariDate(data.date));

    this.setForm(this.data);
  }

  setForm(editRecord: any) {
		this.addForm.patchValue(editRecord);
		this.addForm.patchValue({
      type:editRecord.type? editRecord.type:null,
      MaktubNo: editRecord.maktubNo? editRecord.maktubNo:null,
      date: editRecord.date? editRecord.date:null,
      profileJob: editRecord.profileJob? editRecord.profileJob.id:null,
      university: editRecord.university? editRecord.university:null,
      country: editRecord.country? editRecord.country.id:null,
      province: editRecord.province? editRecord.province.id:null,
      purpose: editRecord.purpose? editRecord.purpose:null,
		});
	}

  preLoadingData(){
    this.loadProvinces();
    this.loadCountry();
    this.loadTravelTypes();
    this.loadProfileJobs();
  }

  loadProfileJobs(){
    this.profileJob$ = this.employeeService.getJobsByProfile(this.data.profile.id);
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
       data = {type:'edit', title:'TRAVEL_INFORMATION'};
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
      this.addForm.get('profile').setValue(Number(this.data.profile.id));
      console.log("all Data: ", this.addForm.value);
      const formData = new FormData();
      formData.append('data', JSON.stringify(this.addForm.value));
      this.loading = true;
      this.travelService.editTravel(this.data.id,formData).subscribe(res=>{
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
