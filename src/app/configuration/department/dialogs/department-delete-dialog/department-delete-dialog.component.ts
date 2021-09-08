import { Component, OnInit, Output, Input, EventEmitter, Inject,  AfterViewInit} from "@angular/core";
import {  FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { MinistryService } from "app/services/ministry.service";
import { DepartmentService } from "./../../department.service";
import { TranslatedToastrService } from "app/services/translated-toastr.service";

@Component({
  selector: "department-delete-dialog",
  templateUrl: "./department-delete-dialog.component.html",
  styleUrls: ["./department-delete-dialog.component.scss"],
})
export class DepartmentDeleteDialogComponent implements OnInit {
  @Output() departmentDeleteEventEmitter = new EventEmitter<Object>();
  @Input() data;

  constructor(
    private departmentService: DepartmentService,
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
    this.departmentService.deleteRecord(recordId).subscribe((response) => {
        this.translatedToastr.success("SUCCESS", "RECORD_DELETED_SUCCESSFULLY");
        this.spinner.hide();
        this.activeModal.close();
        this.departmentDeleteEventEmitter.emit(response);
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
