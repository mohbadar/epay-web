import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrComponent } from './hr.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'app/template/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HROUTES } from './nav-horizontal-routes';
import { VROUTES } from './nav-vertical-routes';
import { AuthGuard } from 'app/template/shared/auth/auth-guard.service';
import { FullLayoutComponent } from 'app/template/layouts/full/full-layout.component';
import { TimesheetComponent } from './timesheet/timesheet.component';

export const routes: Routes = [
	{
		path: '',
		canActivate:[AuthGuard],
		component: FullLayoutComponent,
		data: {HROUTES: HROUTES, VROUTES: VROUTES},
		children: [
			{
				path: '',
				component: HrComponent,
				pathMatch:  'full'
			},
			{
				path: 'employees',
				loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
			},
			{
				path: 'timesheets',
				component: TimesheetComponent,
				pathMatch:  'full'
			},
		]
	}
];

@NgModule({
  declarations: [HrComponent, TimesheetComponent],
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
export class HrModule { }
