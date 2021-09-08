import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMyDocumentComponent } from './list-my-document/list-my-document.component';
import { ListMyFollowupComponent } from './list-my-followup/list-my-followup.component';
import { ListMyCommentComponent } from './list-my-comment/list-my-comment.component';
import { MyDocumentComponent } from './my-document.component';
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
        component: MyDocumentComponent,
        pathMatch: 'full'
    },
]

@NgModule({
    declarations: [ListMyDocumentComponent, ListMyFollowupComponent, ListMyCommentComponent, MyDocumentComponent],
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
export class MyDocumentModule { }
