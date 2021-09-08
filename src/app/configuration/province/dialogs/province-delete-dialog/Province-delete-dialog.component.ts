import { Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { TranslatedToastrService } from "app/services/translated-toastr.service";
import { ProvinceService } from "app/services/province.service";

@Component({
  selector: "province-delete-dialog",
  templateUrl: "./province-delete-dialog.component.html",
  styleUrls: ["./province-delete-dialog.component.scss"],
})
export class ProvinceDeleteDialogComponent implements OnInit {
  @Output() provinceDeleteEventEmitter = new EventEmitter<Object>();
  @Input() data;

  constructor(
    private provinceSerivce: ProvinceService,
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
    this.provinceSerivce.deleteProvince(recordId).subscribe((response) => {
        this.translatedToastr.success("SUCCESS", "RECORD_DELETED_SUCCESSFULLY");
        this.spinner.hide();
        this.activeModal.close();
        this.provinceDeleteEventEmitter.emit(response);
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
