import { Routes } from '@angular/router';

import { DistrictComponent } from './district.component';

export const DistrictRoutes: Routes = [
    {
        path: '',
        component: DistrictComponent,
        pathMatch:  'full'
    }
];
