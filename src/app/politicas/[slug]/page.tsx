"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import { Combobox } from "@/src/components/ui/combobox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";
import { Field, FieldLabel } from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Switch } from "@/src/components/ui/switch";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

type Input = {
  active: boolean;
};

export default function Page() {
  const { control } = useForm<Input>({
    defaultValues: {},
  });

  return (
    <div className="container mx-auto px-4">
      <div className="flex w-full flex-col gap-6">
        <div>
          <span className="text=[26px] font-bold">
            Políticas de segurançaasdads
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
          <form className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <Field className="col-span-9">
              <FieldLabel htmlFor="politicName">nome</FieldLabel>
              <Input id="politicName" />
            </Field>

            <Field className="col-span-2">
              <FieldLabel>ambiente</FieldLabel>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
          </form>
        </div>
      </div>
    </div>
  );
}
