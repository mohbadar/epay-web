import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output,Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { VehicleService } from './../vehicle.service';
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
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.scss']
})
export class CreateVehicleComponent implements OnInit {
  @Output() response: EventEmitter<any> = new EventEmitter();
  @Input() visitorForm: FormGroup;
	newForm: FormGroup;
  spinners = false;

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
  private vehicleService: VehicleService,
  private transportService:TransportService,
  private modalService: NgbModal) { }

  ngOnInit(): void {

    this.initializeForm();

  }



  initializeForm() {
		this.newForm = this.fb.group({
			vehicleClass: [null],
      manufacturer:[null],
			model: [null],
      type:[null],
      year:[null],
      colour:[null],
      plateNo:[null]


		});
	}


  closeModal() {
    this.activeModal.close();
}



submitForm() {
  if (this.newForm.invalid) {
    this.translatedToastr.error("ERROR", "FORM_INVALID_MSG");
          document.getElementById('newForm').classList.add('input-error');
      } else {
          this.submit();
      }
}

  submit() {
    let obj = this.newForm.value;
    console.log("date", obj);
    this.spinner.show();
    this.vehicleService.addRecord(obj).subscribe(res => {
  console.log(res);
        this.spinner.hide();
  this.response.emit(res);
  this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
  this.router.navigateByUrl(`/transport/vehicles`);
  this.closeModal();
    }, err => {
        this.spinner.hide();
  this.translatedToastr.error("ERROR", "ERR_MSG");
  this.authService.checkUserLogin();
    });
}







}
