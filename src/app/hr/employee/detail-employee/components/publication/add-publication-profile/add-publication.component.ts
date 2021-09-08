import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import {PublicationService} from 'app/services/publication.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-publication-profile',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.scss']
})
export class AddPublicationComponent implements OnInit {
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
    private formBuilder: FormBuilder,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);

    this.preLoadingData();
    this.addForm = this.formBuilder.group({
      type:[null,[Validators.required]],
      title:[null,[Validators.required]],
      publishDate:[null, [Validators.required]],
      approvedAuthority:[null,[Validators.required]],
      maktubShumara:[null,[Validators.required]],
      maktubDate:[null, [Validators.required]]
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
      this.addForm.get('profile').setValue(Number(this.data));
      console.log("all Data: ", this.addForm.value);
      const formData = new FormData();
      formData.append('data', JSON.stringify(this.addForm.value));
      this.loading = true;
      this.publicationService.addPublication(formData).subscribe(res=>{
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
