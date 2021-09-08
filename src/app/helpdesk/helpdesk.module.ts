import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpdeskComponent } from './helpdesk.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { SharedModule } from 'app/template/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TicketComponent } from './ticket/ticket.component';
import { CreateTicketComponent } from './ticket/create-ticket/create-ticket.component';
import { EditTicketComponent } from './ticket/edit-ticket/edit-ticket.component';
import { ViewTicketComponent } from './ticket/view-ticket/view-ticket.component';
import { TagInputModule } from 'ngx-chips';
import { DragulaModule } from 'ng2-dragula';
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
				component: HelpdeskComponent,
				pathMatch:  'full'
			},
			{
				path: 'tickets',
				component: TicketComponent,
				pathMatch:  'full'
			},
			// {
			// 	path: 'tickets/add',
			// 	component: TicketComponent
			// },
			{
				path: 'tickets/:id',
				component: ViewTicketComponent
			},
			// {
			// 	path: 'tickets/:id/edit',
			// 	component: EditTicketComponent
			// },
		]
	}
];

@NgModule({
  declarations: [HelpdeskComponent, TicketComponent, CreateTicketComponent, EditTicketComponent, ViewTicketComponent],
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
		TagInputModule,
		DragulaModule.forRoot(),
  ]
})
export class HelpdeskModule { }
