import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { SigniturePathService } from './signiture_path.service';
import { SigniturePathComponent } from './signiture_path.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SignaturePadModule } from 'angular2-signaturepad';
import {SigniturePathFieldComponent} from './signiture_field/signiture_path_field.component';



export const routes: Routes = [
	{
		path: '',
		component: SigniturePathComponent,
		pathMatch:  'full'
	}
];

@NgModule({
  declarations: [SigniturePathComponent, SigniturePathFieldComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgxDatatableModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    SignaturePadModule,
    TranslateModule, 
    NgbToastModule
  ],
  providers: [SigniturePathService ]
})
export class SigniturePathModule { }
