import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { TranslateModule } from "@ngx-translate/core";

import { DepartmentRoutes } from "./department.routing";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ToastrModule } from "ngx-toastr";
import { DepartmentComponent } from "./department.component";
import { DepartmentCreateDialogComponent } from "./dialogs/department-create-dialog/department-create-dialog.component";
import { DepartmentEditDialogComponent } from "./dialogs/department-edit-dialog/department-edit-dialog.component";
import { DepartmentViewDialogComponent } from "./dialogs/department-view-dialog/department-view-dialog.component";
import { DepartmentDeleteDialogComponent } from "./dialogs/department-delete-dialog/department-delete-dialog.component";
import { EditorModule } from "@tinymce/tinymce-angular";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    // JwBootstrapSwitchNg2Module,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(DepartmentRoutes),
    NgxDatatableModule,
    NgxSpinnerModule,
    EditorModule
  ],
  declarations: [
    DepartmentComponent,
    DepartmentCreateDialogComponent,
    DepartmentEditDialogComponent,
    DepartmentViewDialogComponent,
    DepartmentDeleteDialogComponent
  ],
})
export class DepartmentModule {}
