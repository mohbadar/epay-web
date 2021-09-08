import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { concat, Observable, Subject, of } from 'rxjs';
import { distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { VisitService } from '../visit.service';

@Component({
  selector: 'app-form-visit',
  templateUrl: './form-visit.component.html',
  styleUrls: ['./form-visit.component.scss']
})
export class FormVisitComponent implements OnInit {
  @Input() editId;
  @Input() formType;
  @Output() result = new EventEmitter<Object>();

  visitorFormSubmitted = false;
  visitorForm: FormGroup;
  searchForm: FormGroup;
  visitForm: FormGroup;
  profileInput$ = new Subject<string>();
  profiles$: Observable<any>;
  spinners = false;
  // public spinnersTime: NgbTimeStruct = { hour: 13, minute: 30, second: 30 };

  tazkira = true;
  card = false;
  showForm = false;

  date = new Date();
  currentDateTime;
  attachment;
  images: any;
  uploadedImages: Array<any>;
  showImage;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public datepipe: DatePipe,
    private ref: ChangeDetectorRef,
    private visitService: VisitService,

  ) { }

  ngOnInit(): void {
    this.currentDateTime = this.datepipe.transform(this.date, 'yyyy-MM-dd h:mm:ss a');
    this.initVisitorForm();
    this.initSearchForm();
    this.loadProfiles();


  }

  initSearchForm() {
    this.searchForm = this.formBuilder.group({
      searchKey: [null, [Validators.required]]
    })
  }
  initVisitorForm() {
    this.visitorForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null],
      fatherName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null],
      tazkira: [null],
      card: [null],
      photo: ['image.jsp'],
      address: [null],
      host: [null],
      visitDate: [null, [Validators.required]],
      visitTime: ['09:00 AM'],
      visitSource: [null],
      visitSubject: [null, [Validators.required]]
    });
  }

  get cpf() {
    return this.visitorForm.controls;
  }
  get vstF() {
    return this.visitorForm.controls;
  }

  addNewVisitor() {
    this.showForm = true;
    this.ngAfterViewInit();
  }
  loadProfiles() {
    this.profiles$ = concat(
      of([]), // default items
      this.profileInput$.pipe(
        distinctUntilChanged(),
        // switchMap(term => this.profileService.searchCandidate(term).pipe(
        //   catchError(() => of([])) // empty list on error
        // ))
      )
    );
  }
  RadioClicked(event) {
    if (event.target.defaultValue === 'tazkira') {
      console.log("selected tazkira: ", event.target.defaultValue);
      this.tazkira = true;
      this.card = false;
      this.visitorForm.get('tazkira').setValidators([Validators.required]);
      this.visitorForm.get('card').setErrors(null);
      this.visitorForm.get('card').clearValidators();
      this.visitorForm.get('card').setValue(null);

    }
    else {
      console.log("selected Card: ", event.target.defaultValue);
      this.tazkira = false;
      this.card = true;
      this.visitorForm.get('card').setValidators([Validators.required]);
      this.visitorForm.get('tazkira').setErrors(null);
      this.visitorForm.get('tazkira').clearValidators();
      this.visitorForm.get('tazkira').setValue(null);

    }
  }


  routeHome() {
    this.router.navigate(['reception/visits']);
  }

  submit() {
    this.visitorFormSubmitted = true;

    if (this.visitorForm.invalid) {
      console.log('visitor form is invalid');
      // To display errors below forms
     this.findInvalidControls();
      return;
    }
    else {
      let obj = this.visitorForm.value;
      let visitObject = {host: 'email', visitDate:obj.visitDate, visitTime:obj.visitTime, visitSubject:obj.visitSubject, visitSource:obj.visitSource};

      obj = { ...obj, visit:[visitObject] };

      console.log('proposal data:', this.visitorForm.value);

      const formData = new FormData();
      formData.append('visitor', JSON.stringify(obj));
      formData.append('attachment', this.attachment == "undefined" ? null : this.attachment);
      formData.append('id', this.editId);
      console.log("data before submission: ", JSON.stringify(obj));
      this.visitorForm.disable();
      this.result.emit(obj);
    }

  }

  findInvalidControls() {
		const invalid = [];
		const controls = this.visitorForm.controls;
		for (const name in controls) {
			if (controls[name].invalid) {
				invalid.push(name);
			}
		}
		console.log('Invalid controls: ', invalid);
	}

  // toggle webcam on/off
  public showWebcam = true;
  // latest snapshot
  public webcamImage: WebcamImage = null;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();

  triggerSnapshot(): void {
    this.trigger.next();
  }

  handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.images = webcamImage.imageAsBase64;
  }
  uploadImage(){
    let obj = {image:this.images, name:'visitor_'+ this.date +"_ "+ this.date.getMilliseconds()};
    this.visitService.uploadImage(obj).subscribe(res=>{
      this.uploadedImages.push(this.images);
      this.images = null;
    }), err => {

      console.log("error in recording: ", err);

    };
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ref.detectChanges();
    }, 100);

  }

}
