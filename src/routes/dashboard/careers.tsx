import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { CAREERS } from '@/lib/careers';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, FileStack, BookMarked } from 'lucide-react';

export const Route = createFileRoute('/dashboard/careers')({
  component: CareersPage,
});

function CareersPage() {
  const [counts, setCounts] = React.useState<Record<string, { exams: number; questions: number }>>({});

  React.useEffect(() => {
    const load = async () => {
      const [examsRes, questionsRes] = await Promise.all([
        supabase.from('student_exam_documents').select('contest_name'),
        supabase.from('question_bank').select('contest_name'),
      ]);
      const next: Record<string, { exams: number; questions: number }> = {};
      (examsRes.data || []).forEach((r: any) => {
        const c = CAREERS.find(c => r.contest_name?.toLowerCase().includes(c.agency.toLowerCase()) || r.contest_name?.toLowerCase().includes(c.name.toLowerCase()));
        if (c) { next[c.id] = next[c.id] || { exams: 0, questions: 0 }; next[c.id].exams++; }
      });
      (questionsRes.data || []).forEach((r: any) => {
        const c = CAREERS.find(c => r.contest_name?.toLowerCase().includes(c.agency.toLowerCase()) || r.contest_name?.toLowerCase().includes(c.name.toLowerCase()));
        if (c) { next[c.id] = next[c.id] || { exams: 0, questions: 0 }; next[c.id].questions++; }
      });
      setCounts(next);
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Carreiras Policiais</h1>
        <p className="text-muted-foreground">Escolha a carreira para focar seus estudos — dados reais vão se acumulando conforme você envia provas.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CAREERS.map(c => {
          const data = counts[c.id] || { exams: 0, questions: 0 };
          const hasData = data.exams > 0 || data.questions > 0;
          return (
            <Card key={c.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-1.5" style={{ background: c.color }} />
              <CardContent className="pt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center font-black text-white text-sm" style={{ background: c.color }}>
                    {c.name}
                  </div>
                  {hasData ? (
                    <Badge className="bg-emerald-500">Com dados</Badge>
                  ) : (
                    <Badge variant="outline">Sem dados ainda</Badge>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-sm">{c.fullName}</h3>
                  <p className="text-xs text-muted-foreground">{c.agency}</p>
                </div>
                <div className="flex items-center gap-4 pt-2 border-t text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><FileStack className="h-3.5 w-3.5" /> {data.exams} prova{data.exams !== 1 ? 's' : ''}</span>
                  <span className="flex items-center gap-1"><BookMarked className="h-3.5 w-3.5" /> {data.questions} questõe{data.questions !== 1 ? 's' : ''}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-muted/50 border-dashed">
        <CardContent className="pt-5 flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Plataforma multi-carreira: PF, PRF, DEPEN, PC, PP, Bombeiro e PM. Cada carreira acumula provas reais, banco de questões
            com explicação pedagógica e legislação sempre verificada no Planalto — igual ao que já foi feito para Polícia Federal.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
