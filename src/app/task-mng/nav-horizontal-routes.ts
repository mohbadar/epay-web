import { RouteInfo } from './../template/shared/vertical-menu/vertical-menu.metadata';

export const HROUTES: RouteInfo[] = [
	{ path: '/', title: 'HOME', icon: 'ft-bar-chart-2', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{ path: '/task_mng', title: 'TASK_MANAGEMENT', icon: 'ft-grid', role: 'TASK_MANAGEMENT_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{ path: '/task_mng/dashboard', title: 'DASHBOARD', icon: 'ft-bar-chart-2', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{ path: '/task_mng/taskboards', title: 'TASKBOARDS', icon: 'ft-bar-chart-2', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{ path: '/task_mng/tasks', title: 'TASKS', icon: 'ft-bar-chart-2', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
];
