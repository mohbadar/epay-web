import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'commission-view-dialog',
  templateUrl: './commission-view-dialog.component.html',
  styleUrls: ['./commission-view-dialog.component.scss']
})
export class CommissionViewDialogComponent implements OnInit {
  @Output() commissionViewEventEmitter = new EventEmitter<Object>();
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
