import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import {MedicalService} from 'app/services/medical.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-medical-profile',
  templateUrl: './add-medical.component.html',
  styleUrls: ['./add-medical.component.scss']
})
export class AddMedicalComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  
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

  }

  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'create', title:'MEDICAL_REPORT'};
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
      this.addForm.get('medicalReport').setValue(event);
    }
    else{
      console.log("unchecked");
      this.addForm.get('medicalReport').setValue(event);
    }

  }

  submit(){
      this.addForm.addControl('profile',new FormControl(null));
      this.addForm.get('profile').setValue(Number(this.data));
      console.log("all Data: ", this.addForm.value);
      const formData = new FormData();
      formData.append('data', JSON.stringify(this.addForm.value));
      this.loading = true;
      this.medicalService.addMedical(formData).subscribe(res=>{
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
