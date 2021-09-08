import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDraftDocumentComponent } from './list-draft-document/list-draft-document.component';
import { ListDraftExecutionComponent } from './list-draft-execution/list-draft-execution.component';
import { DraftDocumentComponent } from './draft-document.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { SharedModule } from 'app/template/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';

export const routes: Routes = [
	{
		path: '',
		component: DraftDocumentComponent,
		pathMatch: 'full'
	},
]

@NgModule({
	declarations: [ListDraftDocumentComponent, ListDraftExecutionComponent, DraftDocumentComponent],
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
export class DraftDocumentModule { }
