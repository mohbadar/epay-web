import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output,Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DriverService } from './../driver.service';
import { BaseService } from 'app/services/base-service';
import {TransportService} from 'app/transportation/transport.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CapturePhotoComponent } from 'app/reception/visit/capture-photo/capture-photo.component';

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.scss']
})
export class EditDriverComponent implements OnInit {

  @Output() response: EventEmitter<any> = new EventEmitter();
  @Input() visitorForm: FormGroup;
	newForm: FormGroup;
  spinners = false;
  dataLoadingFlag = true;
  data: any;
  driver:any;
  id:any;


  visitorPhoto = {
		url: '../../../../assets/img/portrait/small/face-0.png'
	}



  constructor(private router: Router, private route: ActivatedRoute,
		private spinner: NgxSpinnerService,
		private translate: TranslateService,
		private toastr: ToastrService,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private baseService: BaseService,
		private dConvert: DateConvertService,
		private translatedToastr: TranslatedToastrService,
		private authService: AuthService,
		private activeModal: NgbActiveModal,
		private driverService: DriverService,
    private transportService:TransportService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.newForm = this.fb.group({
      id:[null],
			fullName: [null],
      address:[null],
			dateOfBirth: [null],
      licenseIssueDate:[null],
      licenseExpiryDate:[null],
      licenseClass:[null],
      driverImage:[null]
		});
    this.id = this.route.snapshot.paramMap.get('id');
    this.getRecord(this.id);


  }


  initializeForm() {

	}

  ngAfterViewInit() { }

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
      this.visitorForm.get('driverImage').setValue(this.visitorPhoto.url);
    });
  }


  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if(event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getRecord(id) {
    this.dataLoadingFlag = true;
    this.spinner.show();
        this.driverService.getRecordById(id).subscribe((res: any) => {
            this.spinner.hide();
      this.data = res;
      this.driver = this.data.driver;
      this.newForm.controls['id'].setValue(res.driver.id);
      this.newForm.controls['fullName'].setValue(res.driver.fullName);
      this.newForm.controls['address'].setValue(res.driver.address);
      this.newForm.controls['dateOfBirth'].setValue(res.driver.dateOfBirth);
      this.newForm.controls['licenseIssueDate'].setValue(res.driver.licenseIssueDate);
      this.newForm.controls['licenseExpiryDate'].setValue(res.driver.licenseExpiryDate);
      this.newForm.controls['licenseClass'].setValue(res.driver.licenseClass);
      this.newForm.controls['driverImage'].setValue(res.driver.driverImage);
      console.log("DRIVER",this.data);
      this.dataLoadingFlag = false;
        }, err => {
            this.spinner.hide();
      this.dataLoadingFlag = false;
            this.translatedToastr.error("DECREE", "FETCHING_ERR_MSG");
      this.authService.checkUserLogin();
        });



  }










closeModal() {
  this.activeModal.close();
}


submitForm() {
  if (this.newForm.invalid) {
    this.translatedToastr.error("ERROR", "FORM_INVALID_MSG");
          this.driver.getElementById('newForm').classList.add('input-error');
      } else {
          this.submit();
      }
}

submit() {
  let obj = this.newForm.value;
  this.spinner.show();
  this.driverService.editRecord(this.id, obj).subscribe(res => {
  this.spinner.hide();
  this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
  this.router.navigateByUrl(`/transport/drivers`);
  }, err => {
      this.spinner.hide();
    this.translatedToastr.error("ERROR", "ERR_MSG");
    this.authService.checkUserLogin();
  });

}







}
