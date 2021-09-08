import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { TranslateModule } from "@ngx-translate/core";

import { CommissionRoutes } from "./comission.routing";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ToastrModule } from "ngx-toastr";
import { CommissionCreateDialogComponent } from "./dialogs/commission-create-dialog/commission-create-dialog.component";
import { CommissionEditDialogComponent } from "./dialogs/commission-edit-dialog/commission-edit-dialog.component";
import { CommissionViewDialogComponent } from "./dialogs/commission-view-dialog/commission-view-dialog.component";
import { CommissionDeleteDialogComponent } from "./dialogs/commission-delete-dialog/commission-delete-dialog.component";
import { CommissionComponent } from "./commision.component";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    // JwBootstrapSwitchNg2Module,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(CommissionRoutes),
    NgxDatatableModule,
    NgxSpinnerModule
  ],
  declarations: [
    CommissionComponent,
    CommissionCreateDialogComponent,
    CommissionEditDialogComponent,
    CommissionViewDialogComponent,
    CommissionDeleteDialogComponent
  ],
})
export class CommissionModule {}
