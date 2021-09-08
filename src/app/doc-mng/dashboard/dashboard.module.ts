import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { SharedModule } from 'app/template/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EditorModule } from '@tinymce/tinymce-angular';
import {DashboardComponent} from './dashboard.component';
import {MyDashboardComponent} from './my-dashboard/my-dashboard.component';
import {DashboardBasedStatusComponent} from './dashboard-based-status/dashboard-based-status.component';
import {DashboadBasedEntityComponent} from './dashboard-based-entity/dashboard-based-entity.component';
import {MyDashboadBasedEntityComponent} from './my-dashboard/my-dashboard-based-on-entity/my-dashboard-based-entity.component';
import {MyDashboardBasedStatusComponent} from './my-dashboard/my-dashboard-based-on-status/my-dashboard-based-status.component';
import { ChartsModule } from 'ng2-charts';
import { ChartistModule } from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgApexchartsModule } from 'ng-apexcharts';


export const routes: Routes = [
	{
    path: 'generaldashboard',
    component: DashboardComponent,
    pathMatch:  'full'
  },
  {
    path: 'mydashboard',
    component: MyDashboardComponent,
    pathMatch:  'full'
  }
];

@NgModule({
  declarations: [DashboardComponent,MyDashboardComponent,DashboardBasedStatusComponent,
    DashboadBasedEntityComponent, MyDashboadBasedEntityComponent, MyDashboardBasedStatusComponent],
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
    EditorModule,
  ChartsModule,
  ChartistModule,
  NgxChartsModule,
  NgApexchartsModule,
  ]
})
export class DashboardModule { }
