import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'district-view-dialog',
  templateUrl: './district-view-dialog.component.html',
  styleUrls: ['./district-view-dialog.component.scss']
})
export class DistrictViewDialogComponent implements OnInit {
  @Output() districtViewEventEmitter = new EventEmitter<Object>();
  @Input() data;

  constructor(
    private activeModal: NgbActiveModal
    ) { }

  ngOnInit() {
    console.log(this.data, "Data")
  }

  closeModal() {
    this.activeModal.close();
  }

}
