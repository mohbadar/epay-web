import { Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { CommissionService } from "app/services/commission.service";
import { TranslatedToastrService } from "app/services/translated-toastr.service";

@Component({
  selector: "commission-delete-dialog",
  templateUrl: "./commission-delete-dialog.component.html",
  styleUrls: ["./commission-delete-dialog.component.scss"],
})
export class CommissionDeleteDialogComponent implements OnInit {
  @Output() commissionDeleteEventEmitter = new EventEmitter<Object>();
  @Input() data;

  constructor(
    private commissionSerivce: CommissionService,
    private translate: TranslateService,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  deleteRecord() {
    const recordId = this.data;
    this.commissionSerivce.deleteRecord(recordId).subscribe((response) => {
        this.translatedToastr.success("SUCCESS", "RECORD_DELETED_SUCCESSFULLY");
        this.spinner.hide();
        this.activeModal.close();
        this.commissionDeleteEventEmitter.emit(response);
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
