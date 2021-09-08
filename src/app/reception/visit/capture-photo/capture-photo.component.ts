import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { VisitService } from '../visit.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from './../../../services/base-service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-capture-photo',
  templateUrl: './capture-photo.component.html',
  styleUrls: ['./capture-photo.component.scss'],
})
export class CapturePhotoComponent implements OnInit {
	@Output() capturePhoto: EventEmitter<any> = new EventEmitter();
	
	images: any;
	spinners = false;
	uploadedImages: Array<any>;

	date = new Date();
	currentDateTime;

	constructor(private router: Router,
		private translate: TranslateService,
		private cdr: ChangeDetectorRef,
		public activeModal: NgbActiveModal) { }

	ngOnInit(): void {

	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.cdr.detectChanges();
		}, 100);
	}

	dismiss() {
		this.activeModal.dismiss();
		// this.activeModal.close();
	}

	// toggle webcam on/off
	public showWebcam = true;
	// latest snapshot
	public webcamImage: WebcamImage = null;
	// webcam snapshot trigger
	private trigger: Subject<void> = new Subject<void>();
	// switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
	private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

	public allowCameraSwitch = true;
	public multipleWebcamsAvailable = false;
	

	triggerSnapshot(): void {
		this.trigger.next();
	}

	public toggleWebcam(): void {
		this.showWebcam = !this.showWebcam;
	}

	public showNextWebcam(directionOrDeviceId: boolean|string): void {
		// true => move forward through devices
		// false => move backwards through devices
		// string => move to device with given deviceId
		this.nextWebcam.next(directionOrDeviceId);
	}

	public handleImage(webcamImage: WebcamImage): void {
		console.info('received webcam image', webcamImage);
		this.webcamImage = webcamImage;
		this.images = webcamImage.imageAsBase64;
		this.capturePhoto.emit(this.webcamImage);
	}

	public get triggerObservable(): Observable<void> {
		return this.trigger.asObservable();
	}
	
	public get nextWebcamObservable(): Observable<boolean|string> {
		return this.nextWebcam.asObservable();
	}
}
