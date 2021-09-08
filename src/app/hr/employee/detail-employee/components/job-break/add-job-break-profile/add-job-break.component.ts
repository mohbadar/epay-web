import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from 'app/hr/employee/employee.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-job-break-profile',
  templateUrl: './add-job-break.component.html',
  styleUrls: ['./add-job-break.component.scss']
})
export class AddJobBreakComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  addFormSubmitted = false;
  status$;
  
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);

    this.addForm = this.formBuilder.group({
      endDate:[null,[Validators.required]],
      maktubDate:[null,[Validators.required]],
      status:[null],
      jobBreak:[true],
      breakDetail:[null],
    });

    this.loadStatus();

  }

  loadStatus() {
    this.status$ = this.employeeService.getEmployeeStatus();
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'create', title:'JOB_BREAK'};
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
      this.employeeService.addBreakProfileJob(formData).subscribe(res=>{
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
