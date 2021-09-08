import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-document-execution-type',
  templateUrl: './view-document-execution-type.component.html',
  styleUrls: ['./view-document-execution-type.component.scss']
})
export class ViewDocumentExecutionTypeComponent implements OnInit {
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
