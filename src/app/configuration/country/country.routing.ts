import { Routes } from '@angular/router';

import { CountryComponent } from './country.component';

export const PositionRoutes: Routes = [
    {
        path: '',
        component: CountryComponent,
        pathMatch:  'full'
    }
];
