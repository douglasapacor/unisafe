import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Check, ChevronsUpDown, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { cn } from "@/src/lib/utils";

type Option = {
  value: string;
  label: string;
};

type ComboboxProps = {
  value: string[];
  onChange: (value: string[]) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
};

export function MultiCombobox({
  value,
  onChange,
  options,
  placeholder = "Selecione",
  className,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);

  const selectedOptions = options.filter((o) => value.includes(o.value));

  function handleSelect(optionValue: string) {
    onChange(
      value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue],
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("min-h-10 w-full justify-between", className)}
        >
          <div className="flex flex-wrap gap-1">
            {selectedOptions.length === 0 && (
              <span className="text-muted-foreground">{placeholder}</span>
            )}

            {selectedOptions.map((option) => (
              <span
                key={option.value}
                className="bg-muted flex items-center gap-1 rounded px-2 py-0.5 text-sm"
              >
                {option.label}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(option.value);
                  }}
                />
              </span>
            ))}
          </div>

          <ChevronsUpDown className="ml-2 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-(--radix-popover-trigger-width) p-0"
      >
        <Command>
          <CommandInput placeholder="Buscar..." className="h-9" />
          <CommandList>
            <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const selected = value.includes(option.value);

                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    {option.label}

                    <Check
                      className={cn(
                        "ml-auto",
                        selected ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
