import { TextSearch } from "lucide-react";

/**
 * Aviso mostrado em questões que remetem a "o texto" sem o texto de apoio cadastrado,
 * para o candidato não se prejudicar tentando resolver sem o material.
 */
export function MissingTextNotice({ scoring = false }: { scoring?: boolean }) {
  return (
    <div role="alert" className="flex items-start gap-3 rounded-xl border-2 border-amber-400 bg-amber-50 p-3 text-sm text-amber-950 dark:border-amber-500/50 dark:bg-amber-950/30 dark:text-amber-100">
      <TextSearch className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
      <div className="space-y-1">
        <p className="font-bold">Texto de apoio ausente nesta questão</p>
        <p>O enunciado cita um texto que ainda não está cadastrado na plataforma, então não dá para resolvê-la com segurança.{scoring ? " Sua resposta não conta para o ranking nem para o seu desempenho." : " Ela não deve ser usada para medir seu desempenho."} Estamos reunindo os textos dos cadernos oficiais.</p>
      </div>
    </div>
  );
}
