import { HttpEventType, HttpResponse } from "@angular/common/http";
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { TranslatedToastrService } from "app/services/translated-toastr.service";
import { NgxSpinnerService } from "ngx-spinner";
import { GalleryService } from '../gallery.service';

@Component({
    selector: "edit-photo",
    templateUrl: "./edit-photo.component.html",
    styleUrls: ["./edit-photo.component.scss"],
})
export class EditPhotoComponent implements OnInit {
    @Output() editPhotoEventEmitter = new EventEmitter<Object>();
    @Input() fileName;
    @Input() id;
    showEditForm;
    imageToShow;

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
        private translatedToastr: TranslatedToastrService,
        private changeDetector: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.fetchImageById(this.id);
        this.createImageLink();
    }

    fetchImageById(id) {
        this.galleryService.getRecordById(this.id).subscribe((response: any) => {
            console.log('res', response);
            this.changeDetector.detectChanges();
            this.buildAttachmentForm(response);
            this.showEditForm = true;
        }, (error) => {
            console.log('Error: ', error);
        });
    }

    buildAttachmentForm(data) {
        this.attachmentForm = this.formBuilder.group({
            fileName: [data.name, Validators.required],
            attachment: [null]
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
            this.createImageFromBlob(selectedFileInput.files[0]);
        }
    }

    onFormSubmit() {
        if (this.attachmentForm.valid) {
            console.log(this.filesToBeUploaded);
            const formData = new FormData();
            if (this.filesToBeUploaded.attachment.file) {
                formData.append('file', this.filesToBeUploaded.attachment.file);
            }

            const fileName = this.attachmentForm.value.fileName;

            this.galleryService.updateImage(this.id, fileName, formData).subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.filesToBeUploaded.attachment.progress = Math.round(100 * event.loaded / event.total);
                } else if (event instanceof HttpResponse) {
                    if (event !== null) {
                        this.translatedToastr.success("SUCCESS", "FILE_UPLOADED_SUCCESSFULLY");
                        this.editPhotoEventEmitter.emit(event);
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

    createImageFromBlob(image: Blob) {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            this.imageToShow = reader.result;
        }, false);

        if (image) {
            reader.readAsDataURL(image);
        }
    }

    createImageLink() {
        this.galleryService.getImage(this.id).subscribe((data) => {
            this.createImageFromBlob(data);
        }, (error) => {
            console.log(error);
        });
    }
}
