import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocMngComponent } from './doc-mng.component';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'app/template/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { AuthGuard } from 'app/template/shared/auth/auth-guard.service';
import { FullLayoutComponent } from 'app/template/layouts/full/full-layout.component';
import { HROUTES } from './nav-horizontal-routes';
import { VROUTES } from './nav-vertical-routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WikiComponent } from './wiki/wiki.component';
import { ChartsModule } from 'ng2-charts';
import { ChartistModule } from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgApexchartsModule } from 'ng-apexcharts';


export const routes: Routes = [
	{
		path: '',
		canActivate:[AuthGuard],
		component: FullLayoutComponent,
		data: {HROUTES: HROUTES, VROUTES: VROUTES},
		children: [
			{
				path: '',
				component: DocMngComponent,
				pathMatch:  'full'
			},
			{
				path: 'documents',
				loadChildren: () => import('./document/document.module').then(m => m.DocumentModule)
			},
			{
				path: 'config',
				loadChildren: () => import('./config/config.module').then(m => m.ConfigModule)
			},
			{
				path: 'dashboard',
				loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'wiki',
				component: WikiComponent
			},
		]
	}
];

@NgModule({
  declarations: [DocMngComponent, WikiComponent],
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
  ChartsModule,
  ChartistModule,
  NgxChartsModule,
  NgApexchartsModule,
	QuillModule.forRoot(),
  ]
})
export class DocMngModule { }
