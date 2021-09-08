import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'app/template/shared/shared.module';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		pathMatch:  'full'
	},
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    SharedModule,
		PipeModule,
    TranslateModule,
  ]
})
export class HomeModule { }
