import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from 'app/services/base-service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DisplayPhotoComponent } from '../display-photo/display-photo.component';
import { VisitService } from '../visit.service';

@Component({
  selector: 'app-view-visit',
  templateUrl: './view-visit.component.html',
  styleUrls: ['./view-visit.component.scss']
})
export class ViewVisitComponent implements OnInit {
	data: any;
	visit: any;
	visitors: any;
	vehicles: any;
	visitId;
	dataLoadingFlag = true;

	constructor(private cdref: ChangeDetectorRef,
		private route: ActivatedRoute,
        public translate: TranslateService,
        private spinner: NgxSpinnerService,
		private visitService: VisitService,
		private translatedToastr: TranslatedToastrService,
		private authService: AuthService,
		public baseService: BaseService,
		private modalService: NgbModal) { }

	ngOnInit(): void {
		this.visitId = this.route.snapshot.paramMap.get('id');
		this.getRecord(this.visitId);
	}

	getRecord(id) {
		this.dataLoadingFlag = true;
		this.spinner.show();
        this.visitService.getRecordById(id).subscribe((res: any) => {
            this.spinner.hide();
			this.data = res;
			this.visit = this.data.visit;
			this.visitors = this.data.visitors;
			this.vehicles = this.data.vehicles;
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

	imageError(el) {
		el.onerror = '';
		el.src = '../../../../assets/img/portrait/small/face-0.png';
		return true;
	}

	vehicleImageError(el) {
		el.onerror = '';
		el.src = '../../../../assets/img/portrait/small/car-0.png';
		return true;
	}

	displayPhoto(type, id) {
		console.log("clicked to display photo");
		const modalRef = this.modalService.open(DisplayPhotoComponent, {
			centered: true, size: 'md', backdrop:  true, keyboard: false
		});

		let url = ""
		if(type == "VEHICLE") {
			url = 'api/public/vehicle/' + id + '/photo'
		} else {
			url = 'api/public/visitor/' + id + '/photo'
		}

		
		modalRef.componentInstance.photoURL = url;
	}
}
