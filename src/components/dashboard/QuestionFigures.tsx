import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type QuestionIllustration } from "@/lib/questionMedia";

/** Original figures, including captions that identify graphs and alternative labels. */
export function QuestionFigures({
  urls,
  illustrations,
}: {
  urls?: string[];
  illustrations?: QuestionIllustration[];
}) {
  const figures = new Map<string, string>();
  for (const url of urls ?? []) figures.set(url, "Figura original do enunciado");
  for (const figure of illustrations ?? []) figures.set(figure.url, figure.description);
  if (!figures.size) return null;
  return (
    <div className="my-3 flex flex-wrap justify-center gap-3 sm:my-4">
      {[...figures].map(([url, description]) => (
        <figure
          key={url}
          className="max-w-full space-y-2 rounded-lg border bg-white p-2 text-slate-900"
        >
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="block max-w-full cursor-zoom-in rounded focus-visible:outline-2 focus-visible:outline-primary"
                aria-label={`Ampliar: ${description}`}
              >
                <img
                  src={url}
                  alt={description}
                  loading="lazy"
                  className="h-auto max-h-[720px] max-w-full object-contain"
                />
              </button>
            </DialogTrigger>
            <DialogContent className="max-h-[95vh] w-[95vw] max-w-6xl overflow-auto bg-white text-slate-900">
              <DialogTitle className="text-base">Figura da questão</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
              <img
                src={url}
                alt={description}
                className="mx-auto h-auto max-w-full object-contain"
              />
            </DialogContent>
          </Dialog>
          <figcaption className="text-center text-xs leading-5">
            {description} · Selecione a imagem para ampliar
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
