import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { TranslateModule } from "@ngx-translate/core";

import { PositionRoutes } from "./job.routing";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ToastrModule } from "ngx-toastr";
import { JobComponent } from "./job.component";
import { JobCreateDialogComponent } from "./dialogs/job-create-dialog/job-create-dialog.component";
import { JobEditDialogComponent } from "./dialogs/job-edit-dialog/job-edit-dialog.component";
import { JobViewDialogComponent } from "./dialogs/job-view-dialog/job-view-dialog.component";
import { JobDeleteDialogComponent } from "./dialogs/job-delete-dialog/job-delete-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    // JwBootstrapSwitchNg2Module,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(PositionRoutes),
    NgxDatatableModule,
    NgxSpinnerModule
  ],
  declarations: [
    JobComponent,
    JobCreateDialogComponent,
    JobEditDialogComponent,
    JobViewDialogComponent,
    JobDeleteDialogComponent
  ],
})
export class JobModule {}
