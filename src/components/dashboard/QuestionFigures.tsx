/** Figuras do enunciado (cartaz, gráfico, esquema) enviadas ao bucket público question-figures. */
export function QuestionFigures({ urls }: { urls?: string[] | undefined }) {
  if (!urls?.length) return null;
  return (
    <div className="my-3 flex flex-wrap justify-center gap-3 sm:my-4">
      {urls.map((url, i) => (
        <img
          key={url}
          src={url}
          alt={`Figura ${i + 1} do enunciado da questão`}
          loading="lazy"
          className="max-h-[420px] max-w-full rounded-lg border bg-white object-contain p-1"
        />
      ))}
    </div>
  );
}
