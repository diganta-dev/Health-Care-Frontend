"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/assets/svg/Logo";
import { SidebarItems, UserRole } from "@/types";
import { adminRoutes, doctorRoutes, patientRoutes } from "@/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sideBarRoutes: Partial<Record<UserRole, SidebarItems>> = {
  SUPER_ADMIN: adminRoutes,
  ADMIN: adminRoutes,
  DOCTOR: doctorRoutes,
  PATIENT: patientRoutes,
};

export function DashboardSidebar({ role }: { role: UserRole }) {
  const routes = sideBarRoutes[role] || [];
  const pathName = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href={"/"}>
          <div className="flex  items-center gap-3">
            <Logo></Logo>
            <span>Health Core</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={pathName === item.url}
                    >
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
