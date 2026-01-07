"use client";
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
import { Save } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Input = {
  name: string;
  environment: string;
  active: boolean;
  access: string[];
};

export default function Page() {
  const params = useParams();
  const slug = params.slug as string;
  const isNew = ["novo", "nova", "new"].includes(slug);
  const [envirorments, setEnvirorments] = useState<
    { name: string; _id: string }[]
  >([]);
  const [access, setAccess] = useState<{ value: string; label: string }[]>([]);
  const { control, register, handleSubmit } = useForm<Input>({
    defaultValues: {
      name: "",
      environment: "",
      active: true,
      access: [],
    },
  });

  const onSubmit: SubmitHandler<Input> = async (formData) => {
    console.info(formData);
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

        <div>
          <form
            className="grid grid-cols-1 gap-6 md:grid-cols-12"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Field className="col-span-9">
              <FieldLabel htmlFor="politicName">nome</FieldLabel>
              <Input id="politicName" {...register("name")} />
            </Field>

            <Field className="col-span-2">
              <FieldLabel>ambiente</FieldLabel>
              <Controller
                name="environment"
                control={control}
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
                control={control}
                render={({ field }) => {
                  return (
                    <MultiCombobox
                      value={field.value}
                      onChange={field.onChange}
                      options={access}
                      placeholder="Selecione os acessos permitidos para essa política"
                    />
                  );
                }}
              />
            </div>

            <div className="col-span-12">
              <Button type="submit" variant="outline" className="w-full">
                Salvar
                <Save />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
