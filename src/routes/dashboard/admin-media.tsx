import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckCircle2, Headphones, Loader2, PlayCircle, Plus, RefreshCw, ShieldCheck, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStatus } from "@/hooks/useDashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHero, HeroStat } from "@/components/dashboard/PageHero";
import { AudioPlayer } from "@/components/media/AudioPlayer";
import { DISCIPLINES, youtubeEmbedUrl } from "@/data/mediaCatalog";
import { topicsFor } from "@/data/studyTopics";
import { confirmDialog } from "@/lib/confirm";
import { MEDIA_KEY, checkYoutube, parseYoutube, type PodcastRow, type VideoRow } from "@/lib/mediaStore";

export const Route = createFileRoute("/dashboard/admin-media")({
  head: () => ({ meta: [{ title: "Central de mídia (admin) | Norte Concurso" }, { name: "robots", content: "noindex" }] }),
  component: AdminMediaPage,
});

const STATUS: Record<VideoRow["status"], { label: string; cls: string }> = {
  ok: { label: "Disponível", cls: "bg-emerald-500/15 text-emerald-700" },
  blocked: { label: "Só no YouTube", cls: "bg-amber-500/15 text-amber-700" },
  gone: { label: "Removido", cls: "bg-rose-500/15 text-rose-700" },
  unchecked: { label: "Não verificado", cls: "bg-muted text-muted-foreground" },
};
const MAX_AUDIO = 100 * 1024 * 1024;
const selectCls = "h-10 rounded-md border border-input bg-background px-3 text-sm";

function AdminMediaPage() {
  const { isAdmin } = useAuthStatus();
  const qc = useQueryClient();
  const [videos, setVideos] = useState<VideoRow[]>([]);
  const [podcasts, setPodcasts] = useState<PodcastRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const [v, p] = await Promise.all([
      supabase.from("media_videos").select("*").order("subject").order("topic").order("sort_order").limit(5000),
      supabase.from("media_podcasts").select("*").order("created_at", { ascending: false }).limit(1000),
    ]);
    setMissing(!!v.error);
    setVideos((v.data ?? []) as VideoRow[]);
    setPodcasts((p.data ?? []) as PodcastRow[]);
    setLoading(false);
  }, []);
  useEffect(() => {
    if (isAdmin) void load();
  }, [isAdmin, load]);

  const refresh = async () => {
    await qc.invalidateQueries({ queryKey: MEDIA_KEY });
    await load();
  };

  if (!isAdmin) return <p className="p-6 text-muted-foreground">Acesso restrito ao administrador.</p>;
  const count = (s: VideoRow["status"]) => videos.filter((v) => v.status === s).length;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageHero
        image="command-room"
        size="sm"
        kicker="Administração"
        icon={PlayCircle}
        title={<>Central de <em>mídia</em></>}
        description="Gerencie as videoaulas por matéria e assunto e os podcasts que os alunos veem na plataforma."
        actions={<Button className="hero-btn-ghost gap-2" onClick={() => void refresh()} disabled={loading}><RefreshCw className="h-4 w-4" aria-hidden /> Atualizar</Button>}
      >
        <div className="page-hero__stats">
          <HeroStat icon={PlayCircle} label="Vídeos" value={videos.length} />
          <HeroStat icon={CheckCircle2} label="Disponíveis" value={count("ok")} />
          <HeroStat icon={ShieldCheck} label="Só no YouTube" value={count("blocked")} />
          <HeroStat icon={Trash2} label="Removidos" value={count("gone")} />
          <HeroStat icon={Headphones} label="Podcasts" value={podcasts.length} />
        </div>
      </PageHero>

      {missing && (
        <p className="rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-sm">
          As tabelas da Central de mídia ainda não existem no banco. Rode o arquivo <b>supabase/migrations/20261004100000_media_center.sql</b> no SQL Editor do Supabase; até lá os alunos veem o catálogo padrão do app.
        </p>
      )}
      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" aria-label="Carregando" /></div>
      ) : (
        <Tabs defaultValue="videos">
          <TabsList>
            <TabsTrigger value="videos">Videoaulas</TabsTrigger>
            <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
          </TabsList>
          <TabsContent value="videos"><VideosAdmin videos={videos} onChange={refresh} /></TabsContent>
          <TabsContent value="podcasts"><PodcastsAdmin podcasts={podcasts} onChange={refresh} /></TabsContent>
        </Tabs>
      )}
    </div>
  );
}

function VideosAdmin({ videos, onChange }: { videos: VideoRow[]; onChange: () => Promise<void> }) {
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const previewVideo = videos.find((x) => x.id === preview) ?? null;
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ subject: DISCIPLINES[0] as string, topic: "*", link: "", title: "", channel: "" });

  const subjects = useMemo(() => [...new Set(videos.map((v) => v.subject))].sort(), [videos]);
  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    return videos
      .filter((v) => (!subject || v.subject === subject) && (!status || v.status === status))
      .filter((v) => !term || `${v.title} ${v.topic} ${v.channel ?? ""}`.toLowerCase().includes(term))
      .slice(0, 200);
  }, [videos, subject, status, q]);

  const run = async (fn: () => PromiseLike<{ error: { message: string } | null }>, ok: string) => {
    const { error } = await fn();
    if (error) toast.error(error.message);
    else {
      toast.success(ok);
      await onChange();
    }
  };

  const verify = async (list: VideoRow[]) => {
    setBusy(true);
    let done = 0;
    for (const v of list) {
      const r = await checkYoutube(v.youtube_id);
      if (r) {
        await supabase.from("media_videos").update({
          status: r.status,
          embeddable: r.status === "ok",
          ...(r.channel ? { channel: r.channel } : {}),
          checked_at: new Date().toISOString(),
        }).eq("id", v.id);
        done++;
      }
    }
    setBusy(false);
    toast.success(`${done} de ${list.length} verificado(s).`);
    await onChange();
  };

  const add = async () => {
    const parsed = parseYoutube(form.link);
    if (!parsed) { toast.error("Link ou ID do YouTube inválido."); return; }
    setBusy(true);
    const meta = await checkYoutube(parsed.id);
    if (meta?.status === "gone") {
      setBusy(false);
      toast.error("Este vídeo não existe mais no YouTube.");
      return;
    }
    const title = form.title.trim() || meta?.title || "";
    if (!title) {
      setBusy(false);
      { toast.error("Informe o título do vídeo."); return; }
    }
    const { error } = await supabase.from("media_videos").insert({
      subject: form.subject,
      topic: form.topic.trim() || "*",
      youtube_id: parsed.id,
      title,
      channel: form.channel.trim() || meta?.channel || null,
      embeddable: meta ? meta.status === "ok" : true,
      status: meta?.status ?? "unchecked",
      checked_at: meta ? new Date().toISOString() : null,
    });
    setBusy(false);
    if (error) { toast.error(error.code === "23505" ? "Este vídeo já está cadastrado nesse assunto." : error.message); return; }
    toast.success("Vídeo adicionado.");
    setForm({ ...form, link: "", title: "", channel: "" });
    await onChange();
  };

  const remove = async (v: VideoRow) => {
    if (!(await confirmDialog({ title: "Excluir vídeo?", message: `“${v.title}” será removido da Central de mídia.`, confirmLabel: "Excluir" }))) return;
    await run(() => supabase.from("media_videos").delete().eq("id", v.id), "Vídeo excluído.");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Adicionar vídeo</CardTitle><CardDescription>Cole o link do vídeo ou da playlist; título e canal são preenchidos pelo YouTube.</CardDescription></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <select className={selectCls} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value, topic: "*" })} aria-label="Matéria">
            {[...new Set([...DISCIPLINES, ...subjects])].map((d) => <option key={d}>{d}</option>)}
          </select>
          <div>
            <Input list="topics-list" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} placeholder="Assunto (* = geral da matéria)" aria-label="Assunto" />
            <datalist id="topics-list">{["*", ...topicsFor(form.subject)].map((t) => <option key={t} value={t} />)}</datalist>
          </div>
          <Input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="Link ou ID do YouTube" aria-label="Link do YouTube" />
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Título (opcional)" aria-label="Título" />
          <Input value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })} placeholder="Canal (opcional)" aria-label="Canal" />
          <Button onClick={() => void add()} disabled={busy} className="gap-2"><Plus className="h-4 w-4" aria-hidden /> Adicionar</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Videoaulas cadastradas</CardTitle>
          <CardDescription>Mostrando {shown.length} de {videos.length}. Desativar esconde o vídeo dos alunos sem excluir.</CardDescription>
          <div className="flex flex-wrap gap-2 pt-2">
            <select className={selectCls} value={subject} onChange={(e) => setSubject(e.target.value)} aria-label="Filtrar por matéria"><option value="">Todas as matérias</option>{subjects.map((s) => <option key={s}>{s}</option>)}</select>
            <select className={selectCls} value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filtrar por status"><option value="">Todos os status</option>{Object.entries(STATUS).map(([k, s]) => <option key={k} value={k}>{s.label}</option>)}</select>
            <Input className="w-56" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar título, assunto ou canal" aria-label="Buscar" />
            <Button variant="outline" disabled={busy || !shown.length} onClick={() => void verify(shown)} className="gap-2">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" aria-hidden />} Verificar disponibilidade ({shown.length})</Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-muted-foreground"><th className="py-2">Matéria · assunto</th><th>Título / canal</th><th>Status</th><th className="text-right">Ações</th></tr></thead>
            <tbody>
              {shown.map((v) => (
                <tr key={v.id} className={`border-t border-border align-top ${v.active ? "" : "opacity-50"}`}>
                  <td className="py-2 pr-3"><div className="font-medium text-foreground">{v.subject}</div><div className="text-xs text-muted-foreground">{v.topic === "*" ? "Geral" : v.topic}</div></td>
                  <td className="pr-3"><div>{v.title}</div><div className="text-xs text-muted-foreground">{v.channel ?? "Canal desconhecido"}{v.is_playlist ? " · playlist" : ""}</div></td>
                  <td><Badge className={STATUS[v.status].cls} variant="secondary">{STATUS[v.status].label}</Badge></td>
                  <td className="space-x-1 whitespace-nowrap text-right">
                    <Button size="sm" variant="ghost" onClick={() => setPreview(v.id)}>Prévia</Button>
                    <Button size="sm" variant="ghost" onClick={() => void run(() => supabase.from("media_videos").update({ active: !v.active }).eq("id", v.id), v.active ? "Vídeo desativado." : "Vídeo ativado.")}>{v.active ? "Desativar" : "Ativar"}</Button>
                    <Button size="sm" variant="ghost" aria-label="Excluir" onClick={() => void remove(v)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      <Dialog open={!!previewVideo} onOpenChange={(open) => !open && setPreview(null)}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="pr-6 text-base">{previewVideo?.title}</DialogTitle>
            <DialogDescription>{previewVideo?.channel ?? "Canal desconhecido"}{previewVideo && !previewVideo.embeddable ? " · o autor não permite exibir fora do YouTube" : ""}</DialogDescription>
          </DialogHeader>
          {previewVideo && (
            <iframe title={previewVideo.title} src={youtubeEmbedUrl(previewVideo.youtube_id)} className="aspect-video w-full rounded-lg" allow="fullscreen; encrypted-media" allowFullScreen />
          )}
          {previewVideo && (
            <a className="text-sm text-primary underline" target="_blank" rel="noreferrer" href={previewVideo.is_playlist ? `https://www.youtube.com/playlist?list=${previewVideo.youtube_id}` : `https://www.youtube.com/watch?v=${previewVideo.youtube_id}`}>Abrir no YouTube</a>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PodcastsAdmin({ podcasts, onChange }: { podcasts: PodcastRow[]; onChange: () => Promise<void> }) {
  const [form, setForm] = useState({ title: "", subject: DISCIPLINES[0] as string, description: "", url: "" });
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  const add = async () => {
    if (!form.title.trim()) { toast.error("Informe o título."); return; }
    if (!file && !form.url.trim()) { toast.error("Envie um arquivo de áudio ou informe a URL."); return; }
    if (file && file.size > MAX_AUDIO) { toast.error("O áudio deve ter no máximo 100 MB."); return; }
    setBusy(true);
    let audio_url = form.url.trim();
    let audio_path: string | null = null;
    if (file) {
      audio_path = `${crypto.randomUUID()}-${file.name.replace(/[^\w.-]+/g, "_")}`;
      const up = await supabase.storage.from("podcasts").upload(audio_path, file, { contentType: file.type || "audio/mpeg" });
      if (up.error) {
        setBusy(false);
        { toast.error(up.error.message); return; }
      }
      audio_url = supabase.storage.from("podcasts").getPublicUrl(audio_path).data.publicUrl;
    }
    const { error } = await supabase.from("media_podcasts").insert({ title: form.title.trim(), subject: form.subject, description: form.description.trim() || null, audio_url, audio_path });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Podcast adicionado.");
    setForm({ ...form, title: "", description: "", url: "" });
    setFile(null);
    await onChange();
  };

  const toggle = async (p: PodcastRow) => {
    const { error } = await supabase.from("media_podcasts").update({ active: !p.active }).eq("id", p.id);
    if (error) toast.error(error.message);
    else await onChange();
  };
  const remove = async (p: PodcastRow) => {
    if (!(await confirmDialog({ title: "Excluir podcast?", message: `“${p.title}” e o arquivo de áudio enviado serão apagados.`, confirmLabel: "Excluir" }))) return;
    if (p.audio_path) await supabase.storage.from("podcasts").remove([p.audio_path]);
    const { error } = await supabase.from("media_podcasts").delete().eq("id", p.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Podcast excluído.");
      await onChange();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Adicionar podcast</CardTitle><CardDescription>Envie o áudio (até 100 MB) ou cole a URL de um arquivo já hospedado.</CardDescription></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Título" aria-label="Título" />
          <select className={selectCls} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} aria-label="Matéria">{DISCIPLINES.map((d) => <option key={d}>{d}</option>)}</select>
          <Textarea className="md:col-span-2" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Descrição (opcional)" aria-label="Descrição" />
          <label className="flex h-10 cursor-pointer items-center gap-2 rounded-md border border-dashed border-input px-3 text-sm text-muted-foreground">
            <Upload className="h-4 w-4" aria-hidden /> {file ? file.name : "Escolher arquivo de áudio"}
            <input type="file" accept="audio/*" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          </label>
          <Input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="…ou URL do áudio" aria-label="URL do áudio" disabled={!!file} />
          <Button onClick={() => void add()} disabled={busy} className="gap-2 md:col-span-2">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" aria-hidden />} Adicionar podcast</Button>
        </CardContent>
      </Card>
      {!podcasts.length && <p className="text-sm text-muted-foreground">Nenhum podcast cadastrado ainda.</p>}
      <div className="grid gap-4 md:grid-cols-2">
        {podcasts.map((p) => (
          <Card key={p.id} className={p.active ? "" : "opacity-60"}>
            <CardHeader><CardTitle className="text-base">{p.title}</CardTitle><CardDescription>{p.subject}{p.description ? ` · ${p.description}` : ""}</CardDescription></CardHeader>
            <CardContent className="space-y-3">
              <AudioPlayer src={p.audio_url} title={p.title} subtitle={p.subject} />
              <div className="flex justify-end gap-1">
                <Button size="sm" variant="ghost" onClick={() => void toggle(p)}>{p.active ? "Desativar" : "Ativar"}</Button>
                <Button size="sm" variant="ghost" aria-label="Excluir" onClick={() => void remove(p)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
