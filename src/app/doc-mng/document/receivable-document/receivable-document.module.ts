import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListReceivableDocumentComponent } from './list-receivable-document/list-receivable-document.component';
import { ReceivableDocumentComponent } from './receivable-document.component';
import { ListReceivableExecutionComponent } from './list-receivable-execution/list-receivable-execution.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { SharedModule } from 'app/template/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';

export const routes: Routes = [
    {
        path: '',
        component: ReceivableDocumentComponent,
        pathMatch: 'full'
    },
]

@NgModule({
    declarations: [ListReceivableDocumentComponent, ReceivableDocumentComponent, ListReceivableExecutionComponent],
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
export class ReceivableDocumentModule { }
