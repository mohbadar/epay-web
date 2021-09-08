import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from 'app/hr/employee/employee.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-setting-profile',
  templateUrl: './setting-details.component.html',
  styleUrls: ['./setting-details.component.scss']
})
export class SettingDetailsComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("setting :", this.data);

    this.addForm = this.formBuilder.group({
      reward:[this.data.reward],
      panelty:[this.data.panelty],
      training:[this.data.training],
      publication:[this.data.publication],
      hononary:[this.data.Hononary_service],
      medal:[this.data.medal],
      military:[this.data.military],
      travel:[this.data.travel],
      transfer:[this.data.transfer],
      promotion:[this.data.promotion],
      academic:[this.data.academic_degree],
      accountability:[this.data.accountability],
      crime:[this.data.off_duty_crime],
      fired:[this.data.fired_from_duty], 
      party: [this.data.political_party],
      salary:[this.data.salary],
      family: [this.data.family_members],
    });

  }



  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'create', title:'PROFILE_SETTING'};
    }
    
    this.activeModal.close(data);
  }

  changeTraining(event){
    this.addForm.get('training').setValue(event);
  }

  changeReward(event){
    this.addForm.get('reward').setValue(event);
  }

  changePanelty(event){
    this.addForm.get('panelty').setValue(event);
  }

  changePublication(event){
    this.addForm.get('publication').setValue(event);
  }

  changeHononary(event){
    this.addForm.get('hononary').setValue(event);
  }

  changeMark(event){
    this.addForm.get('medal').setValue(event);
  }

  changeMilitary(event){
    this.addForm.get('military').setValue(event);
  }

  changeTravel(event){
    this.addForm.get('travel').setValue(event);
  }

  changeTransfer(event){
    this.addForm.get('transfer').setValue(event);
  }

  changePromotion(event){
    this.addForm.get('promotion').setValue(event);
  }

  changeAcademic(event){
    this.addForm.get('academic').setValue(event);
  }

  changeAccountability(event){
    this.addForm.get('accountability').setValue(event);
  }

  changeCrime(event){
    this.addForm.get('crime').setValue(event);
  }

  changeFired(event){
    this.addForm.get('fired').setValue(event);
  }

  changeParty(event){
    this.addForm.get('party').setValue(event);
  }

  changeSalary(event){
    this.addForm.get('salary').setValue(event);
  }

  changeFamily(event){
    this.addForm.get('family').setValue(event);
  }


  submit(){
      this.modelType = true;
      console.log("all Data: ", this.addForm.value);
      console.log("profile.id: ", this.data.id);
      const formData = new FormData();
      formData.append('data', JSON.stringify(this.addForm.value));
      this.loading = true;
      this.employeeService.addProfileSetting(this.data.id, formData).subscribe(res=>{
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
