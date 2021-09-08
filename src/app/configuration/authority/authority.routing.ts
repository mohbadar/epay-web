import { Routes } from '@angular/router';

import { AuthorityComponent } from './authority.component';

export const AuthorityRoutes: Routes = [
    {
        path: '',
        component: AuthorityComponent,
        pathMatch:  'full'
    }
];
