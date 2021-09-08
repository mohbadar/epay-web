import { Component, OnInit, Output, Input, EventEmitter, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from '../../role.service';

@Component({
  selector: 'role-view-dialog',
  templateUrl: './role-view-dialog.component.html',
  styleUrls: ['./role-view-dialog.component.scss']
})
export class RoleViewDialogComponent implements OnInit {

  @Output()
  toggleModal = new EventEmitter<Object>();
  @Input() data;

  constructor(
    private roleService: RoleService,
    private activeModal: NgbActiveModal
    ) { }

  ngOnInit() { }

  closeModal() {
    this.activeModal.close();
  }
}
