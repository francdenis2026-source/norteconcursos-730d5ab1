import * as React from "react";
import { CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

import { MONTHS, WEEK, iso, parse, todayIso, formatDateBR } from "@/lib/dateFormat";

interface Props {
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  placeholder?: string;
  id?: string;
  "aria-label"?: string;
  required?: boolean;
  className?: string;
}

/** Seletor de data da plataforma (pt-BR, calendário próprio). Valor sempre em yyyy-mm-dd. */
export function DatePicker({
  value,
  onChange,
  min,
  max,
  placeholder = "Escolher data",
  id,
  required,
  className,
  ...rest
}: Props) {
  const [open, setOpen] = React.useState(false);
  const initial = parse(value) ?? parse(todayIso())!;
  const [view, setView] = React.useState({ y: initial.y, m: initial.m });
  const root = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const p = parse(value);
    if (p) setView({ y: p.y, m: p.m });
    const onDown = (e: MouseEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, value]);

  const first = new Date(view.y, view.m, 1).getDay();
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)] as (
    number | null
  )[];
  const disabled = (d: number) => {
    const s = iso(view.y, view.m, d);
    return (!!min && s < min) || (!!max && s > max);
  };
  const shift = (delta: number) =>
    setView((v) => {
      const t = v.m + delta;
      return { y: v.y + Math.floor(t / 12), m: ((t % 12) + 12) % 12 };
    });
  const today = todayIso();

  return (
    <div ref={root} className={cn("relative", className)}>
      <button
        type="button"
        id={id}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={rest["aria-label"]}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-10 w-full items-center gap-2 rounded-md border border-input bg-background px-3 text-left text-sm transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          !value && "text-muted-foreground",
        )}
      >
        <CalendarDays className="h-4 w-4 shrink-0 text-primary" aria-hidden />
        <span className="flex-1 truncate">{value ? formatDateBR(value) : placeholder}</span>
        {value && !required && (
          <span
            role="button"
            tabIndex={0}
            aria-label="Limpar data"
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.stopPropagation();
                onChange("");
              }
            }}
            className="rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </span>
        )}
      </button>
      {required && (
        <input
          tabIndex={-1}
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0"
          required
          value={value}
          onChange={() => undefined}
        />
      )}

      {open && (
        <div
          role="dialog"
          aria-label="Calendário"
          className="absolute left-0 z-50 mt-1.5 w-[17.5rem] max-w-[calc(100vw-2rem)] rounded-xl border bg-popover p-3 text-popover-foreground shadow-xl"
        >
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => shift(-1)}
              aria-label="Mês anterior"
              className="grid h-8 w-8 place-items-center rounded-md hover:bg-muted"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <p className="text-sm font-bold first-letter:uppercase">
              {MONTHS[view.m]} de {view.y}
            </p>
            <button
              type="button"
              onClick={() => shift(1)}
              aria-label="Próximo mês"
              className="grid h-8 w-8 place-items-center rounded-md hover:bg-muted"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-7 text-center text-[0.68rem] font-semibold text-muted-foreground">
            {WEEK.map((w, i) => (
              <span key={i} className="py-1">
                {w}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-0.5 text-center">
            {cells.map((d, i) => {
              if (d === null) return <span key={i} />;
              const s = iso(view.y, view.m, d);
              const selected = s === value;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={disabled(d)}
                  aria-pressed={selected}
                  onClick={() => {
                    onChange(s);
                    setOpen(false);
                  }}
                  className={cn(
                    "mx-auto grid h-8 w-8 place-items-center rounded-full text-sm tabular-nums transition-colors",
                    selected ? "bg-primary font-bold text-primary-foreground" : "hover:bg-muted",
                    s === today &&
                      !selected &&
                      "border border-primary/60 font-semibold text-primary",
                    "disabled:pointer-events-none disabled:opacity-30",
                  )}
                >
                  {d}
                </button>
              );
            })}
          </div>
          <div className="mt-2 flex items-center justify-between border-t pt-2 text-xs">
            <button
              type="button"
              className="font-semibold text-primary hover:underline disabled:opacity-40"
              disabled={(!!min && today < min) || (!!max && today > max)}
              onClick={() => {
                onChange(today);
                setOpen(false);
              }}
            >
              Hoje
            </button>
            {value && !required && (
              <button
                type="button"
                className="text-muted-foreground hover:underline"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
              >
                Limpar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
