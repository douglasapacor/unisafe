import { ClienteSidebar } from "@/src/components/ClienteSidebar";
import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";
import { ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SidebarProvider>
      <ClienteSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <div className="flex w-full p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
