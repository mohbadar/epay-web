import { RouteInfo } from './../template/shared/vertical-menu/vertical-menu.metadata';

export const HROUTES: RouteInfo[] = [
	{ path: '/', title: 'HOME', icon: 'ft-codepen', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{ path: '/doc_mng', title: 'DOC_MANAGEMENT', icon: 'ft-home', role: 'DOC_MANAGEMENT_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{path: '', title: 'DASHBOARD', icon: 'ft ft-settings', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false,
	 submenu: [
		{ path: '/doc_mng/dashboard/mydashboard', title: 'MY_DASHBOARD', icon: 'ft-clock', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
		{ path: '/doc_mng/dashboard/generaldashboard', title: 'GENERAL_DASHBOARD', icon: 'ft-monitor', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
    ] 
    },
	{ path: '/doc_mng/documents/my', title: 'MY_DOCUMENTS', icon: 'ft-file-text', role: 'DOC_MANAGEMENT_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{ path: '/doc_mng/documents/draft', title: 'DRAFT_DOCUMENTS', icon: 'ft-clipboard', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{ path: '/doc_mng/documents/receivable', title: 'RECEIVABLE_DOCUMENTS', icon: 'ft-bar-chart-2', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },

	{ path: '/doc_mng/documents', title: 'DOCUMENTS', icon: 'ft-file', role: 'DOCMNG_DOCUMENT_LIST', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
	{
		path: '', title: 'CONFIGURATIONS', icon: 'ft ft-settings', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false,
		submenu: [
			{ path: '/doc_mng/config/document_types', title: 'DOCUMENT_TYPE_LIST', icon: 'ft-clock', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
			{ path: '/doc_mng/config/document_type_templates', title: 'DOCUMENT_TYPE_TEMPLATE_LIST', icon: 'ft-monitor', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
			{ path: '/doc_mng/config/gallery', title: 'GALLERY', icon: 'ft-monitor', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
		]
	},

];
