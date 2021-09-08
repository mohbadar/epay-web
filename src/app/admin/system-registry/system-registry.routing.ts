import { Routes } from '@angular/router';

import { SystemRegistryComponent } from './system-registry.component';

export const SystemRegistryRoutes: Routes = [
    {
        path: '',
        component: SystemRegistryComponent,
        pathMatch:  'full'
    }
];
