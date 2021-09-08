import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { UtilityService } from 'app/hr/employee/utility.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MilitaryService } from '../military.service';

@Component({
  selector: 'app-edit-military-profile',
  templateUrl: './edit-military.component.html',
  styleUrls: ['./edit-military.component.scss']
})
export class EditMilitaryComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  addFormSubmitted = false;
  militarytypes;
  
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private dConvert: DateConvertService,
    private utilityService: UtilityService,
    private militaryService: MilitaryService,
    private formBuilder: FormBuilder,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);

    this.addForm = this.formBuilder.group({
      startDate:[null,[Validators.required]],
      endDate:[null,[Validators.required]],
      type:[null,[Validators.required]],
      detail:[null],
    });

    this.changeDate(this.data);
    this.loadType();

  }

  changeDate(data){
    this.data.startDate = (data.startDate === null? null: this.dConvert.convertToDariDate(data.startDate));
    this.data.endDate = (data.endDate === null? null: this.dConvert.convertToDariDate(data.endDate));

    this.setForm(this.data);
  }

  loadType(){
    this.militarytypes = this.utilityService.getMilitaryType();
  }

  setForm(editRecord: any) {
		this.addForm.patchValue(editRecord);
		this.addForm.patchValue({
      startDate:editRecord.startDate? editRecord.startDate:null,
      endDate: editRecord.endDate? editRecord.endDate:null,
      type: editRecord.type? editRecord.type:null,
      detail: editRecord.detail? editRecord.detail:null,
		});
	}

  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'edit', title:'MILITARY_SERVICE'};
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
      this.militaryService.editMilitary(this.data.id,formData).subscribe(res=>{
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
