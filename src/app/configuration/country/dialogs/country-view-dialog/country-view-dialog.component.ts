import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'country-view-dialog',
  templateUrl: './country-view-dialog.component.html',
  styleUrls: ['./country-view-dialog.component.scss']
})
export class CountryViewDialogComponent implements OnInit {
  @Output() countryViewEventEmitter = new EventEmitter<Object>();
  @Input() data;

  constructor(
    private activeModal: NgbActiveModal
    ) { }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }

}
