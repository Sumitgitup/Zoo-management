import { type LucideIcon, UserCog, Settings, Bell, LogOut } from "lucide-react";

type AdminMenuItem = {
  title: string;
  icon: LucideIcon;
  url: string;
  isSeparatorBefore?: boolean;
};

export const adminDropdownMenu: AdminMenuItem[] = [
  {
    title: "Profile",
    icon: UserCog,
    url: "#",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "#",
  },
//   {
//     title: "Notifications",
//     icon: Bell,
//     url: "#",
//   },
  {
    title: "Log out",
    icon: LogOut,
    url: "#",
    isSeparatorBefore: true,
  },
];
