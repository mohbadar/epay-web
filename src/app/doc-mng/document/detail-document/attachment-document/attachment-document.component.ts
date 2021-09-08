import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileDownloadService } from 'app/services/file-download.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentService } from '../../document.service';
import { DeleteAttachmentComponent } from './delete-attachment/delete-attachment.component';

@Component({
	selector: 'app-attachment-document',
	templateUrl: './attachment-document.component.html',
	styleUrls: ['./attachment-document.component.scss']
})
export class AttachmentDocumentComponent implements OnInit {
	@Input() docId;
	listOfAttachments = [];
	showAttachmentsList = true;
	showAddAttachmentForm = false;
	  
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
		private formBuilder: FormBuilder,
		private translatedToastr: TranslatedToastrService,
		private documentService: DocumentService,
		private changeDetector: ChangeDetectorRef,
		private modalService: NgbModal,
		private fileDownloadService: FileDownloadService,
		private spinner: NgxSpinnerService
		) { }

	ngOnInit(): void {
		console.log(this.docId);
		this.getAttachmentListByDocumentId(this.docId);
	}

	getAttachmentListByDocumentId(documentId) {
		this.documentService.getDocumentAttachments(documentId).subscribe((response: any) => {
		  console.log('res', response);
		  this.listOfAttachments = response;
		  this.changeDetector.detectChanges();
		}, (error) => {
		  console.log('Error: ', error);
		});
	  }

	downloadFile(attachmentId) {
		this.spinner.show();
		this.fileDownloadService.download(`/api/doc_mng/document-attachments/download-file/${attachmentId}`);
		this.spinner.hide();
	}

	showAttachmentListDiv() {
		this.showAddAttachmentForm = false;
		this.showAttachmentsList = true;
	}

	showCreateAttachmentFormDiv() {
		this.buildAttachmentForm();
		this.showAttachmentsList = false;
		this.showAddAttachmentForm = true;
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

	onSelectFile(event, fileType) 
	{
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

	onFormSubmit(fileType) 
    {
      if (this.attachmentForm.valid) { 
        console.log(this.filesToBeUploaded);
        const formData = new FormData();
        formData.append('file', this.filesToBeUploaded.attachment.file);
        const fileName = this.attachmentForm.value.fileName;

        this.documentService.uploadDocumentAttachment(this.docId, fileName, formData).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.filesToBeUploaded.attachment.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            if (event !== null) {
              this.translatedToastr.success("SUCCESS", "FILE_UPLOADED_SUCCESSFULLY");
			  this.getAttachmentListByDocumentId(this.docId);
              this.showAttachmentListDiv();
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

	onDeleteAttachmentModal(documentAttachmentId) {
		const modalRef = this.modalService.open(DeleteAttachmentComponent);
		modalRef.componentInstance.data = documentAttachmentId;
		modalRef.componentInstance.attachmentDeleteEventEmitter.subscribe(() => {
			this.getAttachmentListByDocumentId(this.docId);
		});
	}
  

}
