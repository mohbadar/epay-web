import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from 'app/hr/employee/employee.service';
import { AuthorityService } from 'app/services/authority.service';
import { CommissionService } from 'app/services/commission.service';
import { MinistryService } from 'app/services/ministry.service';
import { PaneltyService } from 'app/services/panelty.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-panelty-profile',
  templateUrl: './add-panelty.component.html',
  styleUrls: ['./add-panelty.component.scss']
})
export class AddPaneltyComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  addFormSubmitted = false;
  showCivilanPosition: boolean = true;
  showMilitaryPosition: boolean = false;
  paneltyType$;
  position$;
  ministrie$;
  authoritie$;
  profileJob$;
  commission$;
  status$;
  militaryPositon$;
  showMinistry: boolean = true;
  showAuthority: boolean = false;
  showCommission:boolean = false;
  showPosition: boolean = true;
  showRadio: boolean = true;
  showPositionTitle:boolean = true;
  showStatus: boolean = false;
  
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private formBuilder: FormBuilder,
    private paneltyService: PaneltyService,
    private commissionService: CommissionService,
    private authorityService: AuthorityService,
    private employeeService: EmployeeService,
    private ministryService: MinistryService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);

    this.preLoadingData();
    this.addForm = this.formBuilder.group({
      type:[null,[Validators.required]],
      suggestedNumber:[null,[Validators.required]],
      suggestedDate:[null, [Validators.required]],
      suggestedSource:[null,[Validators.required]],
      decreeNumber:[null,[Validators.required]],
      decreeDate:[null, [Validators.required]],
      degreeSource:[null,[Validators.required]],
      position:[null],
      militaryPosition:[null],
      positionTitle:[null], 
      ministry:[null],
      authority:[null], 
      commission:[null],
      profileJob:[null],
      status:[null],
    });

  }

  preLoadingData(){
    this.loadPaneltyType();
    this.loadMinistries();
    this.loadAuthorities();
    this.loadCommission();
    this.loadPositions();
    this.loadProfileJobs();
    this.loadStatus();
    this.loadMilitaryPosition();
  }

  loadMilitaryPosition(){
    this.militaryPositon$ = this.employeeService.getEmployeeMilitaryGrade();
  }

  loadStatus() {
    this.status$ = this.employeeService.getEmployeeStatus();
  }

  loadProfileJobs(){
    this.profileJob$ = this.employeeService.getJobsByProfile(this.data);
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

  loadPaneltyType(){
    this.paneltyType$ = this.paneltyService.getPaneltyType();
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'create', title:'PENALTY'};
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


  changeReward(event){

    console.log(event);

    if(event.id == 4)
    {
      console.log("id:", event.id, event.nameDr);
      this.showPositionTitle = true;
      this.showRadio = true;
      this.showPosition = true;
      this.showMinistry = true;
      this.addForm.get('positionTitle').setValidators([Validators.required]);
      this.addForm.get('position').setValidators([Validators.required]);
      this.addForm.get('ministry').setValidators([Validators.required]);
    }
    else if (event.id == 5){
      this.showStatus = true;
      this.showPositionTitle = false;
      this.showRadio = false;
      this.showPosition = false;
      this.showMinistry = false;
      this.showAuthority = false;
      this.showCommission = false;
      this.addForm.get('positionTitle').setErrors(null);
      this.addForm.get('positionTitle').clearValidators();
      this.addForm.get('positionTitle').setValue(null);
      this.addForm.get('position').setErrors(null);
      this.addForm.get('position').clearValidators();
      this.addForm.get('position').setValue(null);
      this.addForm.get('ministry').setErrors(null);
      this.addForm.get('ministry').clearValidators();
      this.addForm.get('ministry').setValue(null);
      this.addForm.get('authority').setErrors(null);
      this.addForm.get('authority').clearValidators();
      this.addForm.get('authority').setValue(null);
      this.addForm.get('commission').setErrors(null);
      this.addForm.get('commission').clearValidators();
      this.addForm.get('commission').setValue(null);
    }
    else{
      this.showPositionTitle = false;
      this.showRadio = false;
      this.showPosition = false;
      this.showMinistry = false;
      this.showAuthority = false;
      this.showCommission = false;
      this.addForm.get('positionTitle').setErrors(null);
      this.addForm.get('positionTitle').clearValidators();
      this.addForm.get('positionTitle').setValue(null);
      this.addForm.get('position').setErrors(null);
      this.addForm.get('position').clearValidators();
      this.addForm.get('position').setValue(null);
      this.addForm.get('ministry').setErrors(null);
      this.addForm.get('ministry').clearValidators();
      this.addForm.get('ministry').setValue(null);
      this.addForm.get('authority').setErrors(null);
      this.addForm.get('authority').clearValidators();
      this.addForm.get('authority').setValue(null);
      this.addForm.get('commission').setErrors(null);
      this.addForm.get('commission').clearValidators();
      this.addForm.get('commission').setValue(null);
    
    }

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
      this.paneltyService.addPanelty(formData).subscribe(res=>{
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
