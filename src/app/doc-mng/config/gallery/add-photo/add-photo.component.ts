import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { TranslatedToastrService } from "app/services/translated-toastr.service";
import { NgxSpinnerService } from "ngx-spinner";
import { GalleryService } from '../gallery.service';

@Component({
    selector: "add-photo",
    templateUrl: "./add-photo.component.html",
    styleUrls: ["./add-photo.component.scss"],
})
export class AddPhotoComponent implements OnInit {
    @Output() addPhotoEventEmitter = new EventEmitter<Object>();
    @Input() documentGalleryId;

    progress = 50;
    attachmentFileNames = {
        attachment: {
            name: null,
            type: null // can be local, server or null
        }
    };

    filesToBeUploaded = {
        attachment: {
            file: null, // File to be uploaded, null if no file is selected
            progress: 0 // for upload loading bar
        }
    };
    attachmentForm: FormGroup;

    constructor(
        public activeModal: NgbActiveModal,
        // public userService: UserService,
        private formBuilder: FormBuilder,
        private translate: TranslateService,
        private spinner: NgxSpinnerService,
        private galleryService: GalleryService,
        private translatedToastr: TranslatedToastrService
    ) { }

    ngOnInit() {
        console.log(this.documentGalleryId);
        this.buildAttachmentForm();
    }

    buildAttachmentForm() {
        this.attachmentForm = this.formBuilder.group({
            fileName: [null, Validators.required],
            attachment: [null, Validators.required]
        });
        this.attachmentFileNames = {
            attachment: {
                name: null,
                type: null // can be local, server or null
            }
        };

        this.filesToBeUploaded = {
            attachment: {
                file: null, // File to be uploaded, null if no file is selected
                progress: 0 // for upload loading bar
            }
        };
        this.progress = 0;
    }

    onSelectFile(event, fileType) {
        const selectedFileInput = event.target as HTMLInputElement;
        if (selectedFileInput.files && selectedFileInput.files[0]) {

            this.attachmentFileNames[fileType].name = selectedFileInput.files[0].name;
            this.attachmentFileNames[fileType].type = 'local'; // to show upload button

            console.log(selectedFileInput);

            // Update the object of files to be uploaded
            this.filesToBeUploaded[fileType].file = selectedFileInput.files[0];
            this.filesToBeUploaded[fileType].progress = 0;
        }
    }

    onFormSubmit() {
        if (this.attachmentForm.valid) { 
            console.log(this.filesToBeUploaded);
            const formData = new FormData();
            formData.append('file', this.filesToBeUploaded.attachment.file);
            const fileName = this.attachmentForm.value.fileName;
    
            this.galleryService.uploadImage(fileName, formData).subscribe(event => {
              if (event.type === HttpEventType.UploadProgress) {
                this.filesToBeUploaded.attachment.progress = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {
                if (event !== null) {
                  this.translatedToastr.success("SUCCESS", "FILE_UPLOADED_SUCCESSFULLY");
                  this.addPhotoEventEmitter.emit(event);
                  this.closeModal();
                } else {
                  this.progress = 0;
                  this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_IN_UPLOADING_THE_FILE");
                  console.log(event);
                }
              }
            },
            (error) => {
              this.progress = 0;
              console.log(error);
              this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_IN_UPLOADING_THE_FILE");
            });
          }
          if (this.attachmentForm.invalid) {
              // To display errors below forms
              Object.keys(this.attachmentForm.controls).forEach(field => {
                const control = this.attachmentForm.get(field);
                control.markAsTouched({ onlySelf: true });
              });
          }
    }

    closeModal() {
        this.activeModal.close();
    }
}
