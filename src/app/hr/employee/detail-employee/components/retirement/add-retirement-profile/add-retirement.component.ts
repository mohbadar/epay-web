import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from 'app/hr/employee/employee.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RetirmentService } from './../retirement.service';

@Component({
  selector: 'app-retirement-profile',
  templateUrl: './add-retirement.component.html',
  styleUrls: ['./add-retirement.component.scss']
})
export class AddRetirementComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  addFormSubmitted = false;
  status$;
  retirementType$;
  profileJob$;
  
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private retirementService: RetirmentService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);

    this.addForm = this.formBuilder.group({
      maktubNumber:[null],
      maktubDate:[null],
      decreeNumber:[null, [Validators.required]],
      decreeDate:[null, [Validators.required]],
      detail:[null],
      status:[null],
      profileJob:[null],
      type:[null,[Validators.required]],
    });

    this.loadStatus();
    this.loadRetirementTypes();
    this.loadProfileJobs();

  }

  loadProfileJobs(){
    this.profileJob$ = this.employeeService.getJobsByProfile(this.data);
  }

  loadStatus() {
    this.status$ = this.employeeService.getEmployeeStatus();
  }

  loadRetirementTypes(){
    this.retirementType$ = this.retirementService.getRetirementType();
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'create', title:'RETIREMENT'};
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
      this.retirementService.addRetirement(formData).subscribe(res=>{
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
