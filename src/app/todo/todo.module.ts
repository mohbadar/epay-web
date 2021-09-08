import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { ViewTodoComponent } from './view-todo/view-todo.component';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { RouterModule, Routes } from '@angular/router';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'app/template/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';

export const routes: Routes = [
	{
		path: '',
		component: TodoComponent,
		pathMatch:  'full'
	},
]

@NgModule({
  declarations: [TodoComponent, ViewTodoComponent, CreateTodoComponent, EditTodoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
		NgbModule,
		PipeModule,
		SharedModule,
    TranslateModule,
    FormsModule,
		ReactiveFormsModule,
		NgSelectModule,
		NgxSpinnerModule,
  ]
})
export class TodoModule { }
