"use client";
import { AutoDismissAlert } from "@/src/components/AutoDismissAlert";
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
import { Field, FieldLabel } from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Switch } from "@/src/components/ui/switch";
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
import { useApi } from "@/src/hooks/useApi";
import Router from "@/src/Router";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Delete,
  Edit,
  Ellipsis,
  Save,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type Input = {
  _id: string;
  name: string;
  tag: string;
  path: string;
  icon: string;
  active: boolean;
};

type getAccessListSearch = {
  page: number;
  limit: number;
};

type getAccessListResponse = {
  success: true;
  data: {
    list: {
      name: string;
      tag: string;
      path: string;
      icon: string;
      active: boolean;
      createdAt: Date;
      updatedAt: Date;
      _id: string;
    }[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  message: string;
};

type saveAccessResponse = {
  success: true;
  data: { _id: string };
  message: string;
};

export default function Page() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<
    "success" | "error" | "warning" | "info"
  >("info");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertText, setAlertText] = useState("");
  const [page, setPage] = useState(1);
  const { data: accessData, execute: accessExecute } = useApi<
    getAccessListSearch,
    getAccessListResponse
  >(Router.getAccess);
  const { execute, isPending, data } = useApi<Input, saveAccessResponse>(
    Router.saveAccess,
  );

  const emptyRows =
    10 - (accessData && accessData.data ? accessData.data.list.length : 0);

  const { handleSubmit, register, control, reset, setValue } = useForm<Input>({
    defaultValues: {
      active: true,
      icon: "",
      name: "",
      path: "",
      tag: "",
    },
  });

  const onSubmit: SubmitHandler<Input> = async (formData) => {
    await execute(formData);

    setAlertType("success");
    setAlertTitle("sucesso");
    setAlertText(data ? data.message : "");
    setAlertOpen(true);

    reset();

    await accessExecute({ page, limit: 10 });
  };

  const selectThis = async (id: string) => {
    fetch(`/api/access/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setValue("_id", data.data._id);
        setValue("name", data.data.name);
        setValue("tag", data.data.tag);
        setValue("path", data.data.path);
        setValue("icon", data.data.icon);
        setValue("active", data.data.active);
      });
  };

  useEffect(() => {
    accessExecute({ page, limit: 10 });
  }, [page]);

  return (
    <div className="container mx-auto px-4">
      <div className="flex w-full flex-col gap-6">
        <div>
          <span className="text=[26px] font-bold">Acessos</span>
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
                <BreadcrumbPage>Acessos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div>
          <div className="rounded-md border border-gray-400 p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>nome</TableHead>
                  <TableHead className="w-[100px]">
                    <div className="flex w-full justify-center">tag</div>
                  </TableHead>
                  <TableHead>path</TableHead>
                  <TableHead className="w-[150px]">
                    <div className="flex w-full items-center justify-center">
                      icone
                    </div>
                  </TableHead>
                  <TableHead className="w-[100px]">
                    <div className="flex w-full items-center justify-center">
                      ativo
                    </div>
                  </TableHead>
                  <TableHead className="w-[100px]">
                    <div className="flex w-full items-center justify-center">
                      opçoes
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {accessData &&
                  accessData.data &&
                  accessData.data.list.map((item, index) => (
                    <TableRow key={`row-${index}`}>
                      <TableCell>{item.name}</TableCell>

                      <TableCell>
                        <div className="flex w-full justify-center">
                          {item.tag}
                        </div>
                      </TableCell>

                      <TableCell>{item.path}</TableCell>

                      <TableCell>
                        <div className="flex w-full items-center justify-center">
                          {item.icon}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex w-full items-center justify-center">
                          {item.active ? (
                            <Check className="h-5 w-5 bg-green-500" />
                          ) : (
                            <X className="h-5 w-5 bg-red-500" />
                          )}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex w-full items-center justify-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon-sm" variant="ghost">
                                <Ellipsis />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                              <DropdownMenuLabel>Opções</DropdownMenuLabel>
                              <DropdownMenuGroup>
                                <DropdownMenuItem
                                  onClick={() => {
                                    selectThis(item._id);
                                  }}
                                >
                                  Editar
                                  <DropdownMenuShortcut>
                                    <Edit />
                                  </DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Excluir
                                  <DropdownMenuShortcut>
                                    <Delete />
                                  </DropdownMenuShortcut>
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}

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
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setPage((p) => {
                            return p <= 1 ? 1 : p;
                          });
                        }}
                      >
                        <ChevronLeft />
                      </Button>

                      <Input
                        value={page}
                        type="number"
                        min={1}
                        className="w-[60px]"
                        onChange={(e) => {
                          setPage(+e.target.value);
                        }}
                      />

                      <Button
                        variant="ghost"
                        onClick={() => {
                          setPage((p) => p + 1);
                        }}
                      >
                        <ChevronRight />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>

        <div className="my-6 hidden h-px w-full bg-zinc-200 md:block" />

        <div>
          <form
            className="grid grid-cols-1 gap-6 md:grid-cols-12"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input type="hidden" {...register("_id")} />

            <Field className="col-span-5">
              <FieldLabel htmlFor="AccessName">nome</FieldLabel>
              <Input
                required
                id="AccessName"
                {...register("name")}
                disabled={isPending}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="AccessTag">tag</FieldLabel>
              <Input
                maxLength={5}
                id="AccessTag"
                {...register("tag")}
                disabled={isPending}
                required
              />
            </Field>

            <Field className="col-span-3">
              <FieldLabel htmlFor="AccessPath">path</FieldLabel>
              <Input
                id="AccessPath"
                {...register("path")}
                disabled={isPending}
                required
              />
            </Field>

            <Field className="col-span-2">
              <FieldLabel htmlFor="AccessIcon">icone</FieldLabel>
              <Input
                id="AccessIcon"
                {...register("icon")}
                disabled={isPending}
                required
              />
            </Field>

            <Field className="flex justify-center">
              <Controller
                name="active"
                control={control}
                render={({ field }) => (
                  <div className="flex w-full justify-end gap-3">
                    <Switch
                      id="accessActive"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200"
                    />
                    <Label htmlFor="accessActive">ativo</Label>
                  </div>
                )}
              />
            </Field>

            <Button className="col-span-12" variant="outline" type="submit">
              salvar
              <Save />
            </Button>
          </form>
        </div>
      </div>

      <AutoDismissAlert
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        header={alertTitle}
        text={alertText}
        options={{
          type: alertType,
        }}
      />
    </div>
  );
}
