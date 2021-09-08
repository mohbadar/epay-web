import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from 'app/hr/employee/employee.service';
import { AuthorityService } from 'app/services/authority.service';
import { CommissionService } from 'app/services/commission.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { MinistryService } from 'app/services/ministry.service';
import { ProfileFiredService } from 'app/services/profile-fired.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-fired-profile',
  templateUrl: './edit-fired.component.html',
  styleUrls: ['./edit-fired.component.scss']
})
export class EditFiredComponent implements OnInit {
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
    private dConvert: DateConvertService,
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
    this.addForm.get('profileJob').disable();

    this.loadProfileJobs();
    this.changeDate(this.data);
    this.loadProfileFiredType();
    this.loadStatus();

  }

  loadStatus() {
    this.status$ = this.employeeService.getEmployeeStatus();
  }

  loadProfileFiredType(){
    this.firedType$ = this.firedService.getFiredType();
  }

  changeDate(data){
    this.data.maktubDate = (data.maktubDate === null? null: this.dConvert.convertToDariDate(data.maktubDate));
    this.setForm(this.data);
  }

  setForm(editRecord: any) {
		this.addForm.patchValue(editRecord);
		this.addForm.patchValue({
      maktubNumber:editRecord.maktubNumber? editRecord.maktubNumber:null,
      maktubDate: editRecord.maktubDate? editRecord.maktubDate:null,
      profileJob: editRecord.profileJob? editRecord.profileJob.id:null,
      type: editRecord.type? editRecord.type.id:null,
      status: editRecord.status? editRecord.status.id:null,
		});
	}

  loadProfileJobs(){
    this.profileJob$ = this.employeeService.getJobsByProfile(this.data.profile.id);
  }



  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'edit', title:'FIRED_FROM_DUTY'};
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
      console.log("all Data: ", this.addForm.getRawValue());
      const formData = new FormData();
      formData.append('data', JSON.stringify(this.addForm.getRawValue()));
      this.loading = true;
      this.firedService.editFired(this.data.id,formData).subscribe(res=>{
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
