import { Routes } from "@angular/router";

export const AdminRoutes: Routes = [
	{
		path: 'users',
		loadChildren: () => import('./user/user.module').then(m => m.UserModule)
	}, 
	{
		path: 'roles',
		loadChildren: () => import('./role/role.module').then(m => m.RoleModule)
	}, 
	{
		path: 'groups',
		loadChildren: () => import('./group/group.module').then(m => m.GroupModule)
	},
	{
		path: 'permissions',
		loadChildren: () => import('./permission/permission.module').then(m => m.PermissionModule)
	},
	{
		path: 'sys_reg',
		loadChildren: () => import('./system-registry/system-registry.module').then(m => m.SystemRegistryModule)
	},
];
