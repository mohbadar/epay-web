import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from 'app/hr/employee/employee.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RewardService } from '../reward.service';

@Component({
  selector: 'app-edit-reward-profile',
  templateUrl: './edit-reward.component.html',
  styleUrls: ['./edit-reward.component.scss']
})
export class EditRewardComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  addFormSubmitted = false;
  rewardType$;
  profileJob$;
  showCashAmount:boolean = false;
  showAppreciationDegree: boolean = false;
  
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private formBuilder: FormBuilder,
    private dConvert: DateConvertService,
    private employeeService: EmployeeService,
    private rewardService: RewardService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);

    this.preLoadingData();
    this.addForm = this.formBuilder.group({
      type:[null,[Validators.required]],
      suggestedNumber:[null,[Validators.required]],
      suggestedDate:[null, [Validators.required]],
      suggestedSource:[null,[Validators.required]],
      decreeNumber:[null,[Validators.required]],
      decreeDate:[null, [Validators.required]],
      degreeSource:[null,[Validators.required]],
      cashAmount:[null],
      appreciationDegree:[null, [Validators.max(3), Validators.min(1)]],
      profileJob:[null],
    });

    this.addForm.get('profileJob').disable();

    this.changeDate(this.data);
    if(this.data.appreciationDegree){
      this.showAppreciationDegree = true;
    }

    if(this.data.cashAmount){
      this.showCashAmount = true;
    }

  }

  changeDate(data){
    this.data.suggestedDate = (data.suggestedDate === null? null: this.dConvert.convertToDariDate(data.suggestedDate));
    this.data.decreeDate = (data.decreeDate === null? null: this.dConvert.convertToDariDate(data.decreeDate));

    this.setForm(this.data);
  }

  setForm(editRecord: any) {
		this.addForm.patchValue(editRecord);
		this.addForm.patchValue({
      type:editRecord.type? editRecord.type.id:null,
      suggestedNumber: editRecord.suggestedNumber? editRecord.suggestedNumber:null,
      suggestedDate: editRecord.suggestedDate? editRecord.suggestedDate:null,
      suggestedSource: editRecord.suggestedSource? editRecord.suggestedSource:null,
      decreeNumber: editRecord.decreeNumber? editRecord.decreeNumber:null,
      decreeDate: editRecord.decreeDate? editRecord.decreeDate:null,
      degreeSource: editRecord.degreeSource? editRecord.degreeSource:null,
      cashAmount: editRecord.cashAmount? editRecord.cashAmount:null,
      appreciationDegree: editRecord.appreciationDegree? editRecord.appreciationDegree:null,
      profileJob: editRecord.profileJob? editRecord.profileJob.id:null,
		});
	}

  preLoadingData(){
    this.loadRewardType();
    this.loadProfileJobs();
  }

  loadProfileJobs(){
    this.profileJob$ = this.employeeService.getJobsByProfile(this.data.profile.id);
  }

  loadRewardType(){
    this.rewardType$ = this.rewardService.getRewardType();
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'edit', title:'REWARD'};
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


  changeReward(event){

    console.log(event);

    if(event.id == 1)
    {
      console.log("id:", event.id, event.nameDr);
      this.showCashAmount = true;
      this.showAppreciationDegree = false;
      this.addForm.get('cashAmount').setValidators([Validators.required]);
      this.addForm.get('appreciationDegree').setErrors(null);
      this.addForm.get('appreciationDegree').clearValidators();
      this.addForm.get('appreciationDegree').setValue(null);
    }
    else if(event.id == 3)
    {
      console.log("id:", event.id, event.nameDr);
      this.showAppreciationDegree = true;
      this.showCashAmount = false;
      this.addForm.get('appreciationDegree').setValidators([Validators.required]);
      this.addForm.get('cashAmount').setErrors(null);
      this.addForm.get('cashAmount').clearValidators();
      this.addForm.get('cashAmount').setValue(null);
    }
    else{
      console.log("id:", event.id, event.nameDr);
      this.showCashAmount = false;
      this.showAppreciationDegree = false;
      this.addForm.get('appreciationDegree').setErrors(null);
      this.addForm.get('appreciationDegree').clearValidators();
      this.addForm.get('appreciationDegree').setValue(null);
      this.addForm.get('cashAmount').setErrors(null);
      this.addForm.get('cashAmount').clearValidators();
      this.addForm.get('cashAmount').setValue(null);
    }

  }

  submit(){
    this.addFormSubmitted = true;
    if (this.addForm.invalid) {
      return;
    }
    else{
      this.addForm.addControl('profile',new FormControl(null));
      this.addForm.get('profile').setValue(Number(this.data.profile.id));
      console.log("all Data: ", this.addForm.getRawValue());
      const formData = new FormData();
      formData.append('data', JSON.stringify(this.addForm.getRawValue()));
      this.loading = true;
      this.rewardService.editReward(this.data.id,formData).subscribe(res=>{
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
