import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'job-view-dialog',
  templateUrl: './job-view-dialog.component.html',
  styleUrls: ['./job-view-dialog.component.scss']
})
export class JobViewDialogComponent implements OnInit {
  @Output() jobViewEventEmitter = new EventEmitter<Object>();
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
