import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import {AcademicDegreeService} from 'app/services/academic-degree.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-academic-profile',
  templateUrl: './edit-academic-degree.component.html',
  styleUrls: ['./edit-academic-degree.component.scss']
})
export class EditAcademicDegreeComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  addFormSubmitted = false;
  academicDegreeType$;
  
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private formBuilder: FormBuilder,
    private dConvert: DateConvertService,
    private academicDegreeService: AcademicDegreeService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);

    this.preLoadingData();
    this.addForm = this.formBuilder.group({
      type:[null,[Validators.required]],
      shumara:[null,[Validators.required]],
      title:[null, [Validators.required]],
      date:[null, [Validators.required]],  
    });

    this.changeDate(this.data);

  }

  changeDate(data){
    this.data.date = (data.date === null? null: this.dConvert.convertToDariDate(data.date));

    this.setForm(this.data);
  }


  setForm(editRecord: any) {
		this.addForm.patchValue(editRecord);
		this.addForm.patchValue({
      type:editRecord.type? editRecord.type.id:null,
      shumara: editRecord.shumara? editRecord.shumara:null,
      title: editRecord.title? editRecord.title: null,
      date: editRecord.date? editRecord.date:null,
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
       data = {type:'edit', title:'ACADEMIC-DEGREE'};
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
      this.academicDegreeService.editAcademicDegree(this.data.id,formData).subscribe(res=>{
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
