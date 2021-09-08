import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'authority-view-dialog',
  templateUrl: './authority-view-dialog.component.html',
  styleUrls: ['./authority-view-dialog.component.scss']
})
export class AuthorityViewDialogComponent implements OnInit {
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
