import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

import { PublicPagesRoutingModule } from './public-pages-routing.module';
import { SelectLangPageComponent } from "./select-lang/select-lang-page.component";
import { ComingSoonPageComponent } from "./coming-soon/coming-soon-page.component";
import { ErrorPageComponent } from "./error/error-page.component";
import { ForgotPasswordPageComponent } from "./forgot-password/forgot-password-page.component";
import { LockScreenPageComponent } from "./lock-screen/lock-screen-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { MaintenancePageComponent } from "./maintenance/maintenance-page.component";
import { RegisterPageComponent } from "./register/register-page.component";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ServiceSelctionComponent } from './service-selction/service-selction.component';
import { FundTransferComponent } from './services/fund-transfer/fund-transfer.component';
import { BalanceInquiryComponent } from './services/balance-inquiry/balance-inquiry.component';
import { BillPaymentComponent } from './services/bill-payment/bill-payment.component';
import { BreshnaPaymentComponent } from './services/breshna-payment/breshna-payment.component';
import { M2uPaymentComponent } from './services/m2u-payment/m2u-payment.component';
import { FeePaymentComponent } from './services/fee-payment/fee-payment.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  imports: [
    CommonModule,
    PublicPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgxSpinnerModule
  ],
  declarations: [
    SelectLangPageComponent,
    ComingSoonPageComponent,
    ErrorPageComponent,
    ForgotPasswordPageComponent,
    LockScreenPageComponent,
    LoginPageComponent,
    MaintenancePageComponent,
    RegisterPageComponent,
    ServiceSelctionComponent,
    FundTransferComponent,
    BalanceInquiryComponent,
    BillPaymentComponent,
    BreshnaPaymentComponent,
    M2uPaymentComponent,
    FeePaymentComponent
  ]
})
export class PublicPagesModule { }
