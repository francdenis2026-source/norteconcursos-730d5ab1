import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Timer, Layers, ListChecks, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/dashboard/study-tools')({
  component: StudyToolsPage,
});

const FLASHCARDS = [
  { f: 'CEBRASPE: item ANULADO vale quanto ponto?', b: '+1 ponto para TODOS os candidatos (crédito automático), independente da resposta marcada.' },
  { f: 'Item em BRANCO (sem marcação) vale quanto?', b: '0 pontos — não soma nem subtrai. Só "certa" (+1) e "errada" (−1) alteram a nota.' },
  { f: 'Lei 13.869/2019 revogou qual lei antiga?', b: 'A Lei nº 4.898/1965 (antiga lei de abuso de autoridade).' },
  { f: 'CF art. 144: quantos são os órgãos de segurança pública hoje?', b: '6 órgãos desde a EC 104/2019 (inclui as polícias penais). Material antigo ainda fala em 5 — desatualizado.' },
  { f: 'Regime de competência x regime de caixa: qual a diferença?', b: 'Competência: registra quando o fato gerador ocorre. Caixa: registra só quando o dinheiro entra ou sai de fato.' },
  { f: 'Em uma tabela-verdade, quando um "OU" (∨) é falso?', b: 'Só quando AMBAS as proposições são falsas.' },
  { f: 'Modelo OSI: quais as 7 camadas, de baixo para cima?', b: 'Física, Enlace, Rede, Transporte, Sessão, Apresentação, Aplicação.' },
  { f: 'Lei de Migração: o que NÃO pode motivar deportação sozinho?', b: 'A mera situação migratória irregular — a deportação é medida administrativa, não penal.' },
  { f: 'Lei 12.850/2013 revogou qual lei antiga?', b: 'A Lei nº 9.034/1995 (antiga lei de organização criminosa).' },
];

const CHECKLIST_ITEMS = [
  'Revisei tabela-verdade e equivalências lógicas',
  'Revisei probabilidade e combinatória',
  'Revisei patrimônio líquido e balancete',
  'Revisei regime de competência x regime de caixa',
  'Li a CF art. 5º e art. 144 na íntegra (versão atualizada)',
  'Revisei Lei de Abuso de Autoridade (13.869/2019)',
  'Revisei Lei de Migração (13.445/2017)',
  'Revisei Lei de Crimes Ambientais (9.605/1998)',
  'Pratiquei 1 redação discursiva completa',
  'Revisei protocolos de rede (TCP/IP, OSI)',
  'Revisei conceitos de Big Data / Machine Learning',
  'Fiz pelo menos 1 simulado completo cronometrado',
];

function StudyToolsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Central de Estudos</h1>
        <p className="text-muted-foreground">Ferramentas rápidas para usar durante o estudo.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PomodoroCard />
        <FlashcardsCard />
      </div>

      <ChecklistCard />
    </div>
  );
}

function PomodoroCard() {
  const [mode, setMode] = React.useState<25 | 50 | 5>(25);
  const [secondsLeft, setSecondsLeft] = React.useState(25 * 60);
  const [running, setRunning] = React.useState(false);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  React.useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(s => {
          if (s <= 1) { setRunning(false); return 0; }
          return s - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const changeMode = (m: 25 | 50 | 5) => {
    setMode(m); setRunning(false); setSecondsLeft(m * 60);
  };

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2"><Timer className="h-5 w-5 text-secondary" /> Cronômetro de foco (Pomodoro)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center gap-2">
          {([25, 50, 5] as const).map(m => (
            <button
              key={m}
              onClick={() => changeMode(m)}
              className={cn(
                "text-xs font-bold px-3 py-1.5 rounded-full transition-colors",
                mode === m ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"
              )}
            >
              {m === 5 ? 'Pausa 5min' : `Foco ${m}min`}
            </button>
          ))}
        </div>
        <div className="text-5xl font-black text-center tabular-nums py-4">
          {secondsLeft === 0 ? 'Concluído!' : `${mm}:${ss}`}
        </div>
        <div className="flex justify-center gap-2">
          <Button onClick={() => setRunning(r => !r)} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            {running ? 'Pausar' : 'Iniciar'}
          </Button>
          <Button variant="outline" onClick={() => { setRunning(false); setSecondsLeft(mode * 60); }}>
            <RotateCcw className="h-4 w-4 mr-1" /> Zerar
          </Button>
        </div>
        <p className="text-[11px] text-muted-foreground text-center">1 assunto por bloco, sem celular por perto.</p>
      </CardContent>
    </Card>
  );
}

function FlashcardsCard() {
  const [idx, setIdx] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const card = FLASHCARDS[idx];

  const next = () => { setFlipped(false); setIdx(i => (i + 1) % FLASHCARDS.length); };
  const prev = () => { setFlipped(false); setIdx(i => (i - 1 + FLASHCARDS.length) % FLASHCARDS.length); };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2"><Layers className="h-5 w-5 text-secondary" /> Flashcards — pegadinhas recorrentes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          onClick={() => setFlipped(f => !f)}
          className={cn(
            "min-h-[140px] rounded-xl border flex items-center justify-center text-center p-5 cursor-pointer select-none transition-colors",
            flipped ? "bg-secondary text-secondary-foreground" : "bg-muted"
          )}
        >
          <p className="text-sm font-semibold leading-relaxed">{flipped ? card.b : card.f}</p>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{idx + 1} / {FLASHCARDS.length}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={prev}>‹ Anterior</Button>
            <Button variant="outline" size="sm" onClick={next}>Próximo ›</Button>
          </div>
        </div>
        <p className="text-[11px] text-muted-foreground text-center">Clique no cartão pra virar.</p>
      </CardContent>
    </Card>
  );
}

function ChecklistCard() {
  const STORAGE_KEY = 'norte_study_checklist';
  const [state, setState] = React.useState<Record<number, boolean>>({});

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setState(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  const toggle = (i: number) => {
    setState(prev => {
      const next = { ...prev, [i]: !prev[i] };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  const done = Object.values(state).filter(Boolean).length;
  const pct = Math.round((done / CHECKLIST_ITEMS.length) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center gap-2"><ListChecks className="h-5 w-5 text-secondary" /> Checklist de revisão pré-prova</span>
          <Badge variant="outline">{pct}%</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
          <div className="h-full bg-secondary transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="space-y-2">
          {CHECKLIST_ITEMS.map((item, i) => (
            <label key={i} className="flex items-center gap-2.5 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={!!state[i]}
                onChange={() => toggle(i)}
                className="h-4 w-4 accent-secondary"
              />
              <span className={cn(state[i] && "line-through text-muted-foreground")}>{item}</span>
            </label>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground mt-3">Fica salvo neste navegador entre visitas.</p>
      </CardContent>
    </Card>
  );
}
