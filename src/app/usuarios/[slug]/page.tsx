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
import { Switch } from "@/src/components/ui/switch";
import { Save } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Input = {
  _id: string;
  active: boolean;
  polices: [];
};

export default function Page() {
  const params = useParams();
  const slug = params.slug as string;
  const isNew = ["novo", "nova", "new"].includes(slug);

  const { handleSubmit, register, control } = useForm<Input>({
    defaultValues: {
      polices: [],
    },
  });

  const onSubmit: SubmitHandler<Input> = async (formData) => {
    console.info(formData);
  };
  return (
    <div className="container mx-auto px-4">
      <div className="flex w-full flex-col gap-6">
        <div>
          <span className="text=[26px] font-bold">
            {isNew ? "Novo usuário" : "Usuários"}
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
                <BreadcrumbPage>Usuário</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div>
          <form
            className="grid grid-cols-1 gap-6 md:grid-cols-12"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input type="hidden" {...register("_id")} />

            <Field className="col-span-2">
              <FieldLabel htmlFor="userCpf">cpf</FieldLabel>
              <Input id="userCpf" />
            </Field>

            <Field className="col-span-4">
              <FieldLabel htmlFor="userName">nome</FieldLabel>
              <Input id="userName" />
            </Field>

            <Field className="col-span-4">
              <FieldLabel htmlFor="userEmail">email</FieldLabel>
              <Input id="userEmail" />
            </Field>

            <Field className="col-span-2 flex justify-center">
              <Controller
                name="active"
                control={control}
                render={({ field }) => (
                  <div className="flex w-full justify-center gap-3">
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

            <div className="col-span-12 flex items-end">
              <Controller
                name="polices"
                control={control}
                render={({ field }) => {
                  return (
                    <MultiCombobox
                      value={field.value}
                      onChange={field.onChange}
                      options={[{ value: "asd", label: "ased" }]}
                      placeholder="politicas do usuário"
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
