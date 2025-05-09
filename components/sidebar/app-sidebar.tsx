"use client";

import * as React from "react";

import { HomeIcon } from "@/components/ui/home";
import { BookTextIcon } from "@/components/ui/book-text";
import { ChartBarDecreasingIcon } from "@/components/ui/chart-bar-decreasing";
import { UsersIcon } from "@/components/ui/users";

import { InfoHeader } from "@/components/sidebar/info-header";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { ModeToggle } from "./theme-toggle";
import { Nav } from "./nav";
import { SchoolIcon } from "lucide-react";

const Logo = ({ className = "", ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 11.8"
      className={className}
      {...props}
    >
      <path
        fill="currentColor"
        d="M8.53 4.89c0 .86-.23 1.64-.68 2.34-.36.55-.83.97-1.42 1.27s-1.23.45-1.93.45c-1.13 0-2.05-.36-2.76-1.08C1.03 7.15.67 6.21.67 5.07s.38-2.09 1.13-2.83c.76-.75 1.72-1.12 2.87-1.12s2.09.35 2.8 1.04c.71.69 1.06 1.6 1.06 2.73zM7.4 4.88c0-.82-.24-1.48-.73-1.98-.49-.49-1.14-.74-1.97-.74s-1.52.28-2.08.83c-.56.55-.83 1.25-.83 2.08s.26 1.5.78 2.04c.52.53 1.17.8 1.96.8s1.51-.29 2.06-.86c.55-.57.83-1.29.83-2.16zM13.62 2.23l-.75.71c-.35-.52-.76-.78-1.22-.78-.33 0-.61.1-.83.31s-.33.46-.33.77c0 .25.07.46.22.64.07.08.18.18.33.29s.33.23.54.36c.65.38 1.08.72 1.3 1.03.22.31.33.71.33 1.22 0 .65-.21 1.18-.64 1.58-.42.4-.98.61-1.67.61-.56 0-1.03-.12-1.42-.36-.2-.12-.38-.28-.55-.47-.17-.19-.33-.43-.49-.71l.85-.58c.23.41.46.69.68.84s.51.23.86.23c.39 0 .7-.1.93-.31s.33-.5.33-.89c0-.26-.08-.49-.24-.67-.08-.09-.2-.2-.36-.32s-.37-.25-.61-.4c-.57-.34-.96-.65-1.19-.96-.21-.3-.32-.68-.32-1.14 0-.61.21-1.11.63-1.51.42-.4.96-.61 1.6-.61.42 0 .78.08 1.07.25.3.17.61.46.93.86zM24 1.27l-3.95 7.86-1.49-5.27-2.63 5.36-2.31-7.95h1.14l1.41 5.15 2.65-5.41 1.52 5.27 2.47-5.01h1.2z"
      />
    </svg>
  );
};

// This is sample data.
const data = {
  info: {
    name: "Open Social World",
    logo: Logo,
    text: "Human-AI agent interaction",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: HomeIcon,
      isActive: false,
    },
    {
      title: "Tutorial",
      url: "/naacl2025",
      icon: SchoolIcon,
    },
    {
      title: "Articles",
      url: "/articles",
      icon: BookTextIcon,
    },
    {
      title: "Leaderboards",
      url: "/leaderboard",
      icon: ChartBarDecreasingIcon,
    },
    {
      title: "People",
      url: "/people",
      icon: UsersIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <InfoHeader info={data.info} />
      </SidebarHeader>
      <SidebarContent>
        <Nav items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
