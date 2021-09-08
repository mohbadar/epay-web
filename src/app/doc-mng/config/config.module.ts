import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { DocumentTypeTemplateComponent } from './document-type-template/document-type-template.component';
import { CreateDocumentTypeTemplateComponent } from './document-type-template/create-document-type-template/create-document-type-template.component';
import { EditDocumentTypeTemplateComponent } from './document-type-template/edit-document-type-template/edit-document-type-template.component';
import { ViewDocumentTypeTemplateComponent } from './document-type-template/view-document-type-template/view-document-type-template.component';
import { ViewDocumentTypeComponent } from './document-type/view-document-type/view-document-type.component';
import { EditDocumentTypeComponent } from './document-type/edit-document-type/edit-document-type.component';
import { CreateDocumentTypeComponent } from './document-type/create-document-type/create-document-type.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { SharedModule } from 'app/template/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EditorModule } from '@tinymce/tinymce-angular';
import { GalleryComponent } from './gallery/gallery.component';
import { AddPhotoComponent } from './gallery/add-photo/add-photo.component';
import { ViewPhotoComponent } from './gallery/view-photo/view-photo.component';
import { DeletePhotoComponent } from './gallery/delete-photo/delete-photo.component';
import { EditPhotoComponent } from './gallery/edit-photo/edit-photo.component';

export const routes: Routes = [
	{
    path: 'document_types',
    component: DocumentTypeComponent,
    pathMatch:  'full'
  },
  {
    path: 'document_type_templates',
    component: DocumentTypeTemplateComponent,
    pathMatch:  'full'
  },
  {
		path: 'document_type_templates/add',
		component: CreateDocumentTypeTemplateComponent,
		pathMatch:  'full'
	},
	{
		path: 'document_type_templates/:id',
		component: ViewDocumentTypeTemplateComponent,
		pathMatch:  'full'
	},
	{
		path: 'document_type_templates/:id/edit',
		component: EditDocumentTypeTemplateComponent,
		pathMatch:  'full'
	},
  {
		path: 'gallery',
		component: GalleryComponent,
		pathMatch:  'full'
	}
];

@NgModule({
  declarations: [DocumentTypeComponent, DocumentTypeTemplateComponent, CreateDocumentTypeTemplateComponent, EditDocumentTypeTemplateComponent, ViewDocumentTypeTemplateComponent, 
    AddPhotoComponent, ViewDocumentTypeComponent, EditDocumentTypeComponent, CreateDocumentTypeComponent, GalleryComponent, ViewPhotoComponent, DeletePhotoComponent, EditPhotoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgxDatatableModule,
    PipeModule,
    SharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxSpinnerModule,
    EditorModule
  ]
})
export class ConfigModule { }
