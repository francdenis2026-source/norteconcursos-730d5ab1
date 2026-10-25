import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/** Keeps page position local to the selected booklet; signed URLs are never persisted. */
export function ExamBookletViewer({
  pages,
  initialIndex,
  title,
  onClose,
}: {
  pages: { id: string; url?: string | undefined }[];
  initialIndex: number | null;
  title: string;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [failed, setFailed] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (initialIndex !== null) {
      setIndex(initialIndex);
      setZoom(100);
    }
  }, [initialIndex]);
  useEffect(() => {
    setFailed(false);
    viewport.current?.scrollTo(0, 0);
  }, [index, pages[index]?.url]);
  const move = (step: number) => setIndex((i) => Math.max(0, Math.min(pages.length - 1, i + step)));
  return (
    <Dialog
      open={initialIndex !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        className="flex h-[94dvh] w-[96vw] max-w-6xl flex-col gap-3 overflow-hidden p-4 sm:p-6"
        onKeyDown={(event) => {
          if ((event.target as HTMLElement).matches("input,select,textarea")) return;
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
        }}
      >
        <DialogTitle className="pr-8">{title}</DialogTitle>
        <DialogDescription>
          Página {index + 1} de {pages.length}. Use as setas para navegar e Esc para voltar à prova.
        </DialogDescription>
        <div
          className="flex flex-wrap items-center gap-2 border-y py-2"
          role="toolbar"
          aria-label="Navegação do caderno"
        >
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11"
            aria-label="Página anterior"
            disabled={index === 0}
            onClick={() => move(-1)}
          >
            <ChevronLeft />
          </Button>
          <label className="flex items-center gap-2 text-sm">
            Página
            <select
              aria-label="Ir para página"
              className="h-11 rounded-md border bg-background px-2"
              value={index}
              onChange={(e) => setIndex(Number(e.target.value))}
            >
              {pages.map((p, i) => (
                <option key={p.id} value={i}>
                  {i + 1} de {pages.length}
                </option>
              ))}
            </select>
          </label>
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11"
            aria-label="Próxima página"
            disabled={index >= pages.length - 1}
            onClick={() => move(1)}
          >
            <ChevronRight />
          </Button>
          <div className="flex items-center gap-2 sm:ml-auto">
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11"
              aria-label="Diminuir zoom"
              disabled={zoom <= 50}
              onClick={() => setZoom((z) => Math.max(50, z - 25))}
            >
              <ZoomOut />
            </Button>
            <output className="w-12 text-center text-sm" aria-label="Zoom">
              {zoom}%
            </output>
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11"
              aria-label="Aumentar zoom"
              disabled={zoom >= 250}
              onClick={() => setZoom((z) => Math.min(250, z + 25))}
            >
              <ZoomIn />
            </Button>
            <Button variant="outline" className="min-h-11" onClick={() => setZoom(100)}>
              <Maximize className="mr-2 h-4 w-4" />
              Ajustar
            </Button>
          </div>
        </div>
        <div ref={viewport} className="min-h-0 flex-1 overflow-auto rounded-lg bg-muted p-2">
          {!pages[index]?.url ? (
            <p role="status" className="p-6 text-sm">
              Carregando a página. Se não aparecer, feche o caderno e abra a prova novamente.
            </p>
          ) : failed ? (
            <div role="alert" className="p-6 text-sm">
              Não foi possível abrir esta imagem. Feche e reabra a prova para renovar o acesso.
            </div>
          ) : (
            <img
              key={pages[index]?.url}
              src={pages[index]?.url}
              alt={`Página ${index + 1} de ${title}`}
              onError={() => setFailed(true)}
              className="mx-auto h-auto max-w-none rounded bg-white"
              style={{ width: `${zoom}%` }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
