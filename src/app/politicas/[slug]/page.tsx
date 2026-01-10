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
import { Field, FieldLabel } from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { MultiCombobox } from "@/src/components/ui/multi-combobox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Switch } from "@/src/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { useApi } from "@/src/hooks/useApi";
import Router from "@/src/Router";
import { Save, Trash } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Input = {
  _id?: string;
  name: string;
  environment: string;
  active: boolean;
  access: string[];
};

export default function Page() {
  const params = useParams();
  const slug = params.slug as string;
  const isNew = ["novo", "nova", "new", "novos", "novas"].includes(slug);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<
    "success" | "error" | "warning" | "info"
  >("info");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertText, setAlertText] = useState("");
  const [envirorments, setEnvirorments] = useState<
    { name: string; _id: string }[]
  >([]);
  const [access, setAccess] = useState<{ value: string; label: string }[]>([]);
  const { control, register, handleSubmit, setValue } = useForm<Input>({
    defaultValues: {
      _id: "",
      name: "",
      environment: "",
      active: true,
      access: [],
    },
  });

  const { execute, isPending, data } = useApi<
    Input,
    {
      success: boolean;
      data: {
        access?: string[] | undefined;
        name: string;
        active: boolean;
        envirorment: string;
        _id: string;
      };
      message?: string;
    }
  >(Router.savePolicies);

  const onSubmit: SubmitHandler<Input> = async (formData) => {
    await execute(formData);
  };

  useEffect(() => {
    if (data) {
      setValue("_id", data.data._id);

      if (data.message) {
        if (data.success) {
          setAlertTitle("Sucesso.");
          setAlertType("success");
        } else {
          setAlertTitle("Error");
          setAlertType("error");
        }

        setAlertText(data.message);
      }
    }
  }, [data]);

  const getById = async () => {
    if (!isNew) {
      fetch(`/api/policies/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.data._d) setValue("_id", data.data._d);

          setValue("name", data.data.name);
          setValue("active", data.data.active);
          setValue("environment", data.data.envirorment);
          setValue("access", data.data.access);
        });
    }
  };

  useEffect(() => {
    Promise.all([
      fetch("/api/envirorment/list")
        .then((req) => req.json())
        .then((data) => {
          setEnvirorments(data.data);
        }),
      fetch("/api/access/list/all")
        .then((req) => req.json())
        .then((data) => {
          setAccess(data.data);
        }),
      getById(),
    ]);
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="flex w-full flex-col gap-6">
        <div>
          <span className="text=[26px] font-bold">
            {isNew ? "Nova políticas de segurança" : "Política de segurança"}
          </span>
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

        <div className="flex w-full items-end justify-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                disabled={isNew}
                onClick={() => {
                  console.info("asdasdasd");
                }}
              >
                <Trash className="stroke-red-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Excluir política</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div>
          <form
            className="grid grid-cols-1 gap-6 md:grid-cols-12"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input type="hidden" {...register("_id")} />

            <Field className="col-span-9">
              <FieldLabel htmlFor="politicName">nome</FieldLabel>
              <Input
                id="politicName"
                {...register("name")}
                disabled={isPending}
              />
            </Field>

            <Field className="col-span-2">
              <FieldLabel>ambiente</FieldLabel>
              <Controller
                name="environment"
                control={control}
                disabled={isPending}
                render={({ field }) => {
                  return (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o ambiente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {envirorments.map((envirorment, index) => (
                            <SelectItem
                              key={`envirorment-list-item-${index}`}
                              value={envirorment._id}
                            >
                              {envirorment.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            </Field>

            <Field className="col-span-1 flex justify-center">
              <Controller
                name="active"
                control={control}
                disabled={isPending}
                render={({ field }) => (
                  <div className="flex w-full justify-end gap-3">
                    <Switch
                      id="politicActive"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200"
                    />
                    <Label htmlFor="politicActive">ativo</Label>
                  </div>
                )}
              />
            </Field>

            <div className="col-span-12">
              <Controller
                name="access"
                disabled={isPending}
                control={control}
                render={({ field }) => {
                  return (
                    <div className="flex flex-col gap-3">
                      <Label>acessos</Label>
                      <MultiCombobox
                        value={field.value}
                        onChange={field.onChange}
                        options={access}
                        placeholder="Selecione os acessos permitidos para essa política"
                      />
                    </div>
                  );
                }}
              />
            </div>

            <div className="col-span-12">
              <Button
                disabled={isPending}
                type="submit"
                variant="outline"
                className="w-full"
              >
                Salvar
                <Save />
              </Button>
            </div>
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
