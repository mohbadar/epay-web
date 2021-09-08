import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { TranslateModule } from "@ngx-translate/core";

import { DistrictRoutes } from "./district.routing";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ToastrModule } from "ngx-toastr";
import { DistrictComponent } from "./district.component";
import { DistrictCreateDialogComponent } from "./dialogs/district-create-dialog/district-create-dialog.component";
import { DistrictEditDialogComponent } from "./dialogs/district-edit-dialog/district-edit-dialog.component";
import { DistrictViewDialogComponent } from "./dialogs/district-view-dialog/district-view-dialog.component";
import { DistrictDeleteDialogComponent } from "./dialogs/district-delete-dialog/district-delete-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    // JwBootstrapSwitchNg2Module,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(DistrictRoutes),
    NgxDatatableModule,
    NgxSpinnerModule
  ],
  declarations: [
    DistrictComponent,
    DistrictCreateDialogComponent,
    DistrictEditDialogComponent,
    DistrictViewDialogComponent,
    DistrictDeleteDialogComponent
  ],
})
export class DistrictModule {}
