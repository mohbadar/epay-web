import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from 'app/hr/employee/employee.service';
import { AuthorityService } from 'app/services/authority.service';
import { CommissionService } from 'app/services/commission.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { MinistryService } from 'app/services/ministry.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TransferService } from '../transfer.service';

@Component({
  selector: 'app-edit-transfer-profile',
  templateUrl: './edit-transfer.component.html',
  styleUrls: ['./edit-transfer.component.scss']
})
export class EditTransferComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  addFormSubmitted = false;
  position$;
  ministrie$;
  authoritie$;
  commission$;
  profileJob$;
  status$;

  showCivilanPosition: boolean = false;
  showMilitaryPosition: boolean = false;
  militaryPositon$;
  

  showMinistry: boolean = false;
  showAuthority: boolean = false;
  showCommission:boolean = false;
  
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private transferService: TransferService,
    private ministryService: MinistryService,
    private formBuilder: FormBuilder,
    private dConvert: DateConvertService,
    private commissionService: CommissionService,
    private authorityService: AuthorityService,
    private employeeService: EmployeeService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);

    this.addForm = this.formBuilder.group({
      maktubNumber:[null,[Validators.required]],
      maktubDate:[null,[Validators.required]],
      position:[null],
      militaryPosition:[null],
      positionTitle:[null,[Validators.required]], 
      ministry:[null],
      profileJob:[null],
      authority:[null], 
      commission:[null], 
      status:[null],
    });
    this.addForm.get('profileJob').disable();

    if(this.data.ministry != null){
      this.showMinistry = true;
    }

    else if (this.data.authority != null)
    {
      this.showAuthority = true;
    }

    else if(this.data.commission != null){
      this.showCommission = true;
    }

    if(this.data.position != null){
      this.showCivilanPosition = true;
    }
    else if(this.data.militaryPosition != null)
    {
      this.showMilitaryPosition = true;
    }

    
    this.loadProfileJobs();
    this.loadStatus();

    this.loadPositions();
    this.loadMinistries();
    this.loadAuthorities();
    this.loadCommission();
    this.changeDate(this.data);
    this.loadMilitaryPosition();

  }

  loadMilitaryPosition(){
    this.militaryPositon$ = this.employeeService.getEmployeeMilitaryGrade();
  }


  loadStatus() {
    this.status$ = this.employeeService.getEmployeeStatus();
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
      position: editRecord.position? editRecord.position.id:null,
      positionTitle: editRecord.positionTitle? editRecord.positionTitle:null,
      ministry: editRecord.ministry? editRecord.ministry.id:null,
      authority: editRecord.authority? editRecord.authority.id:null,
      commission: editRecord.commission? editRecord.commission.id:null,
      profileJob: editRecord.profileJob? editRecord.profileJob.id:null,
      status: editRecord.status? editRecord.status.id:null,
      militaryPosition: editRecord.militaryPosition? editRecord.militaryPosition.id:null,
		});
	}

  loadProfileJobs(){
    this.profileJob$ = this.employeeService.getJobsByProfile(this.data.profile.id);
  }

  loadCommission(){
    this.commission$ = this.commissionService.getCommissions();
  }

  loadAuthorities() {
    this.authoritie$ = this.authorityService.getAuthorities();
  }
  loadMinistries() {
    this.ministrie$ = this.ministryService.getMinistries();
  }


  loadPositions() {
    this.position$ = this.employeeService.getEmployeePosition();
  }


  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'edit', title:'TRANSFER'};
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
      this.transferService.editTransfer(this.data.id,formData).subscribe(res=>{
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


  RadioClicked(event) {
    if (event.target.defaultValue === 'ministry') {
      console.log("selected Ministry: ", event.target.defaultValue);
      this.showMinistry = true;
      this.showAuthority = false;
      this.showCommission = false;
      this.addForm.get('ministry').setValidators([Validators.required]);
      this.addForm.get('authority').setErrors(null);
      this.addForm.get('authority').clearValidators();
      this.addForm.get('authority').setValue(null);
      this.addForm.get('commission').setErrors(null);
      this.addForm.get('commission').clearValidators();
      this.addForm.get('commission').setValue(null);
     
    }

    else if(event.target.defaultValue === 'commission')
    {
      console.log("selected Commission: ", event.target.defaultValue);
      this.showMinistry = false;
      this.showAuthority = false;
      this.showCommission = true;
      this.addForm.get('commission').setValidators([Validators.required]);
      this.addForm.get('authority').setErrors(null);
      this.addForm.get('authority').clearValidators();
      this.addForm.get('authority').setValue(null);
      this.addForm.get('ministry').setErrors(null);
      this.addForm.get('ministry').clearValidators();
      this.addForm.get('ministry').setValue(null);

    }

    else {
      console.log("selected Authority: ", event.target.defaultValue);
      this.showAuthority = true;
      this.showMinistry = false;
      this.showCommission= false;
      this.addForm.get('authority').setValidators([Validators.required]);
      this.addForm.get('ministry').setErrors(null);
      this.addForm.get('ministry').clearValidators();
      this.addForm.get('ministry').setValue(null);
      this.addForm.get('commission').setErrors(null);
      this.addForm.get('commission').clearValidators();
      this.addForm.get('commission').setValue(null);
    }

  }

  
  RadioClickedPosition(event) {
    if (event.target.defaultValue === 'civilian') {
      console.log("selected civilan: ", event.target.defaultValue);
      this.showCivilanPosition = true;
      this.showMilitaryPosition = false;
      this.addForm.get('position').setValidators([Validators.required]);
      this.addForm.get('militaryPosition').setErrors(null);
      this.addForm.get('militaryPosition').clearValidators();
      this.addForm.get('militaryPosition').setValue(null);
     
    }

    else if(event.target.defaultValue === 'military')
    {
      console.log("selected miliary: ", event.target.defaultValue);
      this.showMilitaryPosition = true;
      this.showCivilanPosition = false;
      this.addForm.get('militaryPosition').setValidators([Validators.required]);
      this.addForm.get('position').setErrors(null);
      this.addForm.get('position').clearValidators();
      this.addForm.get('position').setValue(null);

    }

  }

}
