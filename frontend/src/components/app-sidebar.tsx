import * as React from "react";
import {
  LayoutDashboard,
  PawPrint,
  Ticket,
  CreditCard,
  Users,
  BarChart3,
  UserCog,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Animals Details",
      url: "/admin/dashboard/animal",
      icon: PawPrint,
      items: [
        // { title: "Mammals", url: "#" },
        // { title: "Reptiles", url: "#" },
        // { title: "Birds", url: "#" },
      ],
    },
    {
      title: "Staff Details",
      url: "/admin/dashboard/staff",
      icon: Users,
      items: [
        // {
        //   title: "Zone",
        //   url: "#",
        //   items: [
        //     { title: "Safari Zone", url: "#" },
        //     { title: "Bird Sanctuary", url: "#" },
        //     { title: "Reptile House", url: "#" },
        //   ],
        // },
      ],
    },
    {
      title: "Tickets Setup",
      url: "/admin/dashboard/ticket",
      icon: Ticket,
      items: [
        // {
        //   title: "National",
        //   url: "#",
        //   items: [
        //     { title: "Tickets for Adults", url: "#" },
        //     { title: "Tickets for Childs", url: "#" },
        //   ],
        // },
        // {
        //   title: "International",
        //   url: "#",
        //   items: [
        //     { title: "Tickets for Adults", url: "#" },
        //     { title: "Tickets for Childs", url: "#" },
        //   ],
        // },
      ],
    },
    {
      title: "Billing",
      url: "#",
      icon: CreditCard,
      items: [
        {
          title: "Coming soon...",
          url: "#",
          items: [{ title: "Comming Soon", url: "#" }],
        },
      ],
    },

    {
      title: "Reports",
      url: "#",
      icon: BarChart3,
      items: [{ title: "Comming soon", url: "#" }],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to={"#"}>
                <div className="bg-green-500 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <UserCog className="size-4 " />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Admin</span>
                  <span className="truncate text-xs">Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="">
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
