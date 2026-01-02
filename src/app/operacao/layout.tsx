import { OperacaoSidebar } from "@/src/components/OperacaoSidebar";
import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";
import { ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <SidebarProvider>
      <OperacaoSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <div className="flex w-full p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
