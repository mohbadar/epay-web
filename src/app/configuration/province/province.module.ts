import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { TranslateModule } from "@ngx-translate/core";

import { ProvinceRoutes } from "./province.routing";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ToastrModule } from "ngx-toastr";
import { ProvinceComponent } from "./province.component";
import { ProvinceCreateDialogComponent } from "./dialogs/province-create-dialog/province-create-dialog.component";
import { ProvinceEditDialogComponent } from "./dialogs/province-edit-dialog/province-edit-dialog.component";
import { ProvinceViewDialogComponent } from "./dialogs/province-view-dialog/province-view-dialog.component";
import { ProvinceDeleteDialogComponent } from "./dialogs/province-delete-dialog/province-delete-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    // JwBootstrapSwitchNg2Module,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(ProvinceRoutes),
    NgxDatatableModule,
    NgxSpinnerModule
  ],
  declarations: [
    ProvinceComponent,
    ProvinceCreateDialogComponent,
    ProvinceEditDialogComponent,
    ProvinceViewDialogComponent,
    ProvinceDeleteDialogComponent
  ],
})
export class ProvinceModule {}
