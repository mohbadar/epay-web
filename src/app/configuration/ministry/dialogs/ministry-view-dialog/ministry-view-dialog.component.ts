import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ministry-view-dialog',
  templateUrl: './ministry-view-dialog.component.html',
  styleUrls: ['./ministry-view-dialog.component.scss']
})
export class MinistryViewDialogComponent implements OnInit {
  @Output() ministryViewEventEmitter = new EventEmitter<Object>();
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
