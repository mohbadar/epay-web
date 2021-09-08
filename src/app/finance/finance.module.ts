import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment/payment.component';
import { CreatePaymentComponent } from './payment/create-payment/create-payment.component';
import { ViewPaymentComponent } from './payment/view-payment/view-payment.component';
import { FinanceComponent } from './finance.component';
import { HROUTES } from './nav-horizontal-routes';
import { VROUTES } from './nav-vertical-routes';
import { AuthGuard } from 'app/template/shared/auth/auth-guard.service';
import { FullLayoutComponent } from 'app/template/layouts/full/full-layout.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'app/template/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { NgSelectModule } from '@ng-select/ng-select';

export const routes: Routes = [
	{
		path: '',
		canActivate:[AuthGuard],
		component: FullLayoutComponent,
		data: {HROUTES: HROUTES, VROUTES: VROUTES},
		children: [
			{
				path: '',
				component: FinanceComponent,
				pathMatch:  'full'
			},
			{
				path: 'payments',
				component: PaymentComponent,
				pathMatch:  'full'
			},
		]
	}
];

@NgModule({
  declarations: [PaymentComponent, CreatePaymentComponent, ViewPaymentComponent, FinanceComponent],
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
export class FinanceModule { }
