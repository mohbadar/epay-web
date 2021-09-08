import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from 'app/hr/employee/employee.service';
import { AuthorityService } from 'app/services/authority.service';
import { CommissionService } from 'app/services/commission.service';
import { MinistryService } from 'app/services/ministry.service';
import { AccountabilityService } from 'app/services/accountability.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-accountability-profile',
  templateUrl: './add-accountability.component.html',
  styleUrls: ['./add-accountability.component.scss']
})
export class AddAccountablityComponent implements OnInit {

  loading = false;
  data;
  modelType:boolean = false;
  addFormSubmitted = false;
  position$;
  ministrie$;
  authoritie$;
  commission$;

  showCivilanPosition: boolean = true;
  showMilitaryPosition: boolean = false;
  militaryPositon$;

  showMinistry: boolean = true;
  showAuthority: boolean = false;
  showCommission:boolean = false;
  
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private accountabilityService: AccountabilityService,
    private ministryService: MinistryService,
    private formBuilder: FormBuilder,
    private commissionService: CommissionService,
    private authorityService: AuthorityService,
    private employeeService: EmployeeService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);

    this.addForm = this.formBuilder.group({
      startDate:[null,[Validators.required]],
      endDate:[null,[Validators.required]],
      personName:[null,[Validators.required]],
      position:[null, [Validators.required]],
      militaryPosition:[null],
      positionTitle:[null,[Validators.required]], 
      ministry:[null, [Validators.required]],
      authority:[null], 
      commission:[null], 
    });

    this.loadPositions();
    this.loadMinistries();
    this.loadAuthorities();
    this.loadCommission();
    this.loadMilitaryPosition();

  }

  loadMilitaryPosition(){
    this.militaryPositon$ = this.employeeService.getEmployeeMilitaryGrade();
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
       data = {type:'create', title:'ACCOUNTABILITY'};
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
      this.accountabilityService.addAccountability(formData).subscribe(res=>{
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

  chengeEdit(event){

    if(event)
    {
      console.log("checked");
      this.addForm.get('flag').setValue(event);
    }
    else{
      console.log("unchecked");
      this.addForm.get('flag').setValue(event);
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
