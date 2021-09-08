import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupService } from '../../group.service';

@Component({
  selector: 'group-view-dialog',
  templateUrl: './group-view-dialog.component.html',
  styleUrls: ['./group-view-dialog.component.scss']
})
export class GroupViewDialogComponent implements OnInit {
  @Output() toggleModal = new EventEmitter<Object>();
  @Input() data;

  constructor(
    private groupService: GroupService,
    private activeModal: NgbActiveModal
    ) { }

  ngOnInit() {
    
  }

  closeModal() {
    this.activeModal.close();
  }
}
