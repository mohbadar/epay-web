import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SystemRegistryRoutes } from './system-registry.routing';
// import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { SystemRegistryComponent } from './system-registry.component';
import { TranslateModule } from '@ngx-translate/core';

import { SystemRegistryCreateDialogComponent } from './dialogs/system-registry-create-dialog/system-registry-create-dialog.component';
import { SystemRegistryEditDialogComponent } from './dialogs/system-registry-edit-dialog/system-registry-edit-dialog.component';
import { SystemRegistryViewDialogComponent } from './dialogs/system-registry-view-dialog/system-registry-view-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    // JwBootstrapSwitchNg2Module,
    RouterModule.forChild(SystemRegistryRoutes),
  ],
  entryComponents: [
    SystemRegistryCreateDialogComponent,
    SystemRegistryEditDialogComponent,
    SystemRegistryViewDialogComponent
  ],
  declarations: [
    SystemRegistryComponent,
    SystemRegistryCreateDialogComponent,
    SystemRegistryEditDialogComponent,
    SystemRegistryViewDialogComponent
  ]
})
export class SystemRegistryModule { }
