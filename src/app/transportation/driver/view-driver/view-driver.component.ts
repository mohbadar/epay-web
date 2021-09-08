import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from 'app/services/base-service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DriverService } from '../driver.service';

@Component({
  selector: 'app-view-driver',
  templateUrl: './view-driver.component.html',
  styleUrls: ['./view-driver.component.scss']
})
export class ViewDriverComponent implements OnInit {

  driverId;
	dataLoadingFlag = true;
	data;
	driver;


  constructor(private cdref: ChangeDetectorRef,
		private route: ActivatedRoute,
        public translate: TranslateService,
        private spinner: NgxSpinnerService,
		private driverService: DriverService,
		private translatedToastr: TranslatedToastrService,
		private authService: AuthService,
		public baseService: BaseService,
		private modalService: NgbModal) { }

  ngOnInit(): void {
    this.driverId = this.route.snapshot.paramMap.get('id');
		this.getRecord(this.driverId);
  }


  getRecord(id) {
		this.dataLoadingFlag = true;
		this.spinner.show();
        this.driverService.getRecordById(id).subscribe((res: any) => {
            this.spinner.hide();
			this.data = res;
			this.driver = this.data.driver;
			console.log(this.data);
			this.dataLoadingFlag = false;
        }, err => {
            this.spinner.hide();
			this.dataLoadingFlag = false;
            this.translatedToastr.error("DECREE", "FETCHING_ERR_MSG");
			this.authService.checkUserLogin();
        });
	}

  parseDateObjectAsDate(obj) {
		return this.baseService.parseDateObjectAsDate(obj);
	}




}
