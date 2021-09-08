import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentProfileService } from 'app/services/document-profile.service'
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-document-profile',
  templateUrl: './document-profile.component.html',
  styleUrls: ['./document-profile.component.scss']
})
export class DocumentProfileComponent implements OnInit {

  data;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  fileName;
  documentType$;
  chooseFile:boolean = false;
  loading:boolean = false;
  progressloading:boolean = false;
  messageLoading:boolean = false;
  uploadIcon:boolean = false;
  modelType:boolean = false;
  fileToReturn:File;
  progress = 0;
  message = '';
  addForm: FormGroup;
  attachmentFile: any;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private documentProfileService:DocumentProfileService,
    public translate:TranslateService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);
    this.loadDocumentType();

    this.addForm = this.formBuilder.group({
      type:[null],
    });

  }

  choosedFile(event){
    if(event){
      this.chooseFile = true;
      this.attachmentFile = null;
      this.progressloading = false;
      this.progress = 0;
      this.messageLoading = false;
      this.fileChangeListener(null);
    }
  }


  setToNull(formName, name) {
    console.log(name);
    formName.controls[name].setValue(null);
    this.chooseFile = false;
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'document',title:'DOCUMENT'};
    }
    
    this.activeModal.close(data);
  }

  loadDocumentType(){
    this.documentType$ = this.documentProfileService.getDocumentType();
  }

  fileChangeListener(event): void {
    if(event != null)
    {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        this.attachmentFile = event.target.files[0];
        document.getElementById('fileName').innerHTML = event.target.files[0].name;
        this.uploadIcon = true;

      }
    }
    else{
      this.uploadIcon = false;
      document.getElementById('fileName').innerHTML = null;
    }

  }


  upload() {
    this.progressloading = true;
    console.log("working great.....");

    this.progress = 0;
    this.addForm.addControl('profile',new FormControl(null));
    this.addForm.get('profile').setValue(Number(this.data));
    console.log("all Data: ", this.addForm.value);
    const formData = new FormData();
		formData.append('avatar', this.attachmentFile);
		formData.append('data', JSON.stringify(this.addForm.value));
    this.documentProfileService.addDocument(formData).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = this.translate.instant("Successfully Uploaded");
        }
        this.messageLoading = true;
        this.progressloading = true;
        this.uploadIcon = false;
        this.modelType = true;

      },
      err => {
        this.progress = 0;
        this.message = this.translate.instant("Failed to upload");
        this.fileToReturn = undefined;
      });

  }

 

}
