import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-view-qrcode',
  templateUrl: './view-qrcode.component.html',
  styleUrls: ['./view-qrcode.component.scss']
})
export class ViewQrcodeComponent implements OnInit {
	@ViewChild('qrcode') qrcode: ElementRef;
	@Input() docId;
	url = 'api/public/documents/';
	loading = true;

	constructor(private translate: TranslateService,
		private spinner: NgxSpinnerService,
		public activeModal: NgbActiveModal,
		private documentService: DocumentService,
		private router: Router,) { }

	ngOnInit(): void {
		this.url += this.docId + '/genQRCode/250/250'
		this.loading = false;
	}
	
	closeModal() {
		this.activeModal.close();
	}

	dismiss() {
		this.activeModal.dismiss();
	}

	printQRCode() {
		console.log("printing");
		let fullURL = window.location.href;
		fullURL = fullURL.replace(this.router.url, '');
		fullURL += '/' + this.url;

		var popupWin = window.open(fullURL, '_blank', 'location=yes,height=250,width=250,scrollbars=yes,status=yes');
		popupWin.print();
		popupWin.document.close();

		// var popupWin = window.open('', '_blank', 'width=300,height=300');
		// popupWin.document.open();
		// popupWin.document.write('<html><head></head><body onload="window.print()"><img style="height: 100%;width: 100%;" [src]="' + fullURL + '"></body></html>');
		// // popupWin.print();
		// popupWin.document.close();
		// // window.print();
	}

	imageError(el) {
		el.onerror = '';
		el.src = '../../../../assets/img/portrait/small/face-0.png';
		return true;
	}

}
