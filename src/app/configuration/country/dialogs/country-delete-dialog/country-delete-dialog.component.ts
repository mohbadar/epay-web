import { Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { TranslatedToastrService } from "app/services/translated-toastr.service";
import { CountryService } from "app/services/country.service";

@Component({
  selector: "country-delete-dialog",
  templateUrl: "./country-delete-dialog.component.html",
  styleUrls: ["./country-delete-dialog.component.scss"],
})
export class CountryDeleteDialogComponent implements OnInit {
  @Output() countryDeleteEventEmitter = new EventEmitter<Object>();
  @Input() data;

  constructor(
    private countrySerivce: CountryService,
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
    this.countrySerivce.deleteCountry(recordId).subscribe((response) => {
        this.translatedToastr.success("SUCCESS", "RECORD_DELETED_SUCCESSFULLY");
        this.spinner.hide();
        this.activeModal.close();
        this.countryDeleteEventEmitter.emit(response);
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
