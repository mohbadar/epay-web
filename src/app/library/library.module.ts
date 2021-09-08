import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'app/template/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PublicationComponent } from './publication/publication.component';
import { CreatePublicationComponent } from './publication/create-publication/create-publication.component';
import { EditPublicationComponent } from './publication/edit-publication/edit-publication.component';
import { ViewPublicationComponent } from './publication/view-publication/view-publication.component';
import { HROUTES } from './nav-horizontal-routes';
import { VROUTES } from './nav-vertical-routes';
import { AuthGuard } from 'app/template/shared/auth/auth-guard.service';
import { FullLayoutComponent } from 'app/template/layouts/full/full-layout.component';

export const routes: Routes = [
	{
		path: '',
		canActivate:[AuthGuard],
		component: FullLayoutComponent,
		data: {HROUTES: HROUTES, VROUTES: VROUTES},
		children: [
			{
				path: '',
				component: LibraryComponent,
				pathMatch:  'full'
			},
			{
				path: 'publications',
				component: PublicationComponent,
				pathMatch:  'full'
			},
			{
				path: 'publications/add',
				component: CreatePublicationComponent
			},
			{
				path: 'publications/:id',
				component: ViewPublicationComponent
			},
			{
				path: 'publications/:id/edit',
				component: EditPublicationComponent
			},
		]
	}
];

@NgModule({
  declarations: [LibraryComponent, PublicationComponent, CreatePublicationComponent, EditPublicationComponent, ViewPublicationComponent],
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
  ]
})
export class LibraryModule { }
