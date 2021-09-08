import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

import { MinistryRoutes } from "./ministry.routing";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ToastrModule } from "ngx-toastr";
import { MinistryComponent } from "./ministry.component";
import { MinistryCreateDialogComponent } from "./dialogs/ministry-create-dialog/ministry-create-dialog.component";
import { MinistryViewDialogComponent } from "./dialogs/ministry-view-dialog/ministry-view-dialog.component";
import { MinistryEditDialogComponent } from "./dialogs/ministry-edit-dialog/ministry-edit-dialog.component";
import { MinistryDeleteDialogComponent } from "./dialogs/ministry-delete-dialog/ministry-delete-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(MinistryRoutes),
    NgxDatatableModule,
    NgxSpinnerModule
  ],
  declarations: [
    MinistryComponent,
    MinistryCreateDialogComponent,
    MinistryViewDialogComponent,
    MinistryEditDialogComponent,
    MinistryDeleteDialogComponent
  ],
})
export class MinistryModule {}
