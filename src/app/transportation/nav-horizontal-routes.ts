import { RouteInfo } from './../template/shared/vertical-menu/vertical-menu.metadata';

export const HROUTES: RouteInfo[] = [
	{ path: '/', title: 'HOME', icon: 'ft-bar-chart-2', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{ path: '/transport', title: 'TRANSPORT', icon: 'ft-grid', role: 'TRANSPORTATION_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{ path: '/transport/dashboard', title: 'DASHBOARD', icon: 'ft-pie-chart', role: 'TRANS_DASHBOARD', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{ path: '/transport/requests/my', title: 'MY_REQUESTS', icon: 'ft-file-text', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{ path: '/transport/requests', title: 'REQUESTS', icon: 'ft-file-text', role: 'TRANS_REQUEST_LIST', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{ path: '/transport/drivers', title: 'DRIVERS', icon: 'ft-users', role: 'TRANS_DRIVER_LIST', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{ path: '/transport/vehicles', title: 'VEHICLES', icon: 'ft-truck', role: 'TRANS_VEHICLE_LIST', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
];
