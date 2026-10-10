import { useRef, useState } from "react";
import { Camera, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const SIZE = 256;
export const AVATAR_EVENT = "norte:avatar-changed";

/** Recorta o centro em quadrado e reduz para 256 px (JPEG): arquivo leve, sem exagero. */
async function toSquareJpeg(file: File): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const side = Math.min(bmp.width, bmp.height);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  ctx.drawImage(bmp, (bmp.width - side) / 2, (bmp.height - side) / 2, side, side, 0, 0, SIZE, SIZE);
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("blob"))), "image/jpeg", 0.85),
  );
}

export function AvatarUploader({
  userId,
  name,
  url,
}: {
  userId: string;
  name: string;
  url?: string | null | undefined;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [current, setCurrent] = useState(url ?? null);
  const initials =
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0])
      .join("")
      .toUpperCase() || "NC";

  const publish = (next: string | null) => {
    setCurrent(next);
    window.dispatchEvent(new CustomEvent(AVATAR_EVENT, { detail: next }));
  };

  async function onFile(file?: File) {
    if (!file) return;
    if (!/^image\/(jpeg|png|webp)$/.test(file.type))
      return void toast.error("Use uma imagem JPG, PNG ou WebP.");
    if (file.size > 8 * 1024 * 1024) return void toast.error("Imagem muito grande (máx. 8 MB).");
    setBusy(true);
    try {
      const blob = await toSquareJpeg(file);
      const path = `${userId}/avatar.jpg`;
      const { error } = await supabase.storage
        .from("avatars")
        .upload(path, blob, { upsert: true, contentType: "image/jpeg" });
      if (error) throw error;
      const publicUrl = `${supabase.storage.from("avatars").getPublicUrl(path).data.publicUrl}?v=${Date.now()}`;
      const { error: pErr } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", userId);
      if (pErr) throw pErr;
      publish(publicUrl);
      toast.success("Foto atualizada.");
    } catch {
      toast.error("Não foi possível enviar a foto. Tente outra imagem.");
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }

  async function remove() {
    setBusy(true);
    try {
      await supabase.storage.from("avatars").remove([`${userId}/avatar.jpg`]);
      const { error } = await supabase
        .from("profiles")
        .update({ avatar_url: null })
        .eq("id", userId);
      if (error) throw error;
      publish(null);
      toast.success("Foto removida.");
    } catch {
      toast.error("Não foi possível remover a foto.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-4 border-b pb-6">
      {current ? (
        <img
          src={current}
          alt={`Foto de ${name}`}
          width={72}
          height={72}
          className="h-[72px] w-[72px] rounded-2xl object-cover"
        />
      ) : (
        <span
          className="grid h-[72px] w-[72px] place-items-center rounded-2xl bg-primary/10 text-xl font-extrabold text-primary"
          aria-hidden
        >
          {initials}
        </span>
      )}
      <div className="space-y-2">
        <p className="text-sm font-medium">Foto de perfil</p>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={busy}
            onClick={() => input.current?.click()}
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
            {current ? "Trocar foto" : "Adicionar foto"}
          </Button>
          {current && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              disabled={busy}
              onClick={() => void remove()}
            >
              <Trash2 className="h-4 w-4" /> Remover
            </Button>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          JPG, PNG ou WebP. Recortamos em quadrado automaticamente.
        </p>
        <input
          ref={input}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => void onFile(e.target.files?.[0])}
        />
      </div>
    </div>
  );
}
