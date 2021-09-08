import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportationComponent } from './transportation.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { SharedModule } from 'app/template/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RequestComponent } from './request/request.component';
import { CreateRequestComponent } from './request/create-request/create-request.component';
import { ViewRequestComponent } from './request/view-request/view-request.component';
import { EditRequestComponent } from './request/edit-request/edit-request.component';
import { DriverComponent } from './driver/driver.component';
import {CreateDriverComponent} from './driver/create-driver/create-driver.component';
import {ViewDriverComponent} from './driver/view-driver/view-driver.component';
import {EditDriverComponent} from './driver/edit-driver/edit-driver.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import {CreateVehicleComponent} from './vehicle/create-vehicle/create-vehicle.component';
import {EditVehicleComponent} from './vehicle/edit-vehicle/edit-vehicle.component';
import { HROUTES } from './nav-horizontal-routes';
import { VROUTES } from './nav-vertical-routes';
import { AuthGuard } from 'app/template/shared/auth/auth-guard.service';
import { FullLayoutComponent } from 'app/template/layouts/full/full-layout.component';
import { ListClosedRequestComponent } from './request/list-closed-request/list-closed-request.component';
import { ListPendingRequestComponent } from './request/list-pending-request/list-pending-request.component';
import { ProcessRequestComponent } from './request/process-request/process-request.component';
import { ListMyRequestComponent } from './request/list-my-request/list-my-request.component';
import { ViewVehicleComponent } from './vehicle/view-vehicle/view-vehicle.component';
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
				component: TransportationComponent,
				pathMatch:  'full'
			},
			{
				path: 'requests',
				component: RequestComponent,
				pathMatch:  'full'
			},
			{
				path: 'requests/my',
				component: ListMyRequestComponent
			},
			{
				path: 'requests/pending',
				component: RequestComponent
			},
			{
				path: 'requests/closed',
				component: RequestComponent
			},
			{
				path: 'requests/add',
				component: CreateRequestComponent
			},
			{
				path: 'requests/:id',
				component: ViewRequestComponent
			},
			{
				path: 'requests/:id/edit',
				component: EditRequestComponent
			},
			{
				path:'drivers',
				component:DriverComponent,
				pathMatch: 'full'
			},
			{
				path:'drivers/add',
				component:CreateDriverComponent
			},
			{
				path:'drivers/:id',
				component:ViewDriverComponent
			},
			{
				path:'drivers/:id/edit',
				component:EditDriverComponent
			},
			{
				path:'vehicles',
				component:VehicleComponent,
				pathMatch:'full'
			},
			{
				path:'vehicles/add',
				component:CreateVehicleComponent
			},
			{
				path:'vehicles/:id/edit',
				component:EditVehicleComponent
			},
			{
				path:'vehicles/:id',
				component:ViewVehicleComponent
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
  declarations: [TransportationComponent, RequestComponent, CreateRequestComponent, ViewRequestComponent, EditRequestComponent, DriverComponent,CreateDriverComponent,ViewDriverComponent, EditDriverComponent, VehicleComponent, CreateVehicleComponent, EditVehicleComponent,ViewVehicleComponent, ListClosedRequestComponent, ListPendingRequestComponent, ProcessRequestComponent, ListMyRequestComponent, ViewVehicleComponent, DashboardComponent, WikiComponent],
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
  NgxSpinnerModule,
  ]
})
export class TransportationModule { }
