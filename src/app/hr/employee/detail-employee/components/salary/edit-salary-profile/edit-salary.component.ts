import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from 'app/hr/employee/employee.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SalaryService } from './../salary.service';
import { UtilityService } from 'app/hr/employee/utility.service';

@Component({
  selector: 'app-edit-salary-profile',
  templateUrl: './edit-salary.component.html',
  styleUrls: ['./edit-salary.component.scss']
})
export class EditSalaryComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  addFormSubmitted = false;
  salaryType;
  total :number = 0;
  x = true;
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
    var x: number = + this.data.original + this.data.cadreSalary + this.data.originalSalary + this.data.patentSalary + this.data.extraSalary + this.data.macul;
    this.total = x;

    this.addForm = this.formBuilder.group({
      originalSalary:[null,[Validators.required]],
      patentSalary:[null,[Validators.required]],
      extraSalary:[null, [Validators.required]],
      macul:[null,[Validators.required]], 
      original:[null,[Validators.required]],
      cadreSalary:[null,[Validators.required]],
      profileJob:[null],
    });
    this.setForm(this.data);
    this.loadProfileJobs();

  }

  loadProfileJobs(){
    this.profileJob$ = this.employeeService.getJobsByProfile(this.data.profile.id);
  }

  changeTotal(event){
    
    if(this.x)
    {
      this.total -= this.data.original;
      this.total += event.type;
      this.dropTotal += event.type;
      this.x = false;
    }
    else{
      this.total -= this.dropTotal;
      this.dropTotal = 0;
      this.total += event.type;
      this.dropTotal += event.type;
    }

    
  }

  changeInputTotalY(event){
    console.log("event: ", event.currentTarget.value);
    this.total -= this.data.cadreSalary;
    var y: number = + event.currentTarget.value;
    this.total += y;
  }

  changeInputTotalk(event){
    console.log("event: ", event.currentTarget.value);
    this.total -= this.data.original;
    var y: number = + event.currentTarget.value;
    this.total += y;
  }

  changeInputTotalA(event){
    console.log("event: ", event.currentTarget.value);
    this.total -= this.data.originalSalary;
    var y: number = + event.currentTarget.value;
    this.total += y;
  }

  changeInputTotalC(event){
    console.log("event: ", event.currentTarget.value);
    this.total -= this.data.patentSalary;
    var y: number = + event.currentTarget.value;
    this.total += y;
  }
  changeInputTotalD(event){
    console.log("event: ", event.currentTarget.value);
    this.total -= this.data.extraSalary;
    var y: number = + event.currentTarget.value;
    this.total += y;
  }
  changeInputTotalE(event){
    console.log("event: ", event.currentTarget.value);
    this.total -= this.data.macul;
    var y: number = + event.currentTarget.value;
    this.total += y;
  }

  loadSalary(){
    this.salaryType = this.UtilityService.getSalaryType();
  }

  setForm(editRecord: any) {
		this.addForm.patchValue(editRecord);
		this.addForm.patchValue({
      originalSalary:editRecord.originalSalary? editRecord.originalSalary:null,
      patentSalary: editRecord.patentSalary? editRecord.patentSalary:null,
      extraSalary:editRecord.extraSalary? editRecord.extraSalary:null,
      macul: editRecord.macul? editRecord.macul:null,
      original: editRecord.original? editRecord.original: null,
      profileJob: editRecord.profileJob? editRecord.profileJob.id:null,
      cadreSalary: editRecord.cadreSalary? editRecord.cadreSalary:null,
		});
	}
  


  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'edit', title:'SALARY'};
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
      this.salaryService.editSalary(this.data.id,formData).subscribe(res=>{
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
