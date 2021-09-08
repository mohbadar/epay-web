import { Component, OnInit, Output, Input, EventEmitter, Inject,  AfterViewInit} from "@angular/core";
import {  FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { TranslatedToastrService } from "app/services/translated-toastr.service";
import { NgxSpinnerService } from "ngx-spinner";
import { GalleryService } from "../gallery.service";

@Component({
  selector: "delete-photo",
  templateUrl: "./delete-photo.component.html",
  styleUrls: ["./delete-photo.component.scss"],
})
export class DeletePhotoComponent implements OnInit {
  @Output() photoDeleteEventEmitter = new EventEmitter<Object>();
  @Input() data;

  constructor(
    private translate: TranslateService,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService,
    private galleryService: GalleryService
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  deleteRecord() {
    const recordId = this.data;
    this.galleryService.deleteRecord(recordId).subscribe((response) => {
        this.translatedToastr.success("SUCCESS", "RECORD_DELETED_SUCCESSFULLY");
        this.spinner.hide();
        this.activeModal.close();
        this.photoDeleteEventEmitter.emit(response);
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
