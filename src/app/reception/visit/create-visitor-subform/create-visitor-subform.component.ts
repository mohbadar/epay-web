import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { VisitService } from '../visit.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from '../../../services/base-service';
import { CapturePhotoComponent } from '../capture-photo/capture-photo.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'visit-create-visitor-subform',
  templateUrl: './create-visitor-subform.component.html',
  styleUrls: ['./create-visitor-subform.component.scss'],
})
export class CreateVisitorSubformComponent implements OnInit {
	// @Input() form: FormGroup;
	@Input() visitorForm: FormGroup;
	@Input() index: number;
	@Input() formSubmitAttempt;

	visitorPhoto = {
		url: '../../../../assets/img/portrait/small/face-0.png'
	}

	organizationTypes$
	organizations$;


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

	fetchEssentialData() {
		this.organizationTypes$ = this.baseService.getOrgTypeList();
		this.organizations$ = this.baseService.getOrgList();
	}

	keyPress(event: any) {
		const pattern = /[0-9\+\-\ ]/;
		let inputChar = String.fromCharCode(event.charCode);
		if(event.keyCode != 8 && !pattern.test(inputChar)) {
			event.preventDefault();
		}
	}

	getError(formControlName: string) {
		if (formControlName) {
			if ((!this.visitorForm.get(formControlName).valid && this.visitorForm.get(formControlName).touched) ||
				(this.visitorForm.get(formControlName).untouched && this.formSubmitAttempt)
			) {
				let error_msg = '';
				// return this.newForm.errors[formControlName];
				let errors = this.visitorForm.get(formControlName).errors;
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
		el.src = '../../../../assets/img/portrait/small/face-0.png';
		return true;
	}

	changePhoto() {
		console.log("changed photo called");
		const modalRef = this.modalService.open(CapturePhotoComponent, {
			centered: true, size: 'md', backdrop:  true, keyboard: false
		});

		modalRef.componentInstance.capturePhoto.subscribe((photo) => {
			console.log(photo);
			this.visitorPhoto.url = photo.imageAsDataUrl;
			this.visitorForm.get('photo').setValue(this.visitorPhoto.url);
		});
	}

	// getData(){
	// 	console.log('create visit called ');
	// 	this.visitorService.getRecordList().subscribe(res=>{
	// 	console.log('res', res);

	// 	})
	// }

 



	// uploadImage(){
	// 	let obj = {image:this.images, name:'visitor_'+ this.date +"_ "+ this.date.getMilliseconds()};
	// 	this.visitService.uploadImage(obj).subscribe(res=>{
	// 		this.uploadedImages.push(this.images);
	// 		this.images = null;
	// 	}), err => {

	// 		console.log("error in recording: ", err);

	// 	};
	// }
}
