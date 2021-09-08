import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UploadService } from 'app/services/upload.service'
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MinistryService } from 'app/services/ministry.service';
import { AuthorityService } from 'app/services/authority.service';
import { CommissionService } from 'app/services/commission.service';
import { TranslateService } from '@ngx-translate/core';
import { CountryService } from 'app/services/country.service';
import { ProvinceService } from 'app/services/province.service';
import { DistrictService } from 'app/services/district.service';
import { EmployeeService } from 'app/hr/employee/employee.service';
import { UtilityService } from 'app/services/utility.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { Country } from 'app/models/country';
import { Province } from 'app/models/province';
import { EditorComponent } from 'app/template/forms/elements/editor/editor.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = true;
  editFormSubmitted = false;
  loadPaper:boolean=true;
  loadElectronic:boolean=true;
  showMinistry: boolean = false;
  showAuthority: boolean = false;
  showCommission:boolean = false;
  countrie$;
  originalProvince$;
  ethnicities$;
  nationalities$;
  appiantTypes;
  religions$;
  sects$;
  bloodtypes;
  languages$;
  nationalLanguage$;
  position$;
  grade$;
  status$;
  originalDistrict$;
  birthProvince$;
  birthDistrict$;
  curentProvince$;
  currentDistrict$;
  ministrie$;
  authoritie$;
  commission$;
  gender$;
  allData;
  militaryGrade$;

  showCivilanGrade = false;
  showMilitaryGrade = false;
  civilanCheck = false;
  militaryCheck = false;

  showCivilanPosition = false;
  showMilitaryPosition = false;
  civilanCheckPosition = false;
  militaryCheckPosition = false;

  editForm: FormGroup;

  


  constructor(
    public activeModal: NgbActiveModal,
    private uploadService:UploadService,
    public translate:TranslateService,
    private countryService: CountryService,
    private provinceService: ProvinceService,
    private districtService: DistrictService,
    private utilityService: UtilityService,
    private ministryService: MinistryService,
    private authorityService: AuthorityService,
    private commissionService: CommissionService,
    private dConvert: DateConvertService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("data in edit : ", this.data);

   

    this.preLoadData();
    this.editForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null],
      fatherName: [null, [Validators.required]],
      grandFatherName:[null],
      ethnic:[null,[Validators.required]],
      nationality:[null,[Validators.required]],
      religion:[null,[Validators.required]],
      sect:[null],
      blood:[null,[Validators.required]],
      language:[null],
      nationalLanguages:[null, [Validators.required]],
      dob: [null,[Validators.required]],
      dobGregorian:[null,[Validators.required]],
      birthCountry:[null,Validators.required],
      birthProvince:[null,Validators.required],
      birthDistrict:[null],
      birthVillage:[null],
      originalCountry:[null,Validators.required],
      originalProvince:[null,Validators.required],
      originalDistrict:[null],
      originalVillage:[null],
      currentCountry:[null,[Validators.required]],
      currentProvince: [null, Validators.required],
      currentDistrict: [null],
      currentVillage: [null],
      tazkiraNumber: [null, Validators.required],
      tazkiraTog: [null, Validators.required],
      tazkiraRegister: [null, Validators.required],
      tazkiraPage: [null, Validators.required],
      tazkiraDate: [null, Validators.required],
      tazkiraPlace: [null, Validators.required],
      enid: [null, Validators.required],
      phone: [null],
      year: [null, Validators.required],
      email: [null],
      suggestionNumber: [null],
      suggestionDate: [null],
      appointDate: [null, Validators.required],
      decreeNumber: [null, Validators.required],
      positionTitle: [null, Validators.required],
      position: [null],
      militaryPosition:[null],
      grade: [null],
      militaryGrade:[null],
      status: [null, Validators.required],
      gender: [null, Validators.required],
      qadamYear: [null, [Validators.max(100), Validators.min(1)]],
      qadamMonth: [null, [Validators.max(12), Validators.min(1)]],
      qadamDay: [null, [Validators.max(31), Validators.min(1)]],
      ministry: [null],
      authority: [null],
      commission:[null],
      appointType:[null,Validators.required]
      
      
    });

    if(this.data.grade != null){
      this.showCivilanGrade = true;
      this.civilanCheck  = true;
    }
    else if (this.data.militaryGrade != null){
      this.showMilitaryGrade = true;
      this.militaryCheck = true;
    }

    if(this.data.position != null)
    {
      this.showCivilanPosition = true;
      this.civilanCheckPosition = true;
    }
    else if(this.data.militaryPosition != null)
    {
      this.showMilitaryPosition = true;
      this.militaryCheckPosition = true;
    }

    this.changeDate(this.data);

    if(this.data.tazkiraNumber != null && this.data.enid != null){
      
    }
    else if (this.data.enid != null){
      this.loadPaperTazkira(false);
    }
    else if(this.data.tazkiraNumber != null)
    {
      this.loadElectronicTazkira(false);
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

    if(this.data.disable){
      this.editForm.get('suggestionNumber').disable();
      this.editForm.get('suggestionDate').disable();
      this.editForm.get('appointDate').disable();
      this.editForm.get('decreeNumber').disable();
      this.editForm.get('positionTitle').disable();
      this.editForm.get('position').disable();
      this.editForm.get('militaryPosition').disable();
      this.editForm.get('grade').disable();
      this.editForm.get('militaryGrade').disable();
      this.editForm.get('ministry').disable();
      this.editForm.get('authority').disable();
      this.editForm.get('commission').disable();
    }



  }

  loadMilitaryGrade(){
    this.militaryGrade$ = this.employeeService.getEmployeeMilitaryGrade();
  }

  loadAppointType(){
    this.appiantTypes = this.utilityService.getAppointType();
  }

  changeDate(data){
    this.data.year = this.dConvert.convertToDariDate(data.year);
    this.data.tazkiraDate = (data.tazkiraDate === null? null: this.dConvert.convertToDariDate(data.tazkiraDate)),
    this.data.suggestionDate = (data.suggestionDate === null? null: this.dConvert.convertToDariDate(data.suggestionDate));
    this.data.appointDate = this.dConvert.convertToDariDate(data.appointDate);


    this.setForm(this.data);
  }

  setForm(editRecord: any) {
		this.editForm.patchValue(editRecord);
		this.editForm.patchValue({
			firstName:editRecord.firstName? editRecord.firstName:null,
			lastName:editRecord.lastName? editRecord.lastName:null,
			fatherName:editRecord.fatherName? editRecord.fatherName:null,
      grandFatherName:editRecord.grandFatherName? editRecord.grandFatherName:null,
      ethnic:editRecord.ethnic? editRecord.ethnic:null,
      nationality:editRecord.nationality? editRecord.nationality:null,
      religion:editRecord.religion? editRecord.religion:null,
      sect:editRecord.sect? editRecord.sect:null,
      blood:editRecord.blood? editRecord.blood:null,
      language:editRecord.language? editRecord.language:null,
      nationalLanguages: editRecord.nationalLanguages?editRecord.nationalLanguages:null,
      dob:editRecord.dob? editRecord.dob:null,
      dobGregorian: editRecord.dobGregorian? editRecord.dobGregorian:null,
      birthCountry:editRecord.birthCountry? editRecord.birthCountry:null,
      birthProvince:editRecord.birthProvince? editRecord.birthProvince:null,
      birthDistrict:editRecord.birthDistrict? editRecord.birthDistrict:null,
      birthVillage:editRecord.birthVillage? editRecord.birthVillage:null,
      originalCountry:editRecord.originalCountry? editRecord.originalCountry:null,
      originalProvince:editRecord.originalProvince? editRecord.originalProvince:null,
      originalDistrict:editRecord.originalDistrict? editRecord.originalDistrict:null,
      originalVillage:editRecord.originalVillage? editRecord.originalVillage:null,
      currentCountry:editRecord.currentCountry? editRecord.currentCountry:null,
      currentProvince:editRecord.currentProvince? editRecord.currentProvince:null,
      currentDistrict:editRecord.currentDistrict? editRecord.currentDistrict:null,
      currentVillage:editRecord.currentVillage? editRecord.currentVillage:null,
      tazkiraNumber:editRecord.tazkiraNumber? editRecord.tazkiraNumber:null,
      tazkiraTog:editRecord.tazkiraTog? editRecord.tazkiraTog:null,
      tazkiraRegister:editRecord.tazkiraRegister? editRecord.tazkiraRegister:null,
      tazkiraPage:editRecord.tazkiraPage? editRecord.tazkiraPage:null,
      tazkiraDate:editRecord.tazkiraDate? editRecord.tazkiraDate:null,
			tazkiraPlace:editRecord.tazkiraPlace? editRecord.tazkiraPlace:null,
      enid: editRecord.enid? editRecord.enid:null,
      phone: editRecord.phone? editRecord.phone:null,
      year: editRecord.year? editRecord.year:null,
      email: editRecord.email? editRecord.email:null,
      suggestionNumber: editRecord.suggestionNumber? editRecord.suggestionNumber:null,
      suggestionDate: editRecord.suggestionDate? editRecord.suggestionDate:null,
      appointDate: editRecord.appointDate? editRecord.appointDate:null,
      decreeNumber: editRecord.decreeNumber? editRecord.decreeNumber:null,
      positionTitle: editRecord.positionTitle? editRecord.positionTitle:null,
      position: editRecord.position? editRecord.position:null,
      grade: editRecord.grade? editRecord.grade:null,
      status: editRecord.status? editRecord.status:null,
      qadamYear: editRecord.qadamYear? editRecord.qadamYear:null,
      qadamMonth: editRecord.qadamMonth? editRecord.qadamMonth:null,
      qadamDay: editRecord.qadamDay? editRecord.qadamDay:null,
      ministry: editRecord.ministry? editRecord.ministry:null,
      authority: editRecord.authority? editRecord.authority:null,
      commission: editRecord.commission? editRecord.commission:null,
      gender: editRecord.gender? editRecord.gender:null,
      appointType: editRecord.appointType? editRecord.appointType:null,
      militaryGrade: editRecord.militaryGrade? editRecord.militaryGrade:null,
      militaryPosition: editRecord.militaryPosition? editRecord.militaryPosition:null,

		});
	}


  preLoadData(){
    this.loadCountries();
    if(this.data.originalCountry)
    {
      const p = {id: this.data.originalCountry};
      this.loadOriginalProvinces(p);
    }
    if(this.data.birthCountry)
    {
      const p = {id: this.data.birthCountry};
      this.loadBirthProvinces(p);
    }

    if(this.data.originalProvince)
    {
      const p = {id:this.data.originalProvince};
      this.loadOriginalDistricts(p);
    }
    if(this.data.birthProvince)
    {
      const p = {id: this.data.birthProvince}
      this.loadBirthDistricts(p);
    }
    if(this.data.currentCountry)
    {
      const p = {id:this.data.currentCountry};
      this.loadCurrentProvinces(p);
    }
    if(this.data.currentProvince)
    {
      const p = {id: this.data.currentProvince};
      this.loadCurrentDistricts(p);
    }


    this.loadEthnicity();
    this.loadNationalities();
    this.loadReligions();
    this.loadSects();
    this.loadBloodTypes();
    this.loadLanguages();
    this.loadPositions();
    this.loadGrades();
    this.loadStatus();
    this.loadMinistries();
    this.loadAuthorities();
    this.loadCommission();
    this.loadNationalLanguages();
    this.loadAppointType();
    this.loadGender();
    this.loadMilitaryGrade();
  }

  setToNull(formName, name) {
    console.log(name);
    formName.controls[name].setValue(null);
  }

  loadGender(){
    this.gender$ = this.employeeService.getGender();
  }

  loadCountries() {
    this.countrie$ = this.countryService.getCountrysList();
  }

  loadOriginalProvinces(event) {
    if(event){
      this.originalProvince$ = this.provinceService.getProvinceByCountry(event.id);
    }
  }

  loadCurrentProvinces(event) {
    if (event) {
      this.curentProvince$ = this.provinceService.getProvinceByCountry(event.id);
    }
  }

  loadCurrentDistricts(event) {
    if (event) {
      this.currentDistrict$ = this.districtService.getDistrictByProvince(event.id);
    }
  }

  loadOriginalDistricts(event) {
    if(event)
    {
      this.originalDistrict$ = this.districtService.getDistrictByProvince(event.id);
    }
  }

  loadBirthProvinces(event) {
    if(event)
    {
      this.birthProvince$ = this.provinceService.getProvinceByCountry(event.id);
    }
  }

  loadBirthDistricts(event) {
    if(event)
    {
      this.birthDistrict$ = this.districtService.getDistrictByProvince(event.id);
    }
  }

  loadEthnicity() {
    this.ethnicities$ = this.employeeService.getEthnicities();
  }

  loadNationalities() {
    this.nationalities$ = this.employeeService.getNationalities();
  }
  loadReligions() {
    this.religions$ = this.employeeService.getReligions();
  }
  loadSects() {
    this.sects$ = this.employeeService.getSects();
  }
  loadBloodTypes() {
    this.bloodtypes = this.utilityService.getBloodTypes();
  }
  loadLanguages() {
    this.languages$ = this.employeeService.getLanguages();
  }

  loadNationalLanguages() {
    this.nationalLanguage$ = this.employeeService.getNationalLanguages();
  }


  birthDateChanged() {
    let dateString = this.editForm.get('dob').value;
    dateString = this.dConvert.convertToGregorianDate(dateString);
    this.editForm.get('dobGregorian').setValue(dateString);
  }

  loadPositions() {
    this.position$ = this.employeeService.getEmployeePosition();
  }

  loadPaperTazkira(event) {
    if (event) {
      console.log("paper tazkira: ", event);
      this.loadPaper = true;
      this.editForm.get('tazkiraNumber').setValidators([Validators.required]);
      this.editForm.get('tazkiraTog').setValidators([Validators.required]);
      this.editForm.get('tazkiraRegister').setValidators([Validators.required]);
      this.editForm.get('tazkiraPage').setValidators([Validators.required]);
      this.editForm.get('tazkiraDate').setValidators([Validators.required]);
      this.editForm.get('tazkiraPlace').setValidators([Validators.required]);
    }
    else {
      console.log("paper tazkira not : ", event);
      this.loadPaper = false;
      this.editForm.get('tazkiraNumber').setErrors(null);
      this.editForm.get('tazkiraNumber').clearValidators();
      this.editForm.get('tazkiraNumber').setValue(null);

      this.editForm.get('tazkiraTog').setErrors(null);
      this.editForm.get('tazkiraTog').clearValidators();
      this.editForm.get('tazkiraTog').setValue(null);

      this.editForm.get('tazkiraRegister').setErrors(null);
      this.editForm.get('tazkiraRegister').clearValidators();
      this.editForm.get('tazkiraRegister').setValue(null);

      this.editForm.get('tazkiraPage').setErrors(null);
      this.editForm.get('tazkiraPage').clearValidators();
      this.editForm.get('tazkiraPage').setValue(null);

      this.editForm.get('tazkiraDate').setErrors(null);
      this.editForm.get('tazkiraDate').clearValidators();
      this.editForm.get('tazkiraDate').setValue(null);

      this.editForm.get('tazkiraPlace').setErrors(null);
      this.editForm.get('tazkiraPlace').clearValidators();
      this.editForm.get('tazkiraPlace').setValue(null);
    }

  }

  RadioClicked(event) {
    if (event.target.defaultValue === 'ministry') {
      console.log("selected Ministry: ", event.target.defaultValue);
      this.showMinistry = true;
      this.showAuthority = false;
      this.showCommission = false;
      this.editForm.get('ministry').setValidators([Validators.required]);
      this.editForm.get('authority').setErrors(null);
      this.editForm.get('authority').clearValidators();
      this.editForm.get('authority').setValue(null);
      this.editForm.get('commission').setErrors(null);
      this.editForm.get('commission').clearValidators();
      this.editForm.get('commission').setValue(null);
     
    }

    else if(event.target.defaultValue === 'commission')
    {
      console.log("selected Commission: ", event.target.defaultValue);
      this.showMinistry = false;
      this.showAuthority = false;
      this.showCommission = true;
      this.editForm.get('commission').setValidators([Validators.required]);
      this.editForm.get('authority').setErrors(null);
      this.editForm.get('authority').clearValidators();
      this.editForm.get('authority').setValue(null);
      this.editForm.get('ministry').setErrors(null);
      this.editForm.get('ministry').clearValidators();
      this.editForm.get('ministry').setValue(null);

    }

    else {
      console.log("selected Authority: ", event.target.defaultValue);
      this.showAuthority = true;
      this.showMinistry = false;
      this.showCommission= false;
      this.editForm.get('authority').setValidators([Validators.required]);
      this.editForm.get('ministry').setErrors(null);
      this.editForm.get('ministry').clearValidators();
      this.editForm.get('ministry').setValue(null);
      this.editForm.get('commission').setErrors(null);
      this.editForm.get('commission').clearValidators();
      this.editForm.get('commission').setValue(null);
    }

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

  loadElectronicTazkira(event) {
    if (event) {
      console.log("electronic tazkira: ", event);
      this.loadElectronic = true;
      this.editForm.get('enid').setValidators([Validators.required]);

    }
    else {
      console.log("electronic tazkira not : ", event);
      this.loadElectronic = false;
      this.editForm.get('enid').setErrors(null);
      this.editForm.get('enid').clearValidators();
      this.editForm.get('enid').setValue(null);
    }
  }

  loadGrades() {
    this.grade$ = this.employeeService.getEmployeeGrade();
  }

  loadStatus() {
    this.status$ = this.employeeService.getEmployeeStatus();
  }


  submitEditFrom() {
    this.editFormSubmitted = true;
    if (this.editForm.invalid) {
      return;
    }
    else{
      this.editForm.addControl('disable',new FormControl(null));
      this.editForm.get('disable').setValue(this.data.disable);
      console.log("all Data after Edit: ", this.editForm.getRawValue());
      const formData = new FormData();
      formData.append('data', JSON.stringify(this.editForm.getRawValue()));
      this.loading = true;
      this.employeeService.editRecord(this.data.id,formData).subscribe(res=>{
          console.log("come from server: ", res);
          this.loading = false;
          this.closeModal();
      }, err=>{
          console.log("error from server: ", err);
          this.loading = false;
      });
    }
    

  }

  get cpf() {
    return this.editForm.controls;
  }



  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'edit', title:'PROFILE'};
    }
    
    this.activeModal.close(data);
  }



  RadioClickedNew(event) {
    if (event.target.defaultValue === 'civilian') {
      console.log("selected civilan: ", event.target.defaultValue);
      this.showCivilanGrade = true;
      this.showMilitaryGrade = false;
      this.editForm.get('grade').setValidators([Validators.required]);
      this.editForm.get('militaryGrade').setErrors(null);
      this.editForm.get('militaryGrade').clearValidators();
      this.editForm.get('militaryGrade').setValue(null);
     
    }

    else if(event.target.defaultValue === 'military')
    {
      console.log("selected miliary: ", event.target.defaultValue);
      this.showMilitaryGrade = true;
      this.showCivilanGrade = false;
      this.editForm.get('militaryGrade').setValidators([Validators.required]);
      this.editForm.get('grade').setErrors(null);
      this.editForm.get('grade').clearValidators();
      this.editForm.get('grade').setValue(null);

    }

  }

  RadioClickedPosition(event) {
    if (event.target.defaultValue === 'civilian') {
      console.log("selected civilan: ", event.target.defaultValue);
      this.showCivilanPosition = true;
      this.showMilitaryPosition = false;
      this.editForm.get('position').setValidators([Validators.required]);
      this.editForm.get('militaryPosition').setErrors(null);
      this.editForm.get('militaryPosition').clearValidators();
      this.editForm.get('militaryPosition').setValue(null);
     
    }

    else if(event.target.defaultValue === 'military')
    {
      console.log("selected miliary: ", event.target.defaultValue);
      this.showMilitaryPosition = true;
      this.showCivilanPosition = false;
      this.editForm.get('militaryPosition').setValidators([Validators.required]);
      this.editForm.get('position').setErrors(null);
      this.editForm.get('position').clearValidators();
      this.editForm.get('position').setValue(null);

    }

  }

}
