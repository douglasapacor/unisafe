import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import { Button } from "@/src/components/ui/button";
import { Field, FieldLabel } from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import {
  CleanTableRow,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const emptyRows = 10;
  return (
    <div className="container mx-auto px-4">
      <div className="flex w-full flex-col gap-6">
        <div>
          <span className="text=[26px] font-bold">Políticas de segurança</span>
        </div>

        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Políticas de segurança</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex items-end gap-3">
          <Input placeholder="políticas" />

          <Button variant="outline">
            <Search />
            Buscar
          </Button>
        </div>

        <div>
          <div className="rounded-md border border-gray-400 p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>nome</TableHead>

                  <TableHead className="w-[100px]">
                    <div className="flex w-full justify-center">ativo</div>
                  </TableHead>

                  <TableHead className="w-[150px]">
                    <div className="flex w-full justify-center">ambiente</div>
                  </TableHead>

                  <TableHead className="w-[100px]">
                    <div className="flex w-full justify-center">opções</div>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {Array.from({ length: emptyRows }).map((_, index) => (
                  <CleanTableRow key={`empty-${index}`} className="h-10">
                    <TableCell colSpan={6} />
                  </CleanTableRow>
                ))}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell colSpan={12}>
                    <div className="flex w-full items-center justify-end gap-6 py-1">
                      <Button variant="ghost">
                        <ChevronLeft />
                      </Button>

                      <Input type="number" min={1} className="w-[60px]" />

                      <Button variant="ghost">
                        <ChevronRight />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
