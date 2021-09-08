import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DateConvertService } from 'app/services/date-convert.service';
import {PublicationService} from 'app/services/publication.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-publication-profile',
  templateUrl: './edit-publication.component.html',
  styleUrls: ['./edit-publication.component.scss']
})
export class EditPublicationComponent implements OnInit {
  loading = false;
  data;
  modelType:boolean = false;
  addFormSubmitted = false;
  PublicationType$;
  
  addForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    public translate:TranslateService,
    private publicationService: PublicationService,
    private dConvert: DateConvertService,
    private formBuilder: FormBuilder,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("publication Data: ", this.data);

    this.preLoadingData();
    this.addForm = this.formBuilder.group({
      type:[null,[Validators.required]],
      title:[null,[Validators.required]],
      publishDate:[null, [Validators.required]],
      approvedAuthority:[null,[Validators.required]],
      maktubShumara:[null,[Validators.required]],
      maktubDate:[null, [Validators.required]]
    });

    this.changeDate(this.data);

  }

  changeDate(data){
    this.data.publishDate = (data.publishDate === null? null: this.dConvert.convertToDariDate(data.publishDate));
    this.data.maktubDate = (data.maktubDate === null? null: this.dConvert.convertToDariDate(data.maktubDate));

    this.setForm(this.data);
  }


  setForm(editRecord: any) {
		this.addForm.patchValue(editRecord);
		this.addForm.patchValue({
      type:editRecord.type? editRecord.type.id:null,
      title: editRecord.title? editRecord.title:null,
      publishDate: editRecord.publishDate? editRecord.publishDate:null,
      approvedAuthority: editRecord.approvedAuthority? editRecord.approvedAuthority:null,
      maktubShumara: editRecord.maktubShumara? editRecord.maktubShumara:null,
      maktubDate: editRecord.maktubDate? editRecord.maktubDate:null,
		});
	}

  preLoadingData(){
    this.loadPublicationType();
  }

  loadPublicationType(){
    this.PublicationType$ = this.publicationService.getPublicationType();
  }



  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'create', title:'PUBLICATION'};
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
      this.publicationService.editPublication(this.data.id,formData).subscribe(res=>{
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
