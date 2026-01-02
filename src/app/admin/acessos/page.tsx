import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Field, FieldGroup } from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Edit, EllipsisIcon, Trash, User2 } from "lucide-react";

export default function Page() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Acessos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex w-full">
        <span className="text-[24px] font-semibold uppercase">Acessos</span>
      </div>

      <div className="flex w-full flex-col gap-4">
        <div>
          <Field orientation="horizontal">
            <Input
              id="searchUser"
              type="text"
              placeholder="busque por nome ou tag do acesso."
            />
          </Field>
        </div>

        <div className="rounded-md border border-gray-500 p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-full">Nome</TableHead>
                <TableHead className="w-[100px]">Tag</TableHead>
                <TableHead className="w-full">Path</TableHead>
                <TableHead className="w-[100px]">Icone</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>Usuários</TableCell>
                <TableCell>USR#4154</TableCell>
                <TableCell>/admin/usuarios</TableCell>
                <TableCell>
                  <User2 />
                </TableCell>
                <TableCell className="flex w-[100px] items-center justify-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost">
                        <EllipsisIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                      <DropdownMenuLabel>opções</DropdownMenuLabel>
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          Editar
                          <DropdownMenuShortcut>
                            <Edit />
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                          Excluir
                          <DropdownMenuShortcut>
                            <Trash />
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="flex w-full items-center justify-end"></div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4">
        <FieldGroup></FieldGroup>
      </div>
    </div>
  );
}
