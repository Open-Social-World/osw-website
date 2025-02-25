"use client"
import { type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { ForwardedRef, HTMLAttributes } from "react";

export function Nav({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ComponentType<{ size?: number }>
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.url}>
            <Link href={item.url} className="w-full">
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon size={16}/>}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}