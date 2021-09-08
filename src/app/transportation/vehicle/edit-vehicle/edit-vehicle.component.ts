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
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss']
})
export class EditVehicleComponent implements OnInit {

  @Output() response: EventEmitter<any> = new EventEmitter();
  @Input() visitorForm: FormGroup;
	newForm: FormGroup;
  spinners = false;
  dataLoadingFlag = true;
  data: any;
  vehicle:any;
  id:any;



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
    this.newForm = this.fb.group({
      id:[null],
      vehicleClass: [null],
      manufacturer:[null],
			model: [null],
      type:[null],
      year:[null],
      colour:[null],
      plateNo:[null]
		});
    this.id = this.route.snapshot.paramMap.get('id');
    this.getRecord(this.id);


  }


  getRecord(id) {
    this.dataLoadingFlag = true;
    this.spinner.show();
        this.vehicleService.getRecordById(id).subscribe((res: any) => {
            this.spinner.hide();
      this.data = res;
      this.vehicle = this.data.vehicle;
      this.newForm.controls['id'].setValue(res.vehicle.id);
      this.newForm.controls['vehicleClass'].setValue(res.vehicle.vehicleClass);
      this.newForm.controls['manufacturer'].setValue(res.vehicle.manufacturer);
      this.newForm.controls['model'].setValue(res.vehicle.model);
      this.newForm.controls['type'].setValue(res.vehicle.type);
      this.newForm.controls['year'].setValue(res.vehicle.vehicle);
      this.newForm.controls['colour'].setValue(res.vehicle.colour);
      this.newForm.controls['plateNo'].setValue(res.vehicle.plateNo);
      console.log("DRIVER",this.data);
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
            this.vehicle.getElementById('newForm').classList.add('input-error');
        } else {
            this.submit();
        }
  }

  submit() {
    let obj = this.newForm.value;
    this.spinner.show();
    this.vehicleService.editRecord(this.id, obj).subscribe(res => {
    this.spinner.hide();
    this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
    this.router.navigateByUrl(`/transport/vehicles`);
    }, err => {
        this.spinner.hide();
      this.translatedToastr.error("ERROR", "ERR_MSG");
      this.authService.checkUserLogin();
    });

  }


}
