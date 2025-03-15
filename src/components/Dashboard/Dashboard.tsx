import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router"
import { SidebarData } from "@/models/Sidebar"
import { useLocation } from "react-router"

// This is sample data.
const data: SidebarData = {
  navMain: [
    {
      title: "Events",
      url: "events",
      items: [
        { title: "Overview", url: "events" },
        { title: "Add a New Event", url: "events/new" },
      ],
    },
    {
      title: "Stock",
      url: "stock",
      items: [
        { title: "General", url: "stock" },
        { title: "Add Product to Stock", url: "stock/add" },
        { title: "Stock Alerts", url: "stock/alerts" },
      ],
    },
  ],
};

export default function Dashboard() {
  
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar data = {data} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="">
          <Outlet/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
