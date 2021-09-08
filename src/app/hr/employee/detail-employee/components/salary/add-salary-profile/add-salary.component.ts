import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from 'app/hr/employee/employee.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SalaryService } from '../salary.service';
import { UtilityService } from 'app/hr/employee/utility.service';

@Component({
  selector: 'app-salary-profile',
  templateUrl: './add-salary.component.html',
  styleUrls: ['./add-salary.component.scss']
})
export class AddSalaryComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  addFormSubmitted = false;
  salaryType;
  total :number = 0;
  dropTotal: number = 0;
  profileJob$;
  
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private salaryService: SalaryService,
    private UtilityService: UtilityService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);

    this.addForm = this.formBuilder.group({
      originalSalary:[null,[Validators.required]],
      patentSalary:[null,[Validators.required]],
      extraSalary:[null, [Validators.required]],
      macul:[null,[Validators.required]], 
      original:[null,[Validators.required]],
      cadreSalary:[null,[Validators.required]],
      profileJob:[null],
    });
    
    this.loadSalary();
    this.loadProfileJobs();

  }

  loadProfileJobs(){
    this.profileJob$ = this.employeeService.getJobsByProfile(this.data);
  }


  changeTotal(event){
    this.total -= this.dropTotal;
    this.dropTotal = 0;
    this.total += event.type;
    this.dropTotal += event.type;
  }

  changeInputTotal(event){
    console.log("event: ", event.currentTarget.value);
    var y: number = + event.currentTarget.value;
    this.total += y;
  }


  loadSalary(){
    this.salaryType = this.UtilityService.getSalaryType();
  }


  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'create', title:'SALARY'};
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
      this.salaryService.addSalary(formData).subscribe(res=>{
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
