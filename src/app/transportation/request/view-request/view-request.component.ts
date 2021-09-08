
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from 'app/services/base-service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.scss']
})
export class ViewRequestComponent implements OnInit {
	@Input() requestId;
	dataLoadingFlag = true;
	data;
	request;

  constructor(private cdref: ChangeDetectorRef,
		private route: ActivatedRoute,
        public translate: TranslateService,
        // private spinner: NgxSpinnerService,
		private requestService: RequestService,
		private translatedToastr: TranslatedToastrService,
		private authService: AuthService,
		public baseService: BaseService,
		public dialogRef: NgbActiveModal,
		private modalService: NgbModal) { }

	ngOnInit(): void {
		this.dataLoadingFlag = true;
		if(!this.requestId) {
			this.requestId = this.route.snapshot.paramMap.get('id');
		}
		this.getRecord(this.requestId);
	}

	getRecord(id) {
		this.dataLoadingFlag = true;
		// this.spinner.show();
        this.requestService.getRecordById(id).subscribe((res: any) => {
            // this.spinner.hide();
			this.data = res;
			this.request = this.data.request;
			console.log(this.data);
			this.dataLoadingFlag = false;
			this.cdref.detectChanges();
        }, err => {
            // this.spinner.hide();
			this.dataLoadingFlag = false;
            this.translatedToastr.error("REQUEST", "FETCHING_ERR_MSG");
			this.authService.checkUserLogin();
			this.cdref.detectChanges();
        });
	}

	parseDateObjectAsDate(obj) {
		return this.baseService.parseDateObjectAsDate(obj);
	}

	closeModal() {
        this.dialogRef.close();
    }
}
