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
      title: "Articles",
      href: "/articles",
    },
    {
      title: "LeaderBoard",
      href: "/leaderboard",
    },
    {
      title: "People",
      href: "/people",
    }
  ],
  sidebarNav: [
  ],
  chartsNav: [
  ],
}