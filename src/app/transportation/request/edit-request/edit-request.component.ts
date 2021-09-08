import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { RequestService } from './../request.service';
import { BaseService } from 'app/services/base-service';
import {TransportService} from 'app/transportation/transport.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.scss']
})
export class EditRequestComponent implements OnInit {
  @Output() response: EventEmitter<any> = new EventEmitter();
  newForm: FormGroup;
	formSubmitAttempt = false;
  departments$;
  documenttypes$;
  currentDate;
	currentTime;
  dataLoadingFlag = true;
  data: any;
  id:any;
  request:any;
  drivers$;
  vehicles$;
  spinners = false;
  statusTypes$ = [
		{ "id": "NEW","name": "NEW"},
		{ "id": "PROCESSED","name": "PROCESSED"},
    {"id":"REJECTED" , "name":"REJECTED"}
	];

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
		private requestService: RequestService,
    private transportService:TransportService,) { }

  ngOnInit(): void {
    this.currentDate = this.dConvert.convertToDariDate(this.baseService.getTodayDate());
		this.currentTime = this.baseService.getCurrentTime();
		this.newForm = this.fb.group({
      id:[],
			source: [null],
			destination: [null],
      passengersInfo:[null],
      requestDate: [null],
			requestTime: [null],
      details:[null],
      pickupDate: [null],
			pickupTime: [null],
      returneeDate:[null],
      returneeTime:[null],
      status:[null],
      departmentId:[null],
      driverId:[null],
      vehicleId:[null],

    });

    this.fetchEssentialData();
    this.id = this.route.snapshot.paramMap.get('id');
    this.getRecord(this.id);


  }

  fetchEssentialData() {
    this.departments$ = this.baseService.getDepartmentList();
    this.drivers$=this.transportService.getDrivers();
     this.vehicles$=this.transportService.getVehicles();

 }

 closeModal() {
  this.activeModal.close();
}


 getRecord(id) {
  this.dataLoadingFlag = true;

  this.spinner.show();
      this.requestService.getRecordById(id).subscribe((res: any) => {
          this.spinner.hide();
    this.data = res;
    this.request = this.data.document;
    this.newForm.controls['id'].setValue(res.request.id);
    this.newForm.controls['departmentId'].setValue(res.request.departmentId);
    console.log('RECORD',res.request.departmentId);
    //this.newForm.get('departmentId').setValue('departmentId');
    this.newForm.controls['source'].setValue(res.request.source);
    this.newForm.controls['destination'].setValue(res.request.destination);
    this.newForm.controls['passengersInfo'].setValue(res.request.passengersInfo);
    this.newForm.controls['requestDate'].setValue(res.request.requestDate);
    this.newForm.controls['requestTime'].setValue(res.request.requestTime);
    this.newForm.controls['pickupDate'].setValue(res.request.pickupDate);
    this.newForm.controls['pickupTime'].setValue(res.request.pickupTime);
    this.newForm.controls['returneeDate'].setValue(res.request.returneeDate);
    this.newForm.controls['returneeTime'].setValue(res.request.returneeTime);
    this.newForm.controls['status'].setValue(res.request.status);
    this.newForm.controls['driverId'].setValue(res.request.driverId);
    this.newForm.controls['vehicleId'].setValue(res.request.vehicleId);

    console.log("REQUEST",this.data);
    this.dataLoadingFlag = false;
      }, err => {
          this.spinner.hide();
    this.dataLoadingFlag = false;
          this.translatedToastr.error("DECREE", "FETCHING_ERR_MSG");
    this.authService.checkUserLogin();
      });
}

submitForm() {
  if (this.newForm.invalid) {
    this.translatedToastr.error("ERROR", "FORM_INVALID_MSG");
          this.request.getElementById('newForm').classList.add('input-error');
      } else {
          this.submit();
      }
}

submit() {
  let obj = this.newForm.value;
  this.spinner.show();
  this.requestService.editRecord(this.id, obj).subscribe(res => {
  this.spinner.hide();
  this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
  this.router.navigateByUrl(`/transport/requests`);
  }, err => {
      this.spinner.hide();
    this.translatedToastr.error("ERROR", "ERR_MSG");
    this.authService.checkUserLogin();
  });

}

}
