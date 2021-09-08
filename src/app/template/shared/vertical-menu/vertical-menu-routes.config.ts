import { RouteInfo } from './vertical-menu.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

  {
    path: '', title: 'Dashboard', icon: 'ft-home', role: '', class: 'has-sub', badge: '2', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [
      { path: '/template/dashboard/dashboard1', title: 'Dashboard 1', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/template/dashboard/dashboard2', title: 'Dashboard 2', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  { path: '/template/inbox', title: 'Email', icon: 'ft-mail', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  { path: '/template/chat', title: 'Chat', icon: 'ft-message-square', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  { path: '/template/chat-ngrx', title: 'Chat NgRx', icon: 'ft-message-square', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  { path: '/template/taskboard', title: 'Task Board', icon: 'ft-file-text', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  { path: '/template/taskboard-ngrx', title: 'Task Board NgRx', icon: 'ft-file-text', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  { path: '/template/calendar', title: 'Calendar', icon: 'ft-calendar', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  {
    path: '', title: 'UI Kit', icon: 'ft-aperture', role: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      { path: '/template/uikit/grids', title: 'Grid', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/template/uikit/typography', title: 'Typography', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/template/uikit/syntaxhighlighter', title: 'Syntax Highlighter', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/template/uikit/helperclasses', title: 'Helper Classes', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/template/uikit/textutilities', title: 'Text Utilities', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/template/uikit/colorpalettes', title: 'Color Palette', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

      {
        path: '', title: 'Icons', icon: 'ft-arrow-right submenu-icon', role: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
          { path: '/template/uikit/feather', title: 'Feather Icon', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/uikit/font-awesome', title: 'Font Awesome Icon', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/uikit/simple-line', title: 'Simple Line Icon', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
      },
    ]
  },
  {
    path: '', title: 'Components', icon: 'ft-box', role: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      {
        path: '', title: 'Bootstrap', icon: 'ft-arrow-right submenu-icon', role: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
          { path: '/template/components/buttons', title: 'Buttons', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/ng-buttons', title: 'NG Buttons', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/alerts', title: 'Alerts', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/badges', title: 'Badges', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/dropdowns', title: 'Dropdowns', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/media', title: 'Media Objects', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/pagination', title: 'Pagination', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/progress', title: 'Progress Bars', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/models', title: 'Modals', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/collapse', title: 'Collapse', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/lists', title: 'List', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/accordion', title: 'Accordion', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/carousel', title: 'Carousel', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/popover', title: 'Popover', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/rating', title: 'Rating', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/tabs', title: 'Tabs', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/tooltip', title: 'Tooltip', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/typeahead', title: 'Typeahead', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
        ]
      },
      {
        path: '', title: 'Extra', icon: 'ft-arrow-right submenu-icon', role: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
          { path: '/template/components/sweetalerts', title: 'Sweet Alert', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/toastr', title: 'Toastr', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/nouislider', title: 'NoUI Slider', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/upload', title: 'Upload', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/dragndrop', title: 'Drag and Drop', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/tour', title: 'Tour', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/cropper', title: 'Image Cropper', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/avatar', title: 'Avatar', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/components/swiper', title: 'Swiper', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
        ]
      },
    ]
  },
  {
    path: '', title: 'Forms', icon: 'ft-edit', role: '', class: 'has-sub', badge: 'New', badgeClass: 'badge badge-pill badge-primary float-right mr-1 mt-1', isExternalLink: false,
    submenu: [
      {
        path: '', title: 'Elements', icon: 'ft-arrow-right submenu-icon', role: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
          { path: '/template/forms/inputs', title: 'Inputs', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/forms/input-groups', title: 'Input Groups', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/forms/radio', title: 'Radio', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/forms/checkbox', title: 'Checkbox', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/forms/switch', title: 'Switch', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/forms/select', title: 'Select', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/forms/editor', title: 'Editor', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/forms/tags', title: 'Input Tags', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/forms/datepicker', title: 'Datepicker', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/forms/timepicker', title: 'Timepicker', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
      },
      { path: '/template/forms/layout', title: 'Layouts', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/template/forms/validation', title: 'Validation', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/template/forms/archwizard', title: 'Wizard', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
    ]
  },
  {
    path: '', title: 'Tables', icon: 'ft-grid', role: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      { path: '/template/tables/basic', title: 'Basic', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/template/tables/extended', title: 'Extended', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/template/tables/tables', title: 'Angular', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
    ]
  },
  {
    path: '/template/datatables', title: 'Data Tables', icon: 'ft-layout', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '', title: 'Cards', icon: 'ft-layers', role: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
      { path: '/template/cards/basic', title: 'Basic Cards', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/template/cards/advanced', title: 'Advanced Cards', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  {
    path: '', title: 'Maps', icon: 'ft-map', role: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      { path: '/template/maps/google', title: 'Google Map', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/template/maps/fullscreen', title: 'Full Screen Map', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  {
    path: '', title: 'Charts', icon: 'ft-bar-chart-2', role: '', class: 'has-sub', badge: '2', badgeClass: 'badge badge-pill badge-success float-right mr-1 mt-1', isExternalLink: false,
    submenu: [
      { path: '/template/charts/chartjs', title: 'ChartJs', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/template/charts/chartist', title: 'Chartist', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/template/charts/apex', title: 'Apex', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/template/charts/ngx', title: 'NGX', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  {
    path: '', title: 'Pages', icon: 'ft-copy', role: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      {
        path: '', title: 'Authentication', icon: 'ft-arrow-right submenu-icon', role: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
          { path: '/template/pages/forgotpassword', title: 'Forgot Password', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
          { path: '/template/pages/login', title: 'Login', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
          { path: '/template/pages/register', title: 'Register', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
          { path: '/template/pages/lockscreen', title: 'Lock Screen', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
        ]
      },
      { path: '/template/pages/horizontaltimeline', title: 'Horizontal Timeline', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

      {
        path: '', title: 'Vertical Timeline', icon: 'ft-arrow-right submenu-icon', role: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
          { path: '/template/pages/timeline-vertical-center', title: 'Center', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/pages/timeline-vertical-left', title: 'Left', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/pages/timeline-vertical-right', title: 'Right', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
        ]
      },
      {
        path: '', title: 'Users', icon: 'ft-arrow-right submenu-icon', role: '', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
          { path: '/template/pages/users-list', title: 'List', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/pages/users-view', title: 'View', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/template/pages/users-edit', title: 'Edit', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
        ]
      },
      { path: '/template/pages/account-settings', title: 'Account Settings', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/template/pages/profile', title: 'User Profile', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/template/pages/invoice', title: 'Invoice', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/template/pages/error', title: 'Error', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
      { path: '/template/pages/comingsoon', title: 'Coming Soon', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
      { path: '/template/pages/maintenance', title: 'Maintenance', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
      { path: '/template/pages/gallery', title: 'Gallery', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/template/pages/search', title: 'Search', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/template/pages/faq', title: 'FAQ', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/template/pages/kb', title: 'Knowledge Base', icon: 'ft-arrow-right submenu-icon', role: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  { path: 'https://pixinvent.com/apex-angular-4-bootstrap-admin-template/documentation', title: 'Documentation', icon: 'ft-book', role: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
  { path: 'https://pixinvent.ticksy.com/', title: 'Support', icon: 'ft-life-buoy', role: '', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
];
