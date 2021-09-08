import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import {MedicalService} from 'app/services/medical.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-medical-profile',
  templateUrl: './edit-medical.component.html',
  styleUrls: ['./edit-medical.component.scss']
})
export class EditMedicalComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  checkedMedical:boolean = false;
  showSubmit:boolean = false;
  
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private medicalService: MedicalService,
    private formBuilder: FormBuilder,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);

    this.addForm = this.formBuilder.group({
      medicalReport:[true,[Validators.required]],
    });

    if(this.data.medicalReport != null && this.data.medicalReport != false){
      this.checkedMedical = true;
    }
    else{
      this.checkedMedical = false;
    }

  }

  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'edit', title:'MEDICAL_REPORT'};
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

  chengeEdit(event){

    if(event)
    {
      console.log("checked");
      this.showSubmit = true;
      this.addForm.get('medicalReport').setValue(event);
    }
    else{
      console.log("unchecked");
      this.showSubmit = true;
      this.addForm.get('medicalReport').setValue(event);
    }

  }

  submit(){
    this.addForm.addControl('profile',new FormControl(null));
    this.addForm.get('profile').setValue(Number(this.data.profile.id));
    console.log("all Data: ", this.addForm.value);
    const formData = new FormData();
    formData.append('data', JSON.stringify(this.addForm.value));
    this.loading = true;
    this.medicalService.editMedical(this.data.id,formData).subscribe(res=>{
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
