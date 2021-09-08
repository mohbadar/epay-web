import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from 'app/hr/employee/employee.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'approve-profile',
  templateUrl: './approve-profile.component.html',
  styleUrls: ['./approve-profile.component.scss']
})
export class ApproveProfileComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  openFile = false;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("setting :", this.data);

  }



  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'approve', title:'APPROVE_PROFILE'};
    }
    
    this.activeModal.close(data);
  }

  

  changeApprove(event){
    
    if(event){
      this.openFile = true;
    }
    else{
      this.openFile = false;
    }
  }


  submit(){
      console.log("profile.id: ", this.data);
      this.loading = true;
      this.employeeService.approveProfileById(this.data).subscribe(res=>{
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
