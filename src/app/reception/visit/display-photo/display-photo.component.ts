import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-display-photo',
  templateUrl: './display-photo.component.html',
  styleUrls: ['./display-photo.component.scss']
})
export class DisplayPhotoComponent implements OnInit {
	@Input() photoURL;

	constructor(private translate: TranslateService,
		private cdr: ChangeDetectorRef,
		public activeModal: NgbActiveModal) { }

	ngOnInit(): void {
	}

	dismiss() {
		this.activeModal.dismiss();
		// this.activeModal.close();
	}

	imageError(el) {
		el.onerror = '';
		el.src = '../../../../assets/img/portrait/small/face-0.png';
		return true;
	}
}
