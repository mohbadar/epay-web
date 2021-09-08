import { RouteInfo } from "../vertical-menu/vertical-menu.metadata";

export const HROUTES: RouteInfo[] = [
  { path: '/', title: 'HOME', icon: 'ft-bar-chart-2', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
  { path: '/todos', title: 'TODO_LIST', icon: 'ft-bar-chart-2', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
  {
    path: '', title: 'MODULES', icon: 'ft ft-settings', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false,
    submenu: [
      { path: '/reception', title: 'RECEPTION', icon: 'ft-clock', role: 'RECEPTION_MODULE', class: 'dropdown-item', isExternalLink: false, submenu: [] },
      { path: '/helpdesk', title: 'HELPDESK', icon: 'ft-monitor', role: 'HELPDESK_MODULE', class: 'dropdown-item', isExternalLink: false, submenu: [] },
      { path: '/transport', title: 'TRANSPORT', icon: 'ft-truck', role: 'TRANSPORTATION_MODULE', class: 'dropdown-item', isExternalLink: false, submenu: [] },
      { path: '/hr', title: 'HR', icon: 'ft-users', role: 'HR_MODULE', class: 'dropdown-item', isExternalLink: false, submenu: [] },
      { path: '/task_mng', title: 'TASK_MANAGEMENT', icon: 'ft-clipboard', role: 'TASK_MANAGEMENT_MODULE', class: 'dropdown-item', isExternalLink: false, submenu: [] },
      { path: '/doc_mng', title: 'DOC_MANAGEMENT', icon: 'ft-file-text', role: 'SYS_REG_LIST', class: 'dropdown-item', isExternalLink: false, submenu: [] },
    ]
  },
  // { path: '/reception', title: 'RECEPTION', icon: 'ft-clock', role: 'RECEPTION_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
  // { path: '/helpdesk', title: 'HELPDESK', icon: 'ft-clock', role: 'HELPDESK_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
  // { path: '/transport', title: 'TRANSPORATION', icon: 'ft-clock', role: 'TRANSPORTATION_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
  // { path: '/hr', title: 'HR', icon: 'ft-users', role: 'HR_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
  // { path: '/task_mng', title: 'TASK_MANAGEMENT', icon: 'ft-clock', role: 'TASK_MANAGEMENT_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
  // { path: '/library', title: 'LIBRARY', icon: 'ft-clock', role: 'LIBRARY_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
  // { path: '/profiles', title: 'PROFILE', icon: 'ft-home', role: 'PROFILE_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
  // { path: '/proposal', title: 'PROPOSAL', icon: 'ft-aperture', role: 'PROPOSAL_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
  // { path: '/decrees', title: 'DECREE', icon: 'ft-box', role: 'DECREE_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
  // { path: '/complaints', title: 'COMPLAINT', icon: 'ft-edit-1', role: 'COMPLAINT_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
  // { path: '/promotions', title: 'PROMOTION', icon: 'ft-info', role: 'PROMOTION_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
  // { path: '/retirements', title: 'RETIREMENT', icon: 'ft-box', role: 'RETIREMENT_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [] },
  {
      path: '', title: 'SETTINGS', icon: 'ft ft-settings', role: 'ADMIN_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false,
      submenu: [
        { path: '/admin/users', title: 'USER', icon: 'ft-arrow-right submenu-icon', role: 'USER_LIST', class: 'dropdown-item', isExternalLink: false, submenu: [] },
        { path: '/admin/groups', title: 'GROUP', icon: 'ft-arrow-right submenu-icon', role: 'GROUP_LIST', class: 'dropdown-item', isExternalLink: false, submenu: [] },
        { path: '/admin/roles', title: 'ROLE', icon: 'ft-arrow-right submenu-icon', role: 'ROLE_LIST', class: 'dropdown-item', isExternalLink: false, submenu: [] },
        { path: '/admin/permissions', title: 'PERMISSION', icon: 'ft-arrow-right submenu-icon', role: 'SYS_REG_LIST', class: 'dropdown-item', isExternalLink: false, submenu: [] },
        // { path: '/admin/sys_reg', title: 'SYSTEM_REGISTRY', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
      ]
  },
  {
    path: '', title: 'CONFIGURATIONS', icon: 'ft ft-lock', role: 'CONFIG_MODULE', class: 'dropdown nav-item has-sub', isExternalLink: false,
    submenu: [
      { path: '/configuration/ministries', title: 'MINISTRY', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
      { path: '/configuration/departments', title: 'DEPARTMENT', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
      { path: '/configuration/authorities', title: 'AUTHORITY', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
      { path: '/configuration/commissions', title: 'COMMISSION', icon: 'ft-arrow-right submenu-icon', role: '',  class: 'dropdown-item', isExternalLink: false, submenu: [] },
      { path: '/configuration/countries', title: 'COUNTRY', icon: 'ft-arrow-right submenu-icon', role: '',  class: 'dropdown-item', isExternalLink: false, submenu: [] },
      { path: '/configuration/provinces', title: 'PROVINCE', icon: 'ft-arrow-right submenu-icon', role: '',  class: 'dropdown-item', isExternalLink: false, submenu: [] },
      { path: '/configuration/districts', title: 'DISTRICT', icon: 'ft-arrow-right submenu-icon', role: '',  class: 'dropdown-item', isExternalLink: false, submenu: [] },
      { path: '/configuration/jobs', title: 'JOBS', icon: 'ft-arrow-right submenu-icon', role: '',  class: 'dropdown-item', isExternalLink: false, submenu: [] },
    ]
  },


  // {
  //   path: '', title: 'Dashboard', icon: 'ft-home', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false,
  //   submenu: [
  //     { path: '/template/dashboard/dashboard1', title: 'Dashboard 1', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/template/dashboard/dashboard2', title: 'Dashboard 2', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] }
  //   ]
  // },
  // {
  //   path: '', title: 'Dashboard', icon: 'ft-home', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false,
  //   submenu: [
  //     { path: '/template/dashboard/dashboard1', title: 'Dashboard 1', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/template/dashboard/dashboard2', title: 'Dashboard 2', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] }
  //   ]
  // },
  // {
  //   path: '', title: 'Apps', icon: 'ft-box', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false,
  //   submenu: [
  //     { path: '/template/inbox', title: 'Email', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/template/chat', title: 'Chat', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/template/chat-ngrx', title: 'Chat NgRx', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/template/taskboard', title: 'Task Board', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/template/taskboard-ngrx', title: 'Task Board NgRx', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/template/calendar', title: 'Calendar', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] }
  //   ]
  // },
  // {
  //   path: '', title: 'UI Kit', icon: 'ft-aperture', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false,
  //   submenu: [
  //     { path: '/template/uikit/grids', title: 'Grid', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/template/uikit/typography', title: 'Typography', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/template/uikit/syntaxhighlighter', title: 'Syntax Highlighter', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/template/uikit/helperclasses', title: 'Helper Classes', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/template/uikit/textutilities', title: 'Text Utilities', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/template/uikit/colorpalettes', title: 'Color Palette', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     {
  //       path: '', title: 'Icons', icon: 'ft-arrow-right submenu-icon', role: '', class: 'has-sub', isExternalLink: false,
  //       submenu: [
  //         { path: '/template/uikit/feather', title: 'Feather Icon', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/uikit/font-awesome', title: 'Font Awesome Icon', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/uikit/simple-line', title: 'Simple Line Icon', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] }
  //       ]
  //     },
  //   ]
  // },
  // {
  //   path: '', title: 'Components', icon: 'ft-briefcase', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false,
  //   submenu: [
  //     {
  //       path: '', title: 'Cards', icon: 'ft-arrow-right submenu-icon', role: '', class: 'has-sub', isExternalLink: false,
  //       submenu: [
  //         { path: '/template/cards/basic', title: 'Basic Cards', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/cards/advanced', title: 'Advanced Cards', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] }
  //       ]
  //     },
  //     {
  //       path: '', title: 'Bootstrap', icon: 'ft-arrow-right submenu-icon', role: '', class: 'has-sub', isExternalLink: false,
  //       submenu: [
  //         { path: '/template/components/buttons', title: 'Buttons', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/ng-buttons', title: 'NG Buttons', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/alerts', title: 'Alerts', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/badges', title: 'Badges', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/dropdowns', title: 'Dropdowns', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/media', title: 'Media Objects', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/pagination', title: 'Pagination', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/progress', title: 'Progress Bars', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/models', title: 'Modals', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/collapse', title: 'Collapse', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/lists', title: 'List', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/accordion', title: 'Accordion', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/carousel', title: 'Carousel', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/popover', title: 'Popover', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/rating', title: 'Rating', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/tabs', title: 'Tabs', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/tooltip', title: 'Tooltip', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/typeahead', title: 'Typeahead', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] }
  //       ]
  //     },
  //     {
  //       path: '', title: 'Extra', icon: 'ft-arrow-right submenu-icon', role: '', class: 'has-sub', isExternalLink: false,
  //       submenu: [
  //         { path: '/template/components/sweetalerts', title: 'Sweet Alert', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/toastr', title: 'Toastr', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/nouislider', title: 'NoUI Slider', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/upload', title: 'Upload', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/dragndrop', title: 'Drag and Drop', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/tour', title: 'Tour', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/cropper', title: 'Image Cropper', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/avatar', title: 'Avatar', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/components/swiper', title: 'Swiper', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   path: '', title: 'Forms', icon: 'ft-edit', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false,
  //   submenu: [
  //     {
  //       path: '', title: 'Elements', icon: 'ft-arrow-right submenu-icon', role: '', class: 'has-sub', isExternalLink: false,
  //       submenu: [
  //         { path: '/template/forms/inputs', title: 'Inputs', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/forms/input-groups', title: 'Input Groups', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/forms/radio', title: 'Radio', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/forms/checkbox', title: 'Checkbox', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/forms/switch', title: 'Switch', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/forms/select', title: 'Select', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/template/forms/editor', title: 'Editor', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/forms/tags', title: 'Input Tags', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/forms/datepicker', title: 'Datepicker', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/forms/timepicker', title: 'Timepicker', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //       ]
  //     },
  //     { path: '/template/forms/layout', title: 'Layouts', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/template/forms/validation', title: 'Validation', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/template/forms/archwizard', title: 'Wizard', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //   ]
  // },
  // {
  //   path: '', title: 'Tables', icon: 'ft-grid', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false,
  //   submenu: [
  //     {
  //       path: '', title: 'Bootstrap Tables', icon: 'ft-arrow-right submenu-icon', role: '', class: 'has-sub', isExternalLink: false,
  //       submenu: [
  //         { path: '/template/tables/basic', title: 'Basic', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/tables/extended', title: 'Extended', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/tables/angular', title: 'Angular', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] }
  //       ]
  //     },
  //     {
  //       path: '/template/datatables', title: 'DataTables', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: []
  //     }
  //   ]
  // },
  // {
  //   path: '', title: 'Charts & Maps', icon: 'ft-bar-chart-2', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false,
  //   submenu: [
  //     {
  //       path: '', title: 'Charts', icon: 'ft-arrow-right submenu-icon', role: '', class: 'has-sub', isExternalLink: false,
  //       submenu: [
  //         { path: '/template/charts/chartjs', title: 'ChartJs', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/charts/chartist', title: 'Chartist', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/charts/apex', title: 'Apex', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/charts/ngx', title: 'NGX', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //       ]
  //     },
  //     {
  //       path: '', title: 'Maps', icon: 'ft-arrow-right submenu-icon', role: '', class: 'has-sub', isExternalLink: false,
  //       submenu: [
  //         { path: '/template/maps/google', title: 'Google Map', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/maps/fullscreen', title: 'Full Screen Map', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   path: '', title: 'Pages', icon: 'ft-file-text', role: '', class: 'dropdown nav-item has-sub', isExternalLink: false,
  //   submenu: [
  //     {
  //       path: '', title: 'Authentication', icon: 'ft-arrow-right submenu-icon', role: '', class: 'has-sub', isExternalLink: false,
  //       submenu: [
  //         { path: '/template/pages/forgotpassword', title: 'Forgot Password', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/pages/login', title: 'Login', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/pages/register', title: 'Register', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/pages/lockscreen', title: 'Lock Screen', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] }
  //       ]
  //     },
  //     { path: '/template/pages/horizontaltimeline', title: 'Horizontal Timeline', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     {
  //       path: '', title: 'Vertical Timeline', icon: 'ft-arrow-right submenu-icon', role: '', class: 'has-sub', isExternalLink: false,
  //       submenu: [
  //         { path: '/template/pages/timeline-vertical-center', title: 'Center', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/pages/timeline-vertical-left', title: 'Left', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //         { path: '/template/pages/timeline-vertical-right', title: 'Right', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] }
  //       ]
  //     },
  //     {
  //       path: '', title: 'Users', icon: 'ft-arrow-right submenu-icon', role: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
  //       submenu: [
  //         { path: '/template/pages/users-list', title: 'List', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  //         { path: '/template/pages/users-view', title: 'View', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  //         { path: '/template/pages/users-edit', title: 'Edit', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
  //       ]
  //     },
  //     { path: '/template/pages/account-settings', title: 'Account Settings', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/template/pages/profile', title: 'User Profile', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/template/pages/invoice', title: 'Invoice', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/template/pages/error', title: 'Error', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/template/pages/comingsoon', title: 'Coming Soon', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/template/pages/maintenance', title: 'Maintenance', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/template/pages/gallery', title: 'Gallery', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/template/pages/search', title: 'Search', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/template/pages/faq', title: 'FAQ', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] },
  //     { path: '/template/pages/kb', title: 'Knowledge Base', icon: 'ft-arrow-right submenu-icon', role: '', class: 'dropdown-item', isExternalLink: false, submenu: [] }
  //   ]
  // }
];
