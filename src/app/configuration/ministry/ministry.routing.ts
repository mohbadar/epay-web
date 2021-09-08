import { Routes } from '@angular/router';

import { MinistryComponent } from './ministry.component';

export const MinistryRoutes: Routes = [
    {
        path: '',
        component: MinistryComponent,
        pathMatch:  'full'
    }
];
