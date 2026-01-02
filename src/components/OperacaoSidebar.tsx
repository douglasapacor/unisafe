import { Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { ModeToggle } from "./ModeToggle";

export function OperacaoSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex w-full items-center justify-center p-3 text-center">
          UNISAFE
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Operação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={"/algo"}>
                    <Settings />
                    <span>{"titulo"}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex w-full items-center justify-end">
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
