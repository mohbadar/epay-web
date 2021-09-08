import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { TranslateModule } from "@ngx-translate/core";

import { PositionRoutes } from "./country.routing";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ToastrModule } from "ngx-toastr";
import { CountryComponent } from "./country.component";
import { CountryCreateDialogComponent } from "./dialogs/country-create-dialog/country-create-dialog.component";
import { CountryEditDialogComponent } from "./dialogs/country-edit-dialog/country-edit-dialog.component";
import { CountryViewDialogComponent } from "./dialogs/country-view-dialog/country-view-dialog.component";
import { CountryDeleteDialogComponent } from "./dialogs/country-delete-dialog/country-delete-dialog.component";

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
    CountryComponent,
    CountryCreateDialogComponent,
    CountryEditDialogComponent,
    CountryViewDialogComponent,
    CountryDeleteDialogComponent
  ],
})
export class CountryModule {}
