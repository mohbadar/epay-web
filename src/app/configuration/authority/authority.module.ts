import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { TranslateModule } from "@ngx-translate/core";

import { AuthorityRoutes } from "./authority.routing";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ToastrModule } from "ngx-toastr";
import { AuthorityComponent } from "./authority.component";
import { AuthorityCreateDialogComponent } from "./dialogs/authority-create-dialog/authority-create-dialog.component";
import { AuthorityEditDialogComponent } from "./dialogs/authority-edit-dialog/authority-edit-dialog.component";
import { AuthorityViewDialogComponent } from "./dialogs/authority-view-dialog/authority-view-dialog.component";
import { AuthorityDeleteDialogComponent } from "./dialogs/authority-delete-dialog/authority-delete-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    // JwBootstrapSwitchNg2Module,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(AuthorityRoutes),
    NgxDatatableModule,
    NgxSpinnerModule
  ],
  declarations: [
    AuthorityComponent,
    AuthorityCreateDialogComponent,
    AuthorityEditDialogComponent,
    AuthorityViewDialogComponent,
    AuthorityDeleteDialogComponent
  ],
})
export class AuthorityModule {}
