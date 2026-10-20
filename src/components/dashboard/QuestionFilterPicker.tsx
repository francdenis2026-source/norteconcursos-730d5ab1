import { useId, useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "@/components/ui/command";

const fold = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
/** Searchable, bounded picker: one dialog, focus restoration, keyboard navigation and scrolling. */
export function QuestionFilterPicker({
  label,
  value,
  onChange,
  options,
  labels = {},
  counts,
  allCount,
  hideAll = false,
  allLabel = "Todas as opções",
  quantity = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  labels?: Record<string, string> | undefined;
  counts?: Map<string, number> | undefined;
  allCount?: number | undefined;
  hideAll?: boolean | undefined;
  allLabel?: string | undefined;
  quantity?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const usable = options.filter(
    (option) => !counts || (counts.get(option) ?? 0) > 0 || option === value,
  );
  // Keep a stale selected value clearable; disable only empty unselected criteria.
  const unavailable = value === "all" && usable.length === 0;
  const entries = [
    ...(!hideAll ? [{ key: "all", label: allLabel, count: allCount }] : []),
    ...usable.map((key) => ({
      key,
      label: (labels[key] ?? key) + (quantity && key !== "all" ? " questões" : ""),
      count: counts?.get(key),
    })),
  ];
  const selected = entries.find((entry) => entry.key === value);
  return (
    <div className="trainer-field">
      <span id={id} className="trainer-field__label">
        {label}
      </span>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            role="combobox"
            aria-label={label}
            aria-haspopup="dialog"
            aria-expanded={open}
            disabled={unavailable}
            title={unavailable ? "Sem opções compatíveis com os filtros deste treino." : undefined}
            className="trainer-picker-trigger"
            data-filtered={value !== "all"}
          >
            <span>{selected?.label ?? labels[value] ?? value}</span>
            {selected?.count !== undefined && (
              <small>{selected.count.toLocaleString("pt-BR")}</small>
            )}
            <ChevronsUpDown aria-hidden="true" />
          </button>
        </DialogTrigger>
        <DialogContent className="trainer-picker-window">
          <div className="trainer-picker-heading">
            <span>
              <Search aria-hidden="true" />
            </span>
            <div>
              <DialogTitle>Selecionar {label.toLocaleLowerCase("pt-BR")}</DialogTitle>
              <DialogDescription>
                Busque uma opção. As quantidades respeitam os outros filtros.
              </DialogDescription>
            </div>
          </div>
          <Command filter={(value, query) => (fold(value).includes(fold(query)) ? 1 : 0)}>
            <CommandInput
              placeholder={`Buscar ${label.toLocaleLowerCase("pt-BR")}…`}
              aria-label={`Buscar ${label.toLocaleLowerCase("pt-BR")}`}
            />
            <CommandList className="trainer-picker-list">
              <CommandEmpty>
                Nenhuma opção encontrada. Revise a busca ou os outros filtros.
              </CommandEmpty>
              {entries.map((entry) => (
                <CommandItem
                  key={entry.key}
                  value={entry.label}
                  onSelect={() => {
                    onChange(entry.key);
                    setOpen(false);
                  }}
                  className="trainer-picker-option"
                  data-chosen={value === entry.key}
                >
                  <span>{entry.label}</span>
                  {entry.count !== undefined && (
                    <small>{entry.count.toLocaleString("pt-BR")}</small>
                  )}
                  <Check aria-hidden="true" className={value === entry.key ? "" : "invisible"} />
                </CommandItem>
              ))}
            </CommandList>
          </Command>
          <p className="trainer-picker-hint">
            ↑ ↓ para navegar · Enter para selecionar · Esc para fechar
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
