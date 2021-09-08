import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./template/layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./template/layouts/content/content-layout.component";

import { Full_ROUTES } from "./template/shared/routes/full-layout.routes";
// import { CONTENT_ROUTES } from "./template/shared/routes/content-layout.routes";
import { ROUTES } from './template/shared/vertical-menu/vertical-menu-routes.config';
import { HROUTES } from './template/shared/horizontal-menu/navigation-routes.config';

import { AuthGuard } from './template/shared/auth/auth-guard.service';

const appRoutes: Routes = [
  {
    path: 'doc_mng',
    loadChildren: () => import('./doc-mng/doc-mng.module').then(m => m.DocMngModule)
  },
  {
    path: 'task_mng',
    loadChildren: () => import('./task-mng/task-mng.module').then(m => m.TaskMngModule)
  },
  {
    path: 'reception',
    loadChildren: () => import('./reception/reception.module').then(m => m.ReceptionModule)
  },
  {
    path: 'hr',
    loadChildren: () => import('./hr/hr.module').then(m => m.HrModule)
  },
  {
    path: 'finance',
    loadChildren: () => import('./finance/finance.module').then(m => m.FinanceModule)
  },
  {
    path: 'transport',
    loadChildren: () => import('./transportation/transportation.module').then(m => m.TransportationModule)
  },
  {
    path: 'library',
    loadChildren: () => import('./library/library.module').then(m => m.LibraryModule)
  },
  {
    path: 'helpdesk',
    loadChildren: () => import('./helpdesk/helpdesk.module').then(m => m.HelpdeskModule)
  },
  {
    path: 'administration',
    canActivate:[AuthGuard],
    component: FullLayoutComponent,
    data: {HROUTES: HROUTES, VROUTES: ROUTES},
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'todos',
        loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m =>m.AdminModule)
      },
    {
      path: 'configuration',
      loadChildren: () => import('./configuration/configuration.module').then(m =>m.ConfigurationModule)
    },
    {
      path: 'editprofiles',
      loadChildren: () => import('./edit_profile_menu/edit_profile_menu_bar.module').then(m=>m.EditProfileMenuBarModule)
    },
    {
      path: 'signiturepath',
      loadChildren: () => import('./signiture_path/signiture_path.module').then(m => m.SigniturePathModule)
    },

    ]
  },
  {
    path: '',
    redirectTo: 'select-lang',
    pathMatch: 'full',
  },
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '', component: ContentLayoutComponent,
    data: { title: 'content Views' },
    children: [{
      path: '',
      loadChildren: () => import('./public-pages/public-pages.module').then(m => m.PublicPagesModule)
    }]
  },
  { path: 'template', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [AuthGuard] },
  // { path: 'template', component: ContentLayoutComponent, data: { title: 'conten  t Views' }, children: CONTENT_ROUTES },
  {
    path: '**',
    redirectTo: 'error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
