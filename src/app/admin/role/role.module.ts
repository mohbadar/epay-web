import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { RoleRoutes } from './role.routing';
// import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';

import { RoleComponent } from './role.component';
import { RoleCreateDialogComponent } from './dialogs/role-create-dialog/role-create-dialog.component';
import { RoleEditDialogComponent } from './dialogs/role-edit-dialog/role-edit-dialog.component';
import { RoleViewDialogComponent } from './dialogs/role-view-dialog/role-view-dialog.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    // JwBootstrapSwitchNg2Module,
    FormsModule,
    RouterModule.forChild(RoleRoutes),
    NgxDatatableModule,
    NgxSpinnerModule,
    NgSelectModule
  ],
  entryComponents: [
    RoleCreateDialogComponent,
    RoleEditDialogComponent,
    RoleViewDialogComponent
  ],
  declarations: [
    RoleComponent,
    RoleCreateDialogComponent,
    RoleEditDialogComponent,
    RoleViewDialogComponent,
  ]
})
export class RoleModule { }
