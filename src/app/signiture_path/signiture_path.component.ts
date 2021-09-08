import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SignaturePad } from 'angular2-signaturepad';
import { UserService } from 'app/admin/user/user.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { Globals } from 'app/_helpers/globals';
import { SigniturePathFieldComponent } from './signiture_field/signiture_path_field.component';

@Component({
  selector: 'app-signiture-path-user',
  templateUrl: './signiture_path.component.html',
  styleUrls: ['./signiture_path.component.scss']
})
export class SigniturePathComponent{
	

	public form: FormGroup;
	isloading = false;
	userSigniture = null;
  
	// for convenience as we don't have a QueryList.index
	public secondSig: SigniturePathFieldComponent;
  
	@ViewChildren(SigniturePathFieldComponent) public sigs: QueryList<SigniturePathFieldComponent>;
  
	constructor(fb: FormBuilder, private cdr: ChangeDetectorRef,private translatedToastr: TranslatedToastrService,
		public translate: TranslateService, private globals: Globals, private userService: UserService) {
  
	  this.form = fb.group({
		signatureField1: [null, Validators.required],
	  });
	}

	ngOnInit(): void {
		this.userService.loadSignPad(this.globals.principal.id).subscribe(res=>
			{
				this.userSigniture = res['objection'];
				this.cdr.detectChanges();
			}, 
			err=>{
				this.userSigniture = null;
			});
	}
  
	public ngAfterViewInit() {
		this.isloading = true;
		
	}
  
	// set the dimensions of the signature pad canvas
  
	// public size(container: ElementRef, sig: SigniturePathFieldComponent) {
	//   sig.signaturePad.set('canvasWidth', 500);
	//   sig.signaturePad.set('canvasHeight', 300);
	// }

  
	public submit() {
	  let userId = this.globals.principal.id;
	  const data = new FormData();
      data.append("avator", this.sigs.first.signature);
	  this.userService.addSignPad(userId, data).subscribe(res=>{
		this.translatedToastr.success("SIGNITURE_PAD", "Successfully created");
		this.clear();
		this.userSigniture = res['objection'];
		this.cdr.detectChanges();
	  }, err=>{
		this.translatedToastr.error("SIGNITURE_PAD", "THERE_WAS_AN_ERROR_CREATING_RECORD");
        console.log(err);
	  });
	}
  
	public clear() {
	  this.sigs.first.clear();
	}

	

	

	

}
