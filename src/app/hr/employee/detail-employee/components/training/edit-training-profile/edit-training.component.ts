import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { CountryService } from 'app/services/country.service';
import { ProvinceService } from 'app/services/province.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilityService } from 'app/hr/employee/utility.service';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-edit-training-profile',
  templateUrl: './edit-training.component.html',
  styleUrls: ['./edit-training.component.scss']
})
export class EditTrainingComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  addFormSubmitted = false;
  showCountry: boolean = true;
  showProvince: boolean = true;
  province$;
  country$;
  Types;
  trainingTypes;
  
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private formBuilder: FormBuilder,
    private utilityService:UtilityService,
    private trainingService: TrainingService,
    private countryService: CountryService,
    private dConvert: DateConvertService,
    private provinceService: ProvinceService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);

    this.preLoadingData();
    this.addForm = this.formBuilder.group({
      type:[null,[Validators.required]],
      title:[null,[Validators.required]],
      startDate:[null, [Validators.required]],
      endDate:[null,[Validators.required]],
      seminarType:[null, [Validators.required]],
      country:[null],
      province:[null],
      
    });

    if(this.data.province){
      this.showProvince = true;
      this.showCountry = false;
    }

    else if(this.data.country){
      this.showProvince = false;
      this.showCountry = true;
    }

    this.changeDate(this.data);

  }

  changeDate(data){
    this.data.startDate = (data.startDate === null? null: this.dConvert.convertToDariDate(data.startDate));
    this.data.endDate = (data.endDate === null? null: this.dConvert.convertToDariDate(data.endDate));

    this.setForm(this.data);
  }


  setForm(editRecord: any) {
		this.addForm.patchValue(editRecord);
		this.addForm.patchValue({
      type:editRecord.type? editRecord.type:null,
      title: editRecord.title? editRecord.title:null,
      startDate: editRecord.startDate? editRecord.startDate:null,
      endDate: editRecord.endDate? editRecord.endDate:null,
      seminarType: editRecord.seminarType? editRecord.seminarType:null,
      country: editRecord.country? editRecord.country.id:null,
      province: editRecord.province? editRecord.province.id:null,
		});
	}

  preLoadingData(){
    this.loadProvinces();
    this.loadCountry();
    this.loadTravelTypes();
    this.loadTrainingType();
  }

  loadTrainingType(){
    this.trainingTypes = this.utilityService.getTrainingType();
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
    this.Types = this.utilityService.getTravelType();
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
       data = {type:'edit', title:'SEMINAR'};
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
      this.trainingService.editTraining(this.data.id,formData).subscribe(res=>{
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
