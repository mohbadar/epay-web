import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from 'app/hr/employee/employee.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PromotionProfileService } from '../promotion-profile.service';

@Component({
  selector: 'app-edit-promotion-p-profile',
  templateUrl: './edit-promotion-profile.component.html',
  styleUrls: ['./edit-promotion-profile.component.scss']
})
export class EditPromotionProfileComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  addFormSubmitted = false;
  grade$;
  profileJob$;
  promotionType$;
  militaryGrade$;

  showOldCivilanGrade = false;
  showOldMilitaryGrade = false;
  showNewCivilanGrade = false;
  showNewMilitaryGrade = false;
  oldcivilanCheck = false;
  oldMilitaryCheck = false;
  newCivileanCheck = false;
  newMilitaryCheck = false;

  
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private promotionService: PromotionProfileService,
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
      oldGrade:[null],
      newGrade:[null],
      oldMilitaryGrade:[null],
      newMilitaryGrade:[null],
      profileJob:[null,[Validators.required]],
      type:[null, [Validators.required]],
      qadamYear:[null, [Validators.max(100), Validators.min(1)]],
      qadamMonth:[null, [Validators.max(12), Validators.min(1)]],
      qadamDay:[null, [Validators.max(31), Validators.min(1)]],
    });
    this.changeDate(this.data);

    this.loadGrades();
    this.loadProfileJobs();
    this.loadPromotionType();
    this.loadMilitaryGrade();

    if(this.data.oldGrade != null){
      this.showOldCivilanGrade = true;
      this.oldcivilanCheck  = true;
    }
    else if (this.data.oldMilitaryGrade != null){
      this.showOldMilitaryGrade = true;
      this.oldMilitaryCheck = true;
    }

    if(this.data.newGrade != null){
      this.showNewCivilanGrade = true;
      this.newCivileanCheck = true;
    }
    else if(this.data.newMilitaryGrade != null){
      this.showNewMilitaryGrade = true;
      this.newMilitaryCheck = true;
    }

  }

  loadMilitaryGrade(){
    this.militaryGrade$ = this.employeeService.getEmployeeMilitaryGrade();
  }

  loadPromotionType(){
    this.promotionType$ = this.promotionService.getPromotionType();
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
      oldGrade: editRecord.oldGrade? editRecord.oldGrade.id:null,
      newGrade: editRecord.newGrade? editRecord.newGrade.id:null,
      profileJob: editRecord.profileJob? editRecord.profileJob.id:null,
      qadamYear: editRecord.qadamYear? editRecord.qadamYear:null,
      qadamMonth: editRecord.qadamMonth? editRecord.qadamMonth: null,
      qadamDay: editRecord.qadamDay? editRecord.qadamDay:null,
      type: editRecord.type? editRecord.type.id:null,
      oldMilitaryGrade: editRecord.oldMilitaryGrade? editRecord.oldMilitaryGrade.id:null,
      newMilitaryGrade: editRecord.newMilitaryGrade? editRecord.newMilitaryGrade.id:null,
		});
	}

  loadProfileJobs(){
    this.profileJob$ = this.employeeService.getJobsByProfile(this.data.profile.id);
  }

  


  loadGrades() {
    this.grade$ = this.employeeService.getEmployeeGrade();
  }


  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'create', title:'PROMOTION'};
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
      this.promotionService.editPromotion(this.data.id,formData).subscribe(res=>{
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
    if (event.target.defaultValue === 'civilian') {
      console.log("selected civilan: ", event.target.defaultValue);
      this.showOldCivilanGrade = true;
      this.showOldMilitaryGrade = false;
      this.addForm.get('oldGrade').setValidators([Validators.required]);
      this.addForm.get('oldMilitaryGrade').setErrors(null);
      this.addForm.get('oldMilitaryGrade').clearValidators();
      this.addForm.get('oldMilitaryGrade').setValue(null);
     
    }

    else if(event.target.defaultValue === 'military')
    {
      console.log("selected miliary: ", event.target.defaultValue);
      this.showOldMilitaryGrade = true;
      this.showOldCivilanGrade = false;
      this.addForm.get('oldMilitaryGrade').setValidators([Validators.required]);
      this.addForm.get('oldGrade').setErrors(null);
      this.addForm.get('oldGrade').clearValidators();
      this.addForm.get('oldGrade').setValue(null);

    }

  }


  RadioClickedNew(event) {
    if (event.target.defaultValue === 'civilian') {
      console.log("selected civilan: ", event.target.defaultValue);
      this.showNewCivilanGrade = true;
      this.showNewMilitaryGrade = false;
      this.addForm.get('newGrade').setValidators([Validators.required]);
      this.addForm.get('newMilitaryGrade').setErrors(null);
      this.addForm.get('newMilitaryGrade').clearValidators();
      this.addForm.get('newMilitaryGrade').setValue(null);
     
    }

    else if(event.target.defaultValue === 'military')
    {
      console.log("selected miliary: ", event.target.defaultValue);
      this.showNewMilitaryGrade = true;
      this.showNewCivilanGrade = false;
      this.addForm.get('newMilitaryGrade').setValidators([Validators.required]);
      this.addForm.get('newGrade').setErrors(null);
      this.addForm.get('newGrade').clearValidators();
      this.addForm.get('newGrade').setValue(null);

    }

  }



}
