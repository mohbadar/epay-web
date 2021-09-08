import { Routes } from '@angular/router';

import { ProvinceComponent } from './province.component';

export const ProvinceRoutes: Routes = [
    {
        path: '',
        component: ProvinceComponent,
        pathMatch:  'full'
    }
];
