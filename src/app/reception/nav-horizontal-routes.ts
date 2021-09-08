import { RouteInfo } from './../template/shared/vertical-menu/vertical-menu.metadata';

export const HROUTES: RouteInfo[] = [
	{ path: '/', title: 'HOME', icon: 'ft-bar-chart-2', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{ path: '/reception', title: 'RECEPTION', icon: 'ft-grid', role: 'RECEPTION_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{ path: '/reception/dashboard', title: 'DASHBOARD', icon: 'ft-pie-chart', role: 'RECEP_DASHBOARD', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{ path: '/reception/visits/my', title: 'MY_VISITS', icon: 'ft-bar-chart-2', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{
		path: '', title: 'SCHEDULING_VISITS', icon: 'ft ft-settings', role: 'RECEP_SCHEDULING', class: 'dropdown nav-item has-sub', isExternalLink: false,
		submenu: [
		  { path: '/reception/visits/schedules/visitors', title: 'SCHEDULED_VISITORS', icon: 'ft-clock', role: 'RECEP_VISITOR_SCHEDULE_LIST', class: 'dropdown-item', isExternalLink: false, submenu: [] },
		  { path: '/reception/visits/schedules/vehicles', title: 'SCHEDULED_VEHICLES', icon: 'ft-monitor', role: 'RECEP_VEHICLE_SCHEDULE_LIST', class: 'dropdown-item', isExternalLink: false, submenu: [] },
		]
	},
	{ path: '/reception/visits', title: 'VISITS', icon: 'ft-file-text', role: 'RECEP_VISIT_LIST', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{ path: '/reception/visitors', title: 'VISITORS', icon: 'ft-users', role: 'RECEP_VISITOR_LIST', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{ path: '/reception/vehicles', title: 'VEHICLES', icon: 'ft-truck', role: 'RECEP_VEHICLE_LIST', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{ path: '/reception/wiki', title: 'WIKI', icon: 'ft-book', role: 'RECEP_WIKI', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
];
