import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UploadService } from 'app/services/upload.service'
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-photo-profile',
  templateUrl: './photo-profile.component.html',
  styleUrls: ['./photo-profile.component.scss']
})
export class PhotoProfileComponent implements OnInit {

  data;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  fileName;
  loading:boolean = false;
  progressloading:boolean = false;
  messageLoading:boolean = false;
  afterOriginal:boolean = false;
  uploadIcon:boolean = false;
  modelType:boolean = false;
  fileToReturn:File;
  progress = 0;
  message = '';

  constructor(
    public activeModal: NgbActiveModal,
    private uploadService:UploadService,
    public translate:TranslateService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("profile Id: ", this.data);

  }


  base64ToFile(data, filename) {

    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.loading = true;
    this.fileName = event.target.files[0].name;
    console.log("all file: ", event.target.files[0]);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.afterOriginal = true;
    this.uploadIcon = true;
    this.fileToReturn = this.base64ToFile(
      event.base64,
      this.fileName,
    )

    console.log(this.fileName);
    console.log(this.fileToReturn);
    return this.fileToReturn;
  }

  imageLoaded(image: HTMLImageElement) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  closeModal() {
    let data;
    if(this.modelType){
       data = {type:'photo',title:'PHOTO'};
    }
    
    this.activeModal.close(data);
  }


  upload() {
    this.progressloading = true;
    console.log("cropped image: ", this.fileToReturn);
    console.log("working great.....");

    this.progress = 0;
    const formData = new FormData();
		formData.append('avatar', this.fileToReturn);
		formData.append('id',this.data);
    this.uploadService.uploadPhoto(formData).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = this.translate.instant("Successfully Uploaded");
        }
        this.messageLoading = true;
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
