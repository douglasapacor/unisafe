"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { cn } from "@/src/lib/utils";
import { useState } from "react";

type comboList = {
  value: string;
  label: string;
};

export function SearchCombobox({
  items,
  value = "",
  onSelect,
}: {
  items: comboList[];
  value?: string;
  onSelect?: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {internalValue
            ? items.find((i) => i.value === internalValue)?.label
            : "selecione..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 md:w-[600px] lg:w-[1000px]">
        <Command>
          <CommandInput placeholder="busca..." className="h-9" />
          <CommandList>
            <CommandEmpty>Sem resultados.</CommandEmpty>
            <CommandGroup>
              {items.map((i) => (
                <CommandItem
                  key={i.value}
                  value={i.value}
                  onSelect={(currentValue) => {
                    const nextValue =
                      currentValue === internalValue ? "" : currentValue;

                    setInternalValue(nextValue);

                    if (onSelect) {
                      onSelect(nextValue);
                    }

                    setOpen(false);
                  }}
                >
                  {i.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      internalValue === i.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
