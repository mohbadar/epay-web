import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from 'app/hr/employee/employee.service';
import { AuthorityService } from 'app/services/authority.service';
import { CommissionService } from 'app/services/commission.service';
import { MinistryService } from 'app/services/ministry.service';
import { ProfileFiredService } from 'app/services/profile-fired.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-fired-profile',
  templateUrl: './add-fired.component.html',
  styleUrls: ['./add-fired.component.scss']
})
export class AddFiredComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  addFormSubmitted = false;
  profileJob$;
  firedType$;
  status$;

  
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private firedService: ProfileFiredService,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);

    this.addForm = this.formBuilder.group({
      maktubNumber:[null,[Validators.required]],
      maktubDate:[null,[Validators.required]],
      profileJob:[null, [Validators.required]],
      type: [null, [Validators.required]],
      status:[null],
    });

    this.loadProfileJobs();
    this.loadProfileFiredType();
    this.loadStatus();

  }

  loadStatus() {
    this.status$ = this.employeeService.getEmployeeStatus();
  }

  loadProfileFiredType(){
    this.firedType$ = this.firedService.getFiredType();
  }

  loadProfileJobs(){
    this.profileJob$ = this.employeeService.getJobsByProfileendDateNull(this.data);
  }



  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'create', title:'FIRED_FROM_DUTY'};
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
      this.firedService.addFired(formData).subscribe(res=>{
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
