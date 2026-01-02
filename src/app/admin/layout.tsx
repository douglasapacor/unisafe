import { AdminSidebar } from "@/src/components/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";
import { ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <div className="flex w-full flex-col p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
