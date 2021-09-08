import { Component, OnInit, Output, Input, EventEmitter, Inject,  AfterViewInit} from "@angular/core";
import {  FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { DocumentService } from "app/doc-mng/document/document.service";
import { TranslatedToastrService } from "app/services/translated-toastr.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "delete-attachment",
  templateUrl: "./delete-attachment.component.html",
  styleUrls: ["./delete-attachment.component.scss"],
})
export class DeleteAttachmentComponent implements OnInit {
  @Output() attachmentDeleteEventEmitter = new EventEmitter<Object>();
  @Input() data;

  constructor(
    private translate: TranslateService,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService,
    private documentService: DocumentService
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  deleteRecord() {
    const recordId = this.data;
    this.documentService.deleteDocumentAttachment(recordId).subscribe((response) => {
        this.translatedToastr.success("SUCCESS", "RECORD_DELETED_SUCCESSFULLY");
        this.spinner.hide();
        this.activeModal.close();
        this.attachmentDeleteEventEmitter.emit(response);
      }, (error) => {
        this.spinner.hide();
        this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_DELETING_RECORD");
        console.log(error);
      })
  }


  closeModal() {
    this.activeModal.close();
  }
}
