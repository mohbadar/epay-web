import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'province-view-dialog',
  templateUrl: './province-view-dialog.component.html',
  styleUrls: ['./province-view-dialog.component.scss']
})
export class ProvinceViewDialogComponent implements OnInit {
  @Output() provinceViewEventEmitter = new EventEmitter<Object>();
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
