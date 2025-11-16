import { Calendar, Home, Inbox, Plus, PlusCircle, Search, Settings, ShoppingBag } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/seller",
    icon: Home,
  },
  {
    title: "All listings",
    url: "/seller/listings",
    icon: ShoppingBag,
  },
  {
    title: "Create listing",
    url: "/seller/new",
    icon: PlusCircle,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="h-[68px] flex items-center justify-center">
          <h1 className="text-3xl text-green-600 text-semibold bricolage-grotesque">LOGO</h1>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="mx-auto">Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}