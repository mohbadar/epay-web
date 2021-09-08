import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from 'app/hr/employee/employee.service';
import { AuthorityService } from 'app/services/authority.service';
import { CommissionService } from 'app/services/commission.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { MinistryService } from 'app/services/ministry.service';
import { PaneltyService } from 'app/services/panelty.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-panelty-profile',
  templateUrl: './edit-panelty.component.html',
  styleUrls: ['./edit-panelty.component.scss']
})
export class EditPaneltyComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  addFormSubmitted = false;
  paneltyType$;
  position$;
  ministrie$;
  authoritie$;
  profileJob$;
  commission$;
  status$;
  showMinistry: boolean = false;
  showAuthority: boolean = false;
  showCommission:boolean = false;
  showPosition: boolean = true;
  showRadio: boolean = true;
  showPositionTitle:boolean = true;
  showStatus: boolean = false;
  showCivilanPosition: boolean = false;
  showMilitaryPosition: boolean = false;
  militaryPositon$;

  
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private formBuilder: FormBuilder,
    private paneltyService: PaneltyService,
    private commissionService: CommissionService,
    private authorityService: AuthorityService,
    private dConvert: DateConvertService,
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
    
    this.changeDate(this.data);

    this.addForm.get('type').disable();
    this.addForm.get('profileJob').disable();

    if(this.data.position != null){
      this.showCivilanPosition = true;
    }
    else if(this.data.militaryPosition != null){
      this.showMilitaryPosition = true;
    }

    if(this.data.type.id != 4){
      this.showPositionTitle = false;
      this.showRadio = false;
      this.showPosition = false;
      this.showMinistry = false;
      
    }

    if(this.data.type.id == 5)
    {
      this.showStatus = true;
    }

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

  }

  changeDate(data){
    this.data.suggestedDate = (data.suggestedDate === null? null: this.dConvert.convertToDariDate(data.suggestedDate));
    this.data.decreeDate = (data.decreeDate === null? null: this.dConvert.convertToDariDate(data.decreeDate));

    this.setForm(this.data);
  }

  loadMilitaryPosition(){
    this.militaryPositon$ = this.employeeService.getEmployeeMilitaryGrade();
  }


  setForm(editRecord: any) {
		this.addForm.patchValue(editRecord);
		this.addForm.patchValue({
      type:editRecord.type? editRecord.type.id:null,
      suggestedNumber: editRecord.suggestedNumber? editRecord.suggestedNumber:null,
      suggestedDate: editRecord.suggestedDate? editRecord.suggestedDate:null,
      suggestedSource: editRecord.suggestedSource? editRecord.suggestedSource:null,
      decreeNumber: editRecord.decreeNumber? editRecord.decreeNumber:null,
      decreeDate: editRecord.decreeDate? editRecord.decreeDate:null,
      degreeSource: editRecord.degreeSource? editRecord.degreeSource:null,
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

  loadStatus() {
    this.status$ = this.employeeService.getEmployeeStatus();
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

  loadPaneltyType(){
    this.paneltyType$ = this.paneltyService.getPaneltyType();
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'edit', title:'PENALTY'};
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
      this.addForm.get('profile').setValue(Number(this.data.profile.id));
      console.log("all Data: ", this.addForm.getRawValue());
      const formData = new FormData();
      formData.append('data', JSON.stringify(this.addForm.getRawValue()));
      this.loading = true;
      this.paneltyService.editPanelty(this.data.id,formData).subscribe(res=>{
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
