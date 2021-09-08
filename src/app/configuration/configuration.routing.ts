import { Routes } from "@angular/router";
import { JobModule } from "./job/job.module";

export const ConfigurationRoutes: Routes = [
	{
		path: 'countries',
		loadChildren: () => import('./country/country.module').then(m => m.CountryModule)
	},
	{
		path: 'ministries',
		loadChildren: () => import('./ministry/ministry.module').then(m => m.MinistryModule)
	},
	{
		path: 'departments',
		loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule)
	},
	{
		path: 'authorities',
		loadChildren: () => import('./authority/authority.module').then(m => m.AuthorityModule)
	}
	,
	{
		path: 'commissions',
		loadChildren: () => import('./commission/commission.module').then(m => m.CommissionModule)
	},
	{
		path: 'provinces',
		loadChildren: () => import('./province/province.module').then(m => m.ProvinceModule)
	}
	,
	{
		path: 'districts',
		loadChildren: () => import('./district/district.module').then(m => m.DistrictModule)
	}
  ,
	{
		path: 'jobs',
		loadChildren: () => import('./job/job.module').then(m => JobModule)
	}

];
