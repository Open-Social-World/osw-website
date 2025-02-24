"use client"

import * as React from "react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  CommandMenu
} from "@/components/sidebar/command-menu"

export function InfoHeader({
  info,
}: {
  info: {
    name: string
    logo: React.ElementType
    text: string
  }
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                <info.logo className="w-12 text-primary"/>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {info.name}
                </span>
                <span className="truncate text-xs">{info.text}</span>
              </div>
            </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <CommandMenu />
      </SidebarMenuItem>
    </SidebarMenu>
  )
}