import { AppSidebar } from "@/components/app-sidebar";
import { StaffStatCards } from "@/components/cards/statestaff";
import { StatCard } from "@/components/cards/StatusCard";
import StaffCharts from "@/components/charts/StaffCharts";
import VisitorsByAgeGroup from "@/components/charts/VisitorsByAgeGroup";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { useTickets } from "@/hooks/useTickets";
import { useVisitors } from "@/hooks/useVisitors";
import { Ticket, Users } from "lucide-react";

export const iframeHeight = "800px";

export const description = "A sidebar with a header and a search form.";

export default function Dashboard() {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-8 p-4">
              <div className="w-[100%] grid lg:grid-cols-2 gap-2 ">
                <div className="p-4 border rounded-lg shadow w-[100%]">
                  <h2 className="text-xl font-semibold mb-4">
                    Visitors by Age Group
                  </h2>
                  <VisitorsByAgeGroup />
                </div>
                <div className="p-4 border rounded-lg shadow w-[100%]">
                  <h2 className="text-xl font-semibold ">Staff </h2>
                  <StaffCharts />
                </div>
              </div>
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <StatCard
                  title="Child National Visitors"
                  icon={<Users className="w-5 h-5 text-blue-500" />}
                  useDataHook={useVisitors}
                  queryParams={{ ageGroup: "Child" }}
                />

                <StatCard
                  title="Adult National Visitors"
                  icon={<Users className="w-5 h-5 text-green-600" />}
                  useDataHook={useVisitors}
                  queryParams={{ ageGroup: "Adult" }}
                />

                <StatCard
                  title="Tickets Issued"
                  icon={<Ticket className="w-5 h-5 text-yellow-500" />}
                  useDataHook={useTickets}
                />
              </div>
              <StaffStatCards />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
