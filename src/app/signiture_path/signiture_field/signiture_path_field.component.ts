import { ChangeDetectorRef, Component, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: 'app-signiture-field',
  templateUrl: './signiture_path_field.component.html',
  styleUrls: ['./signiture_path_field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SigniturePathFieldComponent),
      multi: true,
    },
  ],
})
export class SigniturePathFieldComponent implements ControlValueAccessor {
	@ViewChild(SignaturePad) public signaturePad: SignaturePad;
  
	public options: Object = {
		'minWidth': 1,
    	'canvasWidth': 500,
    	'canvasHeight': 300
	};
  
	public _signature: any = null;
  
	public propagateChange: Function = null;
  
	get signature(): any {
	  return this._signature;
	}
  
	set signature(value: any) {
	  this._signature = value;
	  console.log('set signature to ' + this._signature);
	  console.log('signature data :');
	  console.log(this.signaturePad.toData());
	  this.propagateChange(this.signature);
	}
  
	public writeValue(value: any): void {
	  if (!value) {
		return;
	  }
	  this._signature = value;
	  this.signaturePad.fromDataURL(this.signature);
	}
  
	public registerOnChange(fn: any): void {
	  this.propagateChange = fn;
	}
  
	public registerOnTouched(): void {
	  // no-op
	}
  
	public ngAfterViewInit(): void {
	//   this.signaturePad.set('backgroundColor', 'rgb(255, 255, 255)');
	  this.signaturePad.clear();
	}
  
	public drawBegin(): void {
	  console.log('Begin Drawing');
	}
  
	public drawComplete(): void {
	  this.signature = this.signaturePad.toDataURL('image/png', 0.5);
	}
  
	public clear(): void {
	  this.signaturePad.clear();
	  this.signature = null;
	}
  }