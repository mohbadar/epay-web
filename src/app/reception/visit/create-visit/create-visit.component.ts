import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { VisitService } from '../visit.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from './../../../services/base-service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { DateConvertService } from 'app/services/date-convert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelUploadComponent } from '../excel-upload/excel-upload.component';

@Component({
  selector: 'app-create-visit',
  templateUrl: './create-visit.component.html',
  styleUrls: ['./create-visit.component.scss'],
})
export class CreateVisitComponent implements OnInit {
	newForm: FormGroup;
	isSchedule = false;

	images: any;
	tazkira = true;
	card = false;
	spinners = false;
	profileInput$ = new Subject<string>();
	profiles$: Observable<any>;
	uploadedImages: Array<any>;

	date = new Date();
	currentDateTime;
	showVehicleInfo = false;
	formSubmitAttempt = false;

	departments$;
	currentDate;
	currentTime;
	minDate;
	visitCategories$ = [
		{ "id": "VIP","name": "VIP"},
		{ "id": "NORMAL","name": "NORMAL"},
	];
	visitTypes$ = [
		{ "id": "OFFICIAL","name": "OFFICIAL"},
		{ "id": "UNOFFICIAL","name": "UNOFFICIAL"},
	];

	constructor(private router: Router, private route: ActivatedRoute,
		private spinner: NgxSpinnerService,
		private translate: TranslateService,
		private toastr: ToastrService,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private visitService: VisitService,
		private baseService: BaseService,
		private dConvert: DateConvertService,
		private translatedToastr: TranslatedToastrService,
		private authService: AuthService,
		private modalService: NgbModal) { }

	ngOnInit(): void {
		if(this.route.snapshot.url[1].path == "schedules") {
			this.isSchedule = true;
			console.log("Schedule");
		}

		const current = new Date();
		this.minDate = {
			year: current.getFullYear(),
			month: current.getMonth() + 1,
			day: current.getDate()
		}
		
		this.initializeForm();
		this.fetchEssentialData();
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.cdr.detectChanges();
		}, 100);
	}

	initializeForm() {
		this.currentDate = this.dConvert.convertToDariDate(this.baseService.getTodayDate());
		this.currentTime = this.baseService.getCurrentTime();

		this.newForm = this.fb.group({
			hostDepartment: [null, [Validators.required]],
			host: [null],
			visitDate: [this.currentDate],
			visitTime: [this.currentTime],
			remarks: null,
			visitSource: [null],
			visitSubject: [null, [Validators.required]],
			visitCategory: ["NORMAL", [Validators.required]],
			visitType: ["OFFICIAL", [Validators.required]],
			hasVehicle: [false, [Validators.required]],
			vehicles: this.fb.array([]),
			visitors: this.fb.array([this.newVisitor()]),
		});

		if(!this.isSchedule) {
			this.newForm.get("visitDate").disable();
			this.newForm.get("visitTime").disable();
		}
	}

	fetchEssentialData() {
		this.departments$ = this.baseService.getDepartmentList();
	}

	visitors(): FormArray {
		return this.newForm.get("visitors") as FormArray
	}

	newVisitor(): FormGroup {
		let visitorForm =  this.fb.group({
			firstName: [null, [Validators.required]],
			lastName: [null],
			fatherName: [null, [Validators.required]],
			phone: [null, [Validators.required, Validators.minLength(10), Validators.minLength(10)]],
			email: [null, [Validators.email]],
			tazkira: [null],
			designation:  [null],
			professionType: ['CIVILIAN', [Validators.required]],
			organizationType: [null],
			organization: [null],
			organizationOther: [null],
			allowSmartPhone: [false, [Validators.required]],
			photo: [null, [Validators.required]],
			address: [null],
		});

		if(this.isSchedule) {
			visitorForm.get("photo").clearValidators();
		}

		return visitorForm;
	}

	addVisitor() {
		console.log("Adding a visitor");
		this.visitors().push(this.newVisitor());
	}

	removeVisitor(visitorIndex:number) {
		this.visitors().removeAt(visitorIndex);
	}

	removeAllVisitors() {
		while(this.visitors().length > 0) {
			this.visitors().removeAt(0);
		}
	}

	vehicles(): FormArray {
		return this.newForm.get("vehicles") as FormArray
	}

	newVehicle(): FormGroup {
		let vehicleForm = this.fb.group({
			driverName: [null, [Validators.required]],
			vehicleColor: [null, [Validators.required]],
			vehicleModal: [null, [Validators.required]],
			vehiclePlateNo: [null, [Validators.required]],
			photo: [null, [Validators.required]],
		});

		if(this.isSchedule) {
			vehicleForm.get("photo").clearValidators();
		}

		return vehicleForm;
	}

	addVehicle() {
		console.log("Adding a vehicle");
		this.vehicles().push(this.newVehicle());
	}

	removeVehicle(vehicleIndex:number) {
		this.vehicles().removeAt(vehicleIndex);
	}

	removeAllVehicles() {
		while(this.vehicles().length > 0) {
			this.vehicles().removeAt(0);
		}
	}

	toggleVehicleInfo() {
		let hasVehicle = this.newForm.get('hasVehicle').value;
		console.log(hasVehicle);
		if (hasVehicle) {
			this.addVehicle();
			this.showVehicleInfo = true;
		} else {
			this.removeAllVehicles();
			this.showVehicleInfo = false;
		}
	}

	getError(formControlName: string) {
		if (formControlName) {
			if ((!this.newForm.get(formControlName).valid && this.newForm.get(formControlName).touched) ||
				(this.newForm.get(formControlName).untouched && this.formSubmitAttempt)
			) {
				let error_msg = '';
				// return this.newForm.errors[formControlName];
				let errors = this.newForm.get(formControlName).errors;
				if(errors && errors.required) {
					error_msg += this.translate.instant('FIELD_IS_REQUIRED');
				}
				return error_msg;
			}
			return;
		}
	}

	// getData(){
	// 	console.log('create visit called ');
	// 	this.visitorService.getRecordList().subscribe(res=>{
	// 	console.log('res', res);

	// 	})
	// }

	uploadExcel() {
		const modalRef = this.modalService.open(ExcelUploadComponent, {
			centered: true, size: 'md', backdrop:  true, keyboard: false
		});

		modalRef.componentInstance.jsonData.subscribe((excelJsonContent) => {
			console.log(excelJsonContent);
			let columns = [];
			let newVisitors = [];
			let i = 0;
			for (const row of excelJsonContent) {
				console.log(row);
				if(i==0) {
					columns = row;
					i++;
					continue;
				}

				let newVisitor = this.newVisitor();
				let j = 0;
				for (const column of columns) {
					newVisitor.get(column).setValue(row[j]);
					j++;
				}
				newVisitors.push(newVisitor);
				i++;
			}

			this.removeAllVisitors();
			for (const newVisitor of newVisitors) {
				this.visitors().push(newVisitor);
			}
		});
	}

	onSubmit() {
		console.log(this.newForm.value);
		this.formSubmitAttempt = true;
		if (this.newForm.invalid) {
			this.translatedToastr.error("ERROR", "FORM_INVALID_MSG");
            document.getElementById('newForm').classList.add('input-error');
        } else {
            this.submit();
        }
		// this.spinner.show();

		// this.visitorService.addRecord(formData).subscribe(res => {
		// 	console.log("successfully recored: ", res);
		// //   this.ShowSuccessToast();
		// 	this.spinner.hide();
		// 	this.router.navigateByUrl("/proposal");

		// }, err => {
		// 	this.spinner.hide();
		// 	console.log("error in recording: ", err);

		// });
	}

	submit() {
        let obj = this.newForm.value;
		if(!this.isSchedule) {
			obj['visitDate'] = this.currentDate;
			obj['visitTime'] = this.currentTime;
		}
        console.log('Prepared data: ', obj);
		obj = this.setAttrWithNullToBlank(obj)

        this.spinner.show();
        this.visitService.addRecord(obj, this.isSchedule).subscribe(res => {
            this.spinner.hide();
			this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
			if(this.isSchedule) {
				this.router.navigateByUrl(`/reception/visits/my`);
			} else {
				this.router.navigateByUrl(`/reception/visits`);
			}
        }, err => {
            this.spinner.hide();
			this.translatedToastr.error("ERROR", "ERR_MSG");
			this.authService.checkUserLogin();
        });

    }

	cancel() {
		if(this.isSchedule) {
			this.router.navigateByUrl(`/reception/visits/my`);
		} else {
			this.router.navigateByUrl(`/reception/visits`);
		}
	}

	setAttrWithNullToBlank(obj) {
		for (var key in obj) {
			if (obj[key] === null) {
				obj[key] = '';
			}
			if(obj[key] instanceof Array) {
				console.log(obj[key]);
				for (var arrayKey in obj[key]) {
					for (var arrayObjKey in obj[key][arrayKey]) {
						if (obj[key][arrayKey][arrayObjKey] === null) {
							obj[key][arrayKey][arrayObjKey] = '';
						}
					}
				}
			}
		}
		return obj;
	}

	removeAttrWithNullValues(obj) {
		for (var key in obj) {
			if (obj[key] === null) {
				delete obj[key];
			}
			if(obj[key] instanceof Array) {
				console.log(obj[key]);
				for (var arrayKey in obj[key]) {
					for (var arrayObjKey in obj[key][arrayKey]) {
						if (obj[key][arrayKey][arrayObjKey] === null) {
							delete obj[key][arrayKey][arrayObjKey];
						}
					}
				}
			}
		}
		return obj;
	}


}
