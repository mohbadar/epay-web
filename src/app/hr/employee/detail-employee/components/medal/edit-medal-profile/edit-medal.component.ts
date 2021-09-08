import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DateConvertService } from 'app/services/date-convert.service';
import { MedalService } from 'app/services/medal.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-medal-profile',
  templateUrl: './edit-medal.component.html',
  styleUrls: ['./edit-medal.component.scss']
})
export class EditMedalComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  addFormSubmitted = false;
  
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private dConvert: DateConvertService,
    private medalService:MedalService,
    private formBuilder: FormBuilder,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);

    this.addForm = this.formBuilder.group({
      medalType:[null,[Validators.required]],
      approvedSource:[null,[Validators.required]],
      maktubNumber:[null,[Validators.required]],
      maktubDate:[null, [Validators.required]],   
    });

    this.changeDate(this.data);

  }

  changeDate(data){
    this.data.maktubDate = (data.maktubDate === null? null: this.dConvert.convertToDariDate(data.maktubDate));

    this.setForm(this.data);
  }

  setForm(editRecord: any) {
		this.addForm.patchValue(editRecord);
		this.addForm.patchValue({
      medalType:editRecord.medalType? editRecord.medalType:null,
      approvedSource: editRecord.approvedSource? editRecord.approvedSource:null,
      maktubNumber: editRecord.maktubNumber? editRecord.maktubNumber:null,
      maktubDate: editRecord.maktubDate? editRecord.maktubDate:null,
		});
	}


  


  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'edit', title:'MEDAL_MARK'};
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
      this.medalService.editMedal(this.data.id,formData).subscribe(res=>{
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
