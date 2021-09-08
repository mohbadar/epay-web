import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { UtilityService } from 'app/hr/employee/utility.service';
import {FamilyService} from 'app/services/family.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-family-profile',
  templateUrl: './edit-family.component.html',
  styleUrls: ['./edit-family.component.scss']
})
export class EditFamilyComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  addFormSubmitted = false;
  partytypes;
  
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private familyService: FamilyService,
    private utilityService: UtilityService,
    private formBuilder: FormBuilder,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);

    this.addForm = this.formBuilder.group({
      familytotal:[null,[Validators.required]],
      female:[null],
      male:[null],
    });
    this.loadParty();

    this.setForm(this.data);
  }

  loadParty(){
    this.partytypes = this.utilityService.getFamilyType();
  }

  setForm(editRecord: any) {
		this.addForm.patchValue(editRecord);
		this.addForm.patchValue({
      familytotal:editRecord.familytotal? editRecord.familytotal:null,
      female: editRecord.female? editRecord.female:null,
      male: editRecord.male? editRecord.male:null,
		});
	}

  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'edit', title:'FAMILY_MEMBERS'};
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
      this.familyService.editFamilyMember(this.data.id,formData).subscribe(res=>{
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
