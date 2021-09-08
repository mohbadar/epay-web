import { Component, OnInit, Output, Input, EventEmitter, Inject,  AfterViewInit} from "@angular/core";
import {  FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { MinistryService } from "app/services/ministry.service";
import { AuthorityService } from "app/services/authority.service";
import { TranslatedToastrService } from "app/services/translated-toastr.service";

@Component({
  selector: "authority-delete-dialog",
  templateUrl: "./authority-delete-dialog.component.html",
  styleUrls: ["./authority-delete-dialog.component.scss"],
})
export class AuthorityDeleteDialogComponent implements OnInit {
  @Output() authorityDeleteEventEmitter = new EventEmitter<Object>();
  @Input() data;

  constructor(
    private authorityService: AuthorityService,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  deleteRecord() {
    const recordId = this.data;
    this.authorityService.deleteRecord(recordId).subscribe((response) => {
        this.translatedToastr.success("SUCCESS", "RECORD_DELETED_SUCCESSFULLY");
        this.spinner.hide();
        this.activeModal.close();
        this.authorityDeleteEventEmitter.emit(response);
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
