import { MoradoresSidebar } from "@/src/components/MoradoresSidebar";
import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";
import { ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SidebarProvider>
      <MoradoresSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <div className="flex w-full p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
