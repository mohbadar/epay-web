import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import {AcademicDegreeService} from 'app/services/academic-degree.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-academic-profile',
  templateUrl: './add-academic-degree.component.html',
  styleUrls: ['./add-academic-degree.component.scss']
})
export class AddAcademicDegreeComponent implements OnInit {

  data;
  modelType:boolean = false;
  addFormSubmitted = false;
  academicDegreeType$;
  loading = false;
  
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private formBuilder: FormBuilder,
    public spinner: NgxSpinnerService,
    private academicDegreeService: AcademicDegreeService,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);

    this.preLoadingData();
    this.addForm = this.formBuilder.group({
      type:[null,[Validators.required]],
      shumara:[null,[Validators.required]],
      title: [null, [Validators.required]],
      date:[null, [Validators.required]],  
    });

  }

  preLoadingData(){
    this.loadAcademicDegreeType();
  }

  loadAcademicDegreeType(){
    this.academicDegreeType$ = this.academicDegreeService.getAcademicDegreeType();
  }


  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'create', title:'ACADEMIC-DEGREE'};
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
      this.academicDegreeService.addAcademicDegree(formData).subscribe(res=>{
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
