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
  selector: 'app-create-driver',
  templateUrl: './create-driver.component.html',
  styleUrls: ['./create-driver.component.scss']
})
export class CreateDriverComponent implements OnInit {

  @Output() response: EventEmitter<any> = new EventEmitter();
  @Input() visitorForm: FormGroup;
	newForm: FormGroup;
  spinners = false;


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

      this.initializeForm();


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

    submitForm() {
      if (this.newForm.invalid) {
        this.translatedToastr.error("ERROR", "FORM_INVALID_MSG");
              document.getElementById('newForm').classList.add('input-error');
          } else {
              this.submit();
          }
    }


	initializeForm() {
		this.newForm = this.fb.group({
			fullName: [null],
      fatherName: [null],
      address:[null],
			dateOfBirth: [null],
      licenseIssueDate:[null],
      licenseExpiryDate:[null],
      licenseClass:[null],
      driverImage:[null]


		});
	}


  closeModal() {
    this.activeModal.close();
}


  submit() {
    let obj = this.newForm.value;
    console.log("date", obj);
    this.spinner.show();
    this.driverService.addRecord(obj).subscribe(res => {
  console.log(res);
        this.spinner.hide();
  this.response.emit(res);
  this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
  this.router.navigateByUrl(`/transport/drivers`);
  this.closeModal();
    }, err => {
        this.spinner.hide();
  this.translatedToastr.error("ERROR", "ERR_MSG");
  this.authService.checkUserLogin();
    });
}


}
