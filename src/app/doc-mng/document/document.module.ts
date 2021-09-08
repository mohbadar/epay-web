import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DocumentComponent } from './document.component';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { ViewDocumentComponent } from './detail-document/view-document/view-document.component';
import { EditDocumentComponent } from './detail-document/edit-document/edit-document.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'app/template/shared/shared.module';
import { QuillModule } from 'ngx-quill';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DetailDocumentComponent } from './detail-document/detail-document.component';
import { CommentDocumentComponent } from './detail-document/comment-document/comment-document.component';
import { ExecutionDocumentComponent } from './detail-document/execution-document/execution-document.component';
import { HistoryDocumentComponent } from './detail-document/history-document/history-document.component';
import { CreateCommentDocumentComponent } from './detail-document/comment-document/create-comment-document/create-comment-document.component';
import { CreateExecutionDocumentComponent } from './detail-document/execution-document/create-execution-document/create-execution-document.component';
import { EditExecutionDocumentComponent } from './detail-document/execution-document/edit-execution-document/edit-execution-document.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AttachmentDocumentComponent } from './detail-document/attachment-document/attachment-document.component';
import { DeleteAttachmentComponent } from './detail-document/attachment-document/delete-attachment/delete-attachment.component';
import { SearchDocumentComponent } from './search-document/search-document.component';
import { PrintPreviewComponent } from './detail-document/print-preview/print-preview.component';
import { FollowUpDocumentComponent } from './detail-document/follow-up-document/follow-up-document.component';
import { CreateFollowUpDocumentComponent } from './detail-document/follow-up-document/create-follow-up-document/create-follow-up-document.component';
import { EditFollowUpDocumentComponent } from './detail-document/follow-up-document/edit-follow-up-document/edit-follow-up-document.component';
import { EvaluateDocumentComponent } from './detail-document/evaluate-document/evaluate-document.component';
import { ViewQrcodeComponent } from './view-qrcode/view-qrcode.component';
import { ListDocumentComponent } from './list-document/list-document.component';
import { ListFollowupDocumentComponent } from './list-followup-document/list-followup-document.component';
import { MyDocumentComponent } from './my-document/my-document.component';
import {AddNoteHukmComponent} from './detail-document/execution-note/add-note-hukm.component';
import { DocFollowupActivityComponent } from './detail-document/follow-up-document/doc-followup-activity/doc-followup-activity.component';
import {ViewExecutionDocumentComponent} from './detail-document/execution-document/view-execution-document/view-execution-document.component';

export const routes: Routes = [
	{
		path: '',
		component: DocumentComponent,
		pathMatch: 'full'
	},
	{
		path: 'followups',
		component: ListFollowupDocumentComponent,
		pathMatch: 'full'
	},
	{
		path: 'add',
		component: CreateDocumentComponent,
		data: {'type': 'document'},
		pathMatch: 'full'
	},
	{
		path: 'my/add',
		component: CreateDocumentComponent,
		data: {'route': 'my'},
		pathMatch: 'full'
	},
	{
		path: 'my/:id',
		component: DetailDocumentComponent,
		data: {'route': 'my'},
		pathMatch: 'full'
	},
	{
		path: 'my/:id/executions',
		component: DetailDocumentComponent,
		data: {'route': 'my'},
		pathMatch: 'full'
	},
	{
		path: 'my/:id/executions/add',
		component: CreateExecutionDocumentComponent,
		data: {'route': 'my'},
		pathMatch: 'full'
	},
	{
		path: 'my/:id/executions/:executionId/edit',
		component: EditExecutionDocumentComponent,
		data: {'route': 'my'},
		pathMatch: 'full'
	},
	{
		path: 'my/:id/comments',
		component: DetailDocumentComponent,
		data: {'route': 'my'},
		pathMatch: 'full'
	},
	{
		path: 'my/:id/followups',
		component: DetailDocumentComponent,
		data: {'route': 'my'},
		pathMatch: 'full'
	},
	{
		path: 'my/:id/attachments',
		component: DetailDocumentComponent,
		data: {'route': 'my'},
		pathMatch: 'full'
	},
	{
		path: 'my',
		loadChildren: () => import('./my-document/my-document.module').then(m => m.MyDocumentModule)
	},
	{
		path: 'draft',
		loadChildren: () => import('./draft-document/draft-document.module').then(m => m.DraftDocumentModule)
	},
	{
		path: 'receivable',
		loadChildren: () => import('./receivable-document/receivable-document.module').then(m => m.ReceivableDocumentModule)
	},
	{
		path: ':id',
		component: DetailDocumentComponent,
		pathMatch: 'full'
	},
	{
		path: ':id/executions',
		component: DetailDocumentComponent,
		pathMatch: 'full'
	},
	{
		path: ':id/executions/add',
		component: CreateDocumentComponent,
		data: {'route': '', 'type': 'execution'},
		pathMatch: 'full'
	},
	{
		path: ':id/comments',
		component: DetailDocumentComponent,
		pathMatch: 'full'
	},
	{
		path: ':id/followups',
		component: DetailDocumentComponent,
		pathMatch: 'full'
	},
	{
		path: ':id/attachments',
		component: DetailDocumentComponent,
		pathMatch: 'full'
	},
	{
		path: ':id/edit',
		component: EditDocumentComponent,
		pathMatch: 'full'
	}
]

@NgModule({
	declarations: [DocumentComponent, ViewDocumentComponent, CreateDocumentComponent, EditDocumentComponent, DetailDocumentComponent, CommentDocumentComponent, ExecutionDocumentComponent,
		DeleteAttachmentComponent, PrintPreviewComponent, HistoryDocumentComponent, CreateCommentDocumentComponent, CreateExecutionDocumentComponent, EditExecutionDocumentComponent, AttachmentDocumentComponent, SearchDocumentComponent,
		FollowUpDocumentComponent, CreateFollowUpDocumentComponent, EditFollowUpDocumentComponent, EvaluateDocumentComponent, ViewQrcodeComponent, ListDocumentComponent, ListFollowupDocumentComponent,AddNoteHukmComponent, 
		DocFollowupActivityComponent, ViewExecutionDocumentComponent],
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
		QuillModule.forRoot(),
		EditorModule
	]
})
export class DocumentModule { }
