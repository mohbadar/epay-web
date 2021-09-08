import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from 'app/hr/employee/employee.service';
import { CountryService } from 'app/services/country.service';
import { DateConvertService } from 'app/services/date-convert.service';
import {EducationService} from './../education.service';
import { UtilityService } from 'app/hr/employee/utility.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.scss']
})
export class EditEducationComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  addFormSubmitted = false;
  education$;
  country$;
  universityTypes;profileJob$;
  showProfileJob = false;
  checkSwitch = false;
  
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private educationService:EducationService,
    private formBuilder: FormBuilder,
    private dConvert: DateConvertService,
    private utilityService:UtilityService,
    private countryService: CountryService,
    private employeeService: EmployeeService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("education: ", this.data);

    this.preLoadingData();
    this.addForm = this.formBuilder.group({
      level:[null,[Validators.required]],
      startDate:[null],
      graduationDate:[null, [Validators.required]],
      fieldOfStudy:[null,[Validators.required]],
      university:[null],
      country:[null, [Validators.required]],
      universityType:[null,[Validators.required]],
      insideWork:[false],
      profileJob:[null],
      
    });

    if(this.data.insideWork == true){
      this.checkSwitch = true;
      this.showProfileJob = true;
    }

    this.changeDate(this.data);
    this.loadProfileJobs();

  }

  changeDate(data){
    this.data.startDate = (data.startDate === null? null: this.dConvert.convertToDariDate(data.startDate));
    this.data.graduationDate = (data.graduationDate === null? null: this.dConvert.convertToDariDate(data.graduationDate));

    this.setForm(this.data);
  }

  insideWorkChange(event){
    if(event){
      this.addForm.get('insideWork').setValue(true);
      this.showProfileJob = true;
      this.addForm.get('profileJob').setValidators([Validators.required]);
    }
    else{
      this.addForm.get('insideWork').setValue(false);
      this.showProfileJob = false;
      this.addForm.get('profileJob').setErrors(null);
      this.addForm.get('profileJob').clearValidators();
      this.addForm.get('profileJob').setValue(null);

    }
  }

  loadProfileJobs(){
    this.profileJob$ = this.employeeService.getJobsByProfile(this.data.profile.id);
  }


  setForm(editRecord: any) {
		this.addForm.patchValue(editRecord);
		this.addForm.patchValue({
      level:editRecord.level? editRecord.level.id:null,
      startDate: editRecord.startDate? editRecord.startDate:null,
      graduationDate: editRecord.graduationDate? editRecord.graduationDate:null,
      fieldOfStudy: editRecord.fieldOfStudy? editRecord.fieldOfStudy:null,
      university: editRecord.university? editRecord.university:null,
      country: editRecord.country? editRecord.country.id:null,
      universityType: editRecord.universityType? editRecord.universityType:null,
      insideWork: editRecord.insideWork? editRecord.insideWork:false,
      profileJob: editRecord.profileJob? editRecord.profileJob.id:null,
		});
	}

  preLoadingData(){
    this.loadEducation();
    this.loadCountry();
    this.loadUniversityTypes();
  }

  loadEducation(){
    this.education$ = this.educationService.getEducationLevel();
  }

  loadUniversityTypes(){
    this.universityTypes = this.utilityService.getUniversityType();
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
       data = {type:'edit', title:'EDUCATION'};
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
      this.educationService.editEducation(this.data.id,formData).subscribe(res=>{
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
