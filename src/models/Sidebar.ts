export interface NavItem {
    title: string;
    url: string;
    isActive?: boolean;
    items?: NavItem[]; // Recursive type to support submenus
  }
  
export interface SidebarData {
navMain: NavItem[];
}