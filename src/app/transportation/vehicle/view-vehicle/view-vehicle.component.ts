import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from 'app/services/base-service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.scss']
})
export class ViewVehicleComponent implements OnInit {

  vehicleId;
	dataLoadingFlag = true;
	data;
	vehicle;

  constructor(private cdref: ChangeDetectorRef,
		private route: ActivatedRoute,
        public translate: TranslateService,
        private spinner: NgxSpinnerService,
		private vehicleService: VehicleService,
		private translatedToastr: TranslatedToastrService,
		private authService: AuthService,
		public baseService: BaseService,
		private modalService: NgbModal) { }

    ngOnInit(): void {
      this.vehicleId = this.route.snapshot.paramMap.get('id');
      this.getRecord(this.vehicleId);
    }

    getRecord(id) {
      this.dataLoadingFlag = true;
      this.spinner.show();
          this.vehicleService.getRecordById(id).subscribe((res: any) => {
              this.spinner.hide();
        this.data = res;
        this.vehicle = this.data.vehicle;
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
