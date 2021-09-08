import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentService } from './../../document.service';

@Component({
  selector: 'app-document-print-preview',
  templateUrl: './print-preview.component.html',
  styleUrls: ['./print-preview.component.scss']
})
export class PrintPreviewComponent implements OnInit {
    @Input() document;

	constructor(
        private documentService: DocumentService,
		private modalService: NgbModal,
        private activeModal: NgbActiveModal
		) { }

	ngOnInit(): void {
	}

    closeModal() {
        this.activeModal.close();
    }

	print(){
		this.documentService.printDocument(this.document.id);
	}

}
