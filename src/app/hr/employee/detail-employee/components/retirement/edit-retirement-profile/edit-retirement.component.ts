import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from 'app/hr/employee/employee.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RetirmentService } from './../retirement.service';

@Component({
  selector: 'app-edit-retirement-profile',
  templateUrl: './edit-retirement.component.html',
  styleUrls: ['./edit-retirement.component.scss']
})
export class EditRetirementComponent implements OnInit {
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
    private dConvert: DateConvertService,
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
    this.addForm.get('profileJob').disable();

    this.loadStatus();
    this.loadRetirementTypes();
    this.changeDate(this.data);
    this.loadProfileJobs();

  }


  changeDate(data){
    this.data.maktubDate = (data.maktubDate === null? null: this.dConvert.convertToDariDate(data.maktubDate));
    this.data.decreeDate = (data.decreeDate === null? null: this.dConvert.convertToDariDate(data.decreeDate));

    this.setForm(this.data);
  }

  setForm(editRecord: any) {
		this.addForm.patchValue(editRecord);
		this.addForm.patchValue({
      maktubNumber:editRecord.maktubNumber? editRecord.maktubNumber:null,
      maktubDate: editRecord.maktubDate? editRecord.maktubDate:null,
      decreeNumber: editRecord.decreeNumber? editRecord.decreeNumber:null,
      decreeDate: editRecord.decreeDate? editRecord.decreeDate:null,
      detail: editRecord.detail? editRecord.detail:null,
      profileJob: editRecord.profileJob? editRecord.profileJob.id:null,
      status: editRecord.status? editRecord.status.id:null,
      type: editRecord.type? editRecord.type.id:null,
		});
	}

  loadStatus() {
    this.status$ = this.employeeService.getEmployeeStatus();
  }

  loadProfileJobs(){
    this.profileJob$ = this.employeeService.getJobsByProfile(this.data.profile.id);
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
       data = {type:'edit', title:'RETIREMENT'};
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
      this.retirementService.editEditRetirement(this.data.id,formData).subscribe(res=>{
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
