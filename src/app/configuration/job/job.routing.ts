import { Routes } from '@angular/router';

import { JobComponent } from './job.component';

export const PositionRoutes: Routes = [
    {
        path: '',
        component: JobComponent,
        pathMatch:  'full'
    }
];
