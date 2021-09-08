import { AddTaskCompletionDateComponent } from './task/view-task/add-task-completion-date/add-task-completion-date.component';
import { AddTaskDueDateComponent } from './task/view-task/add-task-due-date/add-task-due-date.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskMngComponent } from './task-mng.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'app/template/shared/shared.module';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { TaskComponent } from './task/task.component';
import { ProjectComponent } from './project/project.component';
import { ViewProjectComponent } from './project/view-project/view-project.component';
import { EditProjectComponent } from './project/edit-project/edit-project.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';
import { ViewTaskComponent } from './task/view-task/view-task.component';
import { EditTaskComponent } from './task/edit-task/edit-task.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { TaskboardComponent } from './taskboard/taskboard.component';
import { ViewTaskboardComponent } from './taskboard/view-taskboard/view-taskboard.component';
import { CreateTaskboardComponent } from './taskboard/create-taskboard/create-taskboard.component';
import { TagInputModule } from 'ngx-chips';
import { DragulaModule } from 'ng2-dragula';
import { CreateTaskboardStatusComponent } from './taskboard/create-taskboard-status/create-taskboard-status.component';
import { HROUTES } from './nav-horizontal-routes';
import { VROUTES } from './nav-vertical-routes';
import { AuthGuard } from 'app/template/shared/auth/auth-guard.service';
import { FullLayoutComponent } from 'app/template/layouts/full/full-layout.component';
import { AddTaskboardMemberComponent } from './taskboard/add-taskboard-member/add-taskboard-member.component';
import { EditTaskboardComponent } from './taskboard/edit-taskboard/edit-taskboard.component';
import { AddTaskAttachmentComponent } from './task/view-task/add-task-attachment/add-task-attachment.component';
import { AddTaskExecutionComponent } from './task/view-task/add-task-execution/add-task-execution.component';
import { AddSubTaskComponent } from './task/view-task/add-sub-task/add-sub-task.component';
import { AddParentTaskComponent } from './task/view-task/add-parent-task/add-parent-task.component';
import { NouisliderModule } from 'ng2-nouislider';
import { AddTaskAssigneeComponent } from './task/view-task/add-task-assignee/add-task-assignee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { ChartistModule } from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ArchivedTasksComponent } from './taskboard/archived-tasks/archived-tasks.component';


export const routes: Routes = [
	{
		path: '',
		canActivate:[AuthGuard],
		component: FullLayoutComponent,
		data: {HROUTES: HROUTES, VROUTES: VROUTES},
		children: [
			{
				path: '',
				component: TaskMngComponent,
				pathMatch:  'full'
			},
			{
				path: 'taskboards',
				component: TaskboardComponent,
				pathMatch:  'full'
			},
			{
				path: 'taskboards/:id',
				component: ViewTaskboardComponent,
				pathMatch:  'full'
			},
			{
				path: 'tasks',
				component: TaskComponent,
				pathMatch:  'full'
			},
			{
				path: 'tasks/:id',
				component: ViewTaskComponent,
				pathMatch:  'full'
			},
			{
				path: 'tasks/:id/edit',
				component: EditTaskComponent,
				pathMatch:  'full'
			},
      {
        path: 'dashboard',
        component:DashboardComponent,
        pathMatch:'full'
      },
		]
	}
];

@NgModule({
  declarations: [TaskMngComponent, TaskComponent, ProjectComponent, ViewProjectComponent, EditProjectComponent, CreateProjectComponent, ViewTaskComponent, EditTaskComponent, CreateTaskComponent, TaskboardComponent, ViewTaskboardComponent, CreateTaskboardComponent, CreateTaskboardStatusComponent, AddTaskboardMemberComponent, EditTaskboardComponent, AddTaskAttachmentComponent, AddTaskExecutionComponent, AddSubTaskComponent, AddParentTaskComponent, AddTaskAssigneeComponent, DashboardComponent, ArchivedTasksComponent, AddTaskDueDateComponent, AddTaskCompletionDateComponent],
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
		TagInputModule,
		DragulaModule.forRoot(),
		NouisliderModule,
    ChartsModule,
    ChartistModule,
    NgxChartsModule,
    NgApexchartsModule,
    NgxSpinnerModule,
  ]
})
export class TaskMngModule { }
