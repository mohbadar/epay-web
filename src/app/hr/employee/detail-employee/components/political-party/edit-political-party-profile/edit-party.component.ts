import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { UtilityService } from 'app/hr/employee/utility.service';
import {MedicalService} from 'app/services/medical.service';
import {PoliticalPartyService} from 'app/services/political-party.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-party-profile',
  templateUrl: './edit-party.component.html',
  styleUrls: ['./edit-party.component.scss']
})
export class EditPartyComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  partytypes;
  addFormSubmitted = false;
  
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private medicalService: MedicalService,
    private utilityService: UtilityService,
    private partyService: PoliticalPartyService,
    private formBuilder: FormBuilder,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);

    this.addForm = this.formBuilder.group({
      type:[null, [Validators.required]],
      name:[null,[Validators.required]],
    });

    this.loadParty();
    this.setForm(this.data);

  }

  setForm(editRecord: any) {
		this.addForm.patchValue(editRecord);
		this.addForm.patchValue({
      type:editRecord.type? editRecord.type:null,
      name: editRecord.name? editRecord.name:null,
		});
	}

  loadParty(){
    this.partytypes = this.utilityService.getPartyType();
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'edit', title:'POLITICAL_PARTY'};
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
      this.partyService.editParty(this.data.id,formData).subscribe(res=>{
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
