import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectLangPageComponent } from "./select-lang/select-lang-page.component";
import { ComingSoonPageComponent } from "./coming-soon/coming-soon-page.component";
import { ErrorPageComponent } from "./error/error-page.component";
import { ForgotPasswordPageComponent } from "./forgot-password/forgot-password-page.component";
import { LockScreenPageComponent } from "./lock-screen/lock-screen-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { MaintenancePageComponent } from "./maintenance/maintenance-page.component";
import { RegisterPageComponent } from "./register/register-page.component";
import { ServiceSelctionComponent } from './service-selction/service-selction.component';
import { FundTransferComponent } from './services/fund-transfer/fund-transfer.component';
import { BalanceInquiryComponent } from './services/balance-inquiry/balance-inquiry.component';
import { BillPaymentComponent } from './services/bill-payment/bill-payment.component';
import { BreshnaPaymentComponent } from './services/breshna-payment/breshna-payment.component';
import { M2uPaymentComponent } from './services/m2u-payment/m2u-payment.component';
import { FeePaymentComponent } from './services/fee-payment/fee-payment.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'select-lang',
        component: SelectLangPageComponent,
        data: {
          title: 'Language Selection'
        }
      },

      {
        path: 'service-selection',
        component: ServiceSelctionComponent,
        data: {
          title: 'Service Selection'
        }
      },


      {
        path: 'fund-transfer',
        component: FundTransferComponent,
        data: {
          title: 'Fund Transfer'
        }
      },


      {
        path: 'balance-inquiry',
        component: BalanceInquiryComponent,
        data: {
          title: 'Balance Inquiry'
        }
      },


      {
        path: 'bill-payment',
        component: BillPaymentComponent,
        data: {
          title: 'Bill Payment'
        }
      },

      {
        path: 'breshna-payment',
        component: BreshnaPaymentComponent,
        data: {
          title: 'Breshna Payment'
        }
      },

      {
        path: 'm2u',
        component: M2uPaymentComponent,
        data: {
          title: 'M2U'
        }
      },

      {
        path: 'fee-payment',
        component: FeePaymentComponent,
        data: {
          title: 'fee payment'
        }
      },

      {
        path: 'comingsoon',
        component: ComingSoonPageComponent,
        data: {
          title: 'Coming Soon page'
        }
      },
      {
        path: 'error',
        component: ErrorPageComponent,
        data: {
          title: 'Error Page'
        }
      },
      {
        path: 'forgotpassword',
        component: ForgotPasswordPageComponent,
        data: {
          title: 'Forgot Password Page'
        }
      },   
      
      {
        path: 'lockscreen',
        component: LockScreenPageComponent,
        data: {
          title: 'Lock Screen page'
        }
      },   
      {
        path: 'login',
        component: LoginPageComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'maintenance',
        component: MaintenancePageComponent,
        data: {
          title: 'Maintenance Page'
        }
      },
      {
        path: 'register',
        component: RegisterPageComponent,
        data: {
          title: 'Register Page'
        }
      }   
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicPagesRoutingModule { }
