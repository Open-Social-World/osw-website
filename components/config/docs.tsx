export interface NavItem {
    title: string
    href?: string
    disabled?: boolean
    external?: boolean
    label?: string
  }
  
export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}
  
export interface DocsConfig {
  mainNav: NavItem[]
  sidebarNav: NavItemWithChildren[]
  chartsNav: NavItemWithChildren[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About Me",
      href: "/#me",
    },
    {
      title: "My Research",
      href: "/#my-research",
    },
    {
      title: "FAQ",
      href: "/#faq",
    },
    {
      title: "Education",
      href: "/#education",
    },
    {
      title: "Calendar",
      href: "/calendar",
    },
  ],
  sidebarNav: [
  ],
  chartsNav: [
  ],
}