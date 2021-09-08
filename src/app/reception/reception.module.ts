import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceptionComponent } from './reception.component';
import { RouterModule, Routes } from '@angular/router';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VisitComponent } from './visit/visit.component';
import { CreateVisitComponent } from './visit/create-visit/create-visit.component';
import { EditVisitComponent } from './visit/edit-visit/edit-visit.component';
import { ViewVisitComponent } from './visit/view-visit/view-visit.component';
import { CreateVisitorSubformComponent } from './visit/create-visitor-subform/create-visitor-subform.component';
import { CapturePhotoComponent } from './visit/capture-photo/capture-photo.component'
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import {WebcamModule} from 'ngx-webcam';
import { FormVisitComponent } from './visit/form-visit/form-visit.component';

import {VisitorComponent} from './visitor/visitor.component';
import { EditVisitorComponent } from './visitor/edit-visitor/edit-visitor.component';
import { ViewVisitorComponent } from './visitor/view-visitor/view-visitor.component';
import { SharedModule } from 'app/template/shared/shared.module';
import { ListScheduleVisitComponent } from './scheduling/schedule-visit/list-schedule-visit/list-schedule-visit.component';
import { DisplayPhotoComponent } from './visit/display-photo/display-photo.component';
import { CreateVehicleSubformComponent } from './visit/create-vehicle-subform/create-vehicle-subform.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { ChartistModule } from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ngx-custom-validators';
import { VehicleComponent } from './vehicle/vehicle.component';
import { ViewVehicleComponent } from './vehicle/view-vehicle/view-vehicle.component';

import { ExcelUploadComponent } from './visit/excel-upload/excel-upload.component';
import { WikiComponent } from './wiki/wiki.component';
import { HROUTES } from './nav-horizontal-routes';
import { VROUTES } from './nav-vertical-routes';
import { AuthGuard } from 'app/template/shared/auth/auth-guard.service';
import { FullLayoutComponent } from 'app/template/layouts/full/full-layout.component';
import { ListMyVisitComponent } from './visit/list-my-visit/list-my-visit.component';

export const routes: Routes = [
	{
		path: '',
		canActivate:[AuthGuard],
		component: FullLayoutComponent,
		data: {HROUTES: HROUTES, VROUTES: VROUTES},
		children: [
			{
				path: '',
				component: ReceptionComponent,
				pathMatch:  'full'
			},
			{
				path: 'visits',
				component: VisitComponent,
				pathMatch:  'full'
			},
			{
				path: 'visits/my',
				component: ListMyVisitComponent
			},
			{
				path: 'visits/schedules/add',
				component: CreateVisitComponent
			},
			{
				path: 'visits/schedules',
				loadChildren: () => import('./scheduling/scheduling.module').then(m => m.SchedulingModule)
			},
			{
				path: 'visits/add',
				component: CreateVisitComponent
			},
			{
				path: 'visits/:id',
				component: ViewVisitComponent
			},
			{
				path: 'visits/:id/edit',
				component: EditVisitComponent
			},
			{
				path: 'visitors',
				component: VisitorComponent
			},
			{
				path: 'visitors/:id',
				component: ViewVisitorComponent
			},
			{
				path: 'visitors/:id/edit',
				component: EditVisitorComponent
			},
			{
				path: 'vehicles',
				component: VehicleComponent
			},
			{
				path: 'vehicles/:id',
				component: ViewVehicleComponent
			},
			{
				path: 'dashboard',
				component: DashboardComponent
			},
			{
				path: 'wiki',
				component: WikiComponent
			},
		]
	}
];


@NgModule({
	declarations: [ReceptionComponent, VisitComponent, CreateVisitComponent,
     FormVisitComponent, EditVisitComponent, ViewVisitComponent,
    VisitorComponent, CreateVisitorSubformComponent, CapturePhotoComponent,
	ViewVisitorComponent, EditVisitorComponent, ListScheduleVisitComponent, DisplayPhotoComponent, CreateVehicleSubformComponent, DashboardComponent, VehicleComponent, ViewVehicleComponent, ExcelUploadComponent, WikiComponent, ListMyVisitComponent],
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
		WebcamModule,
        CustomFormsModule,
        NgSelectModule,
	],
})
export class ReceptionModule { }
