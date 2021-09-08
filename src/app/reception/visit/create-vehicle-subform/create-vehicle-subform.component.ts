import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from 'app/services/base-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { CapturePhotoComponent } from '../capture-photo/capture-photo.component';
import { VisitService } from '../visit.service';

@Component({
  selector: 'visit-create-vehicle-subform',
  templateUrl: './create-vehicle-subform.component.html',
  styleUrls: ['./create-vehicle-subform.component.scss']
})
export class CreateVehicleSubformComponent implements OnInit {
	// @Input() form: FormGroup;
	@Input() vehicleForm: FormGroup;
	@Input() index: number;
	@Input() formSubmitAttempt;

	vehiclePhoto = {
		url: '../../../../assets/img/portrait/small/car-0.png'
	}

	
	// newForm: FormGroup;

	images: any;
	spinners = false;
	profileInput$ = new Subject<string>();
	profiles$: Observable<any>;
	uploadedImages: Array<any>;

	date = new Date();
	currentDateTime;

	constructor(private router: Router,
		private spinner: NgxSpinnerService,
		private visitorService: VisitService,
		private translate: TranslateService,
		private toastr: ToastrService,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private visitService: VisitService,
		private baseService: BaseService,
		private modalService: NgbModal) { }

	ngOnInit(): void { }

	ngAfterViewInit() { }

	getError(formControlName: string) {
		if (formControlName) {
			if ((!this.vehicleForm.get(formControlName).valid && this.vehicleForm.get(formControlName).touched) ||
				(this.vehicleForm.get(formControlName).untouched && this.formSubmitAttempt)
			) {
				let error_msg = '';
				// return this.newForm.errors[formControlName];
				let errors = this.vehicleForm.get(formControlName).errors;
				if(errors && errors.required) {
					error_msg += this.translate.instant('FIELD_IS_REQUIRED');
				}
				return error_msg;
			}
			return;
		}
	}

	imageError(el) {
		el.onerror = '';
		el.src = '../../../../assets/img/portrait/small/car-0.png';
		return true;
	}

	changePhoto() {
		console.log("changed photo called");
		const modalRef = this.modalService.open(CapturePhotoComponent, {
			centered: true, size: 'md', backdrop:  true, keyboard: false
		});

		modalRef.componentInstance.capturePhoto.subscribe((photo) => {
			console.log(photo);
			this.vehiclePhoto.url = photo.imageAsDataUrl;
			this.vehicleForm.get('photo').setValue(this.vehiclePhoto.url);
		})
	}

	// getData(){
	// 	console.log('create visit called ');
	// 	this.visitorService.getRecordList().subscribe(res=>{
	// 	console.log('res', res);

	// 	})
	// }

}
