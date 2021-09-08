import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { UserRoutes } from "./user.routing";
import { TranslateModule } from "@ngx-translate/core";

import { UserComponent } from "./user.component";
import { UserCreateDialogComponent } from "./dialogs/user-create-dialog/user-create-dialog.component";
import { UserEditDialogComponent } from "./dialogs/user-edit-dialog/user-edit-dialog.component";
import { UserViewDialogComponent } from "./dialogs/user-view-dialog/user-view-dialog.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxSpinnerModule } from "ngx-spinner";
import { UiSwitchModule } from "ngx-ui-switch";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        // JwBootstrapSwitchNg2Module,
        FormsModule,
        NgSelectModule,
        ReactiveFormsModule,
        RouterModule.forChild(UserRoutes),
        NgxDatatableModule,
        NgxSpinnerModule,
        UiSwitchModule
    ],
    declarations: [
        UserComponent,
        UserCreateDialogComponent,
        UserEditDialogComponent,
        UserViewDialogComponent,
    ],
})
export class UserModule { }
