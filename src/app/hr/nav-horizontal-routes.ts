import { RouteInfo } from './../template/shared/vertical-menu/vertical-menu.metadata';

export const HROUTES: RouteInfo[] = [
	{ path: '/', title: 'HOME', icon: 'ft-bar-chart-2', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{ path: '/doc_mng/dashboard', title: 'DASHBOARD', icon: 'ft-bar-chart-2', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{ path: '/hr/employees', title: 'EMPLOYEES', icon: 'ft-bar-chart-2', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{ path: '/hr/timesheets', title: 'TIMESHEETS', icon: 'ft-bar-chart-2', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
];
