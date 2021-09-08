import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleVisitorComponent } from './schedule-visitor/schedule-visitor.component';
import { ScheduleVehicleComponent } from './schedule-vehicle/schedule-vehicle.component';
import { ScheduleVisitComponent } from './schedule-visit/schedule-visit.component';
import { ListScheduleVisitorComponent } from './schedule-visitor/list-schedule-visitor/list-schedule-visitor.component';
import { ListScheduleVehicleComponent } from './schedule-vehicle/list-schedule-vehicle/list-schedule-vehicle.component';
import { ProcessVehicleScheduleComponent } from './schedule-vehicle/process-vehicle-schedule/process-vehicle-schedule.component';
import { ProcessScheduleComponent } from './schedule-visit/process-schedule/process-schedule.component';
import { ProcessVisitorScheduleComponent } from './schedule-visitor/process-visitor-schedule/process-visitor-schedule.component';
import { SchedulingComponent } from './scheduling.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'app/template/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ChartsModule } from 'ng2-charts';
import { ChartistModule } from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { WebcamModule } from 'ngx-webcam';
import { CustomFormsModule } from 'ngx-custom-validators';

export const routes: Routes = [
	{
		path: '',
		component: SchedulingComponent,
		pathMatch:  'full'
	},
	{
		path: 'visits',
		component: ScheduleVisitComponent
	},
	{
		path: 'visitors',
		component: ScheduleVisitorComponent
	},
	{
		path: 'vehicles',
		component: ScheduleVehicleComponent
	},
]
@NgModule({
	declarations: [ SchedulingComponent, ListScheduleVisitorComponent, ListScheduleVehicleComponent, ProcessScheduleComponent, ProcessVisitorScheduleComponent, ProcessVehicleScheduleComponent, ScheduleVisitorComponent, ScheduleVehicleComponent, ScheduleVisitComponent],
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
	]
})
export class SchedulingModule { }
