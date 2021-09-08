import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-document-type',
  templateUrl: './view-document-type.component.html',
  styleUrls: ['./view-document-type.component.scss']
})
export class ViewDocumentTypeComponent implements OnInit {
  @Output() shuraViewEventEmitter = new EventEmitter<Object>();
  @Input() data;
  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    console.log(this.data, "Data")
  }


  closeModal() {
    this.activeModal.close();
}

}
