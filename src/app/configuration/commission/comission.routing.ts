import { Routes } from '@angular/router';

import { CommissionComponent } from './commision.component';

export const CommissionRoutes: Routes = [
    {
        path: '',
        component: CommissionComponent,
        pathMatch:  'full'
    }
];
