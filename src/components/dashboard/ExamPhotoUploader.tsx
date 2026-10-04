import React from "react";
import { canonicalBoard } from "@/lib/subjects";
import { ArrowDown, ArrowUp, Loader2, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface Picked {
  id: string;
  file: File;
  preview: string;
}

const MAX_SIDE = 2000;

const slugify = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Reduz fotos grandes de celular para ~2000 px (JPEG) antes de enviar; se algo falhar, envia o original.
async function prepare(file: File): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.88),
    );
    return blob ?? file;
  } catch {
    return file;
  }
}

export function ExamPhotoUploader({
  contest,
  year,
  board,
  existingPages,
  onUploaded,
}: {
  contest: string;
  year: string;
  board: string;
  existingPages: number;
  onUploaded: () => void;
}) {
  const [picked, setPicked] = React.useState<Picked[]>([]);
  const [busy, setBusy] = React.useState(false);
  const [done, setDone] = React.useState(0);
  const [message, setMessage] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onPick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).filter((file) =>
      file.type.startsWith("image/"),
    );
    // Fotos salvas em sequência, da última página para a primeira, ficam com data de
    // modificação decrescente; ordenar assim reproduz a ordem do caderno. Dá para ajustar depois.
    files.sort((a, b) => b.lastModified - a.lastModified);
    setPicked((current) => [
      ...current,
      ...files.map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        preview: URL.createObjectURL(file),
      })),
    ]);
    setMessage(null);
    event.target.value = "";
  };

  const move = (index: number, delta: number) =>
    setPicked((current) => {
      const target = index + delta;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target]!, next[index]!];
      return next;
    });

  const remove = (id: string) => setPicked((current) => current.filter((item) => item.id !== id));

  const send = async () => {
    if (!picked.length || busy) return;
    setBusy(true);
    setDone(0);
    setMessage(null);
    try {
      const { data } = await supabase.auth.getSession();
      const userId = data.session?.user.id;
      if (!userId) throw new Error("Sua sessão expirou. Entre novamente para enviar as fotos.");
      const folder = `${userId}/${slugify(contest)}-${year}`;
      let sent = 0;
      for (const item of [...picked]) {
        const page = existingPages + sent + 1;
        const storagePath = `${folder}/pagina-${String(page).padStart(2, "0")}-${Date.now().toString(36)}.jpg`;
        const blob = await prepare(item.file);
        const upload = await supabase.storage
          .from("student-exams")
          .upload(storagePath, blob, { contentType: "image/jpeg", upsert: false });
        if (upload.error) throw upload.error;
        const insert = await supabase.from("student_exam_documents").insert({
          user_id: userId,
          contest_name: contest,
          contest_year: year,
          exam_board: canonicalBoard(board) || null,
          doc_type: "prova_realizada",
          file_name: `${slugify(contest)}_${year}_pagina_${page}.jpg`,
          storage_path: storagePath,
          file_size_bytes: blob.size,
        });
        if (insert.error) throw insert.error;
        sent += 1;
        setDone(sent);
        URL.revokeObjectURL(item.preview);
        setPicked((current) => current.filter((entry) => entry.id !== item.id));
      }
      setMessage(`${sent} página(s) enviada(s).`);
    } catch (error) {
      console.error("Falha ao enviar fotos da prova", error);
      setMessage(
        error instanceof Error
          ? `Não foi possível concluir o envio: ${error.message}`
          : "Não foi possível concluir o envio.",
      );
    } finally {
      setBusy(false);
      onUploaded();
    }
  };

  return (
    <div className="space-y-3 rounded-2xl border border-dashed bg-background p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-black">Enviar fotos desta prova</h4>
          <p className="text-xs text-muted-foreground">
            Escolha as fotos das páginas. A ordem inicial segue a data dos arquivos; use as setas
            para ajustar. Só você vê estas imagens.
          </p>
        </div>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onPick}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="mr-2 h-4 w-4" /> Escolher fotos
          </Button>
          <Button
            type="button"
            size="sm"
            disabled={busy || !picked.length}
            onClick={() => void send()}
          >
            {busy ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando {done}/
                {picked.length + done}
              </>
            ) : (
              `Enviar ${picked.length || ""} foto(s)`
            )}
          </Button>
        </div>
      </div>
      {message && <p className="text-xs font-bold text-muted-foreground">{message}</p>}
      {picked.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
          {picked.map((item, index) => (
            <div key={item.id} className="relative aspect-[3/4] overflow-hidden rounded-xl border">
              <img
                src={item.preview}
                alt={`Foto ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <span className="absolute left-1 top-1 rounded bg-black/70 px-1.5 text-[10px] font-bold text-white">
                {existingPages + done + index + 1}
              </span>
              {!busy && (
                <>
                  <button
                    type="button"
                    aria-label="Remover foto"
                    onClick={() => remove(item.id)}
                    className="absolute right-1 top-1 rounded bg-black/70 p-0.5 text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1 bg-black/60 py-1">
                    <button
                      type="button"
                      aria-label="Mover para trás"
                      onClick={() => move(index, -1)}
                      className="rounded bg-white/20 p-0.5 text-white"
                    >
                      <ArrowUp className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      aria-label="Mover para frente"
                      onClick={() => move(index, 1)}
                      className="rounded bg-white/20 p-0.5 text-white"
                    >
                      <ArrowDown className="h-3 w-3" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
