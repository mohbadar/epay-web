// Sidebar route metadata
export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    role?: string;
    badge?: string;
    badgeClass?: string;
    isExternalLink: boolean;
    submenu : RouteInfo[];
}
