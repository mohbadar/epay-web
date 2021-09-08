import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileService } from './edit_profile_menu_bar.service';
import { EditProfileMenuBarComponent } from './edit_profile_menu_bar.component';
import { ChangeUserPhotoComponent } from './change-user-photo/change-user-photo.component';
import { ImageCropperModule } from 'ngx-image-cropper';

export const routes: Routes = [
	{
		path: '',
		component: EditProfileMenuBarComponent,
		pathMatch:  'full'
	}
];

@NgModule({
  declarations: [EditProfileMenuBarComponent, ChangeUserPhotoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgxDatatableModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule
  ],
  providers: [EditProfileService]
})
export class EditProfileMenuBarModule { }
