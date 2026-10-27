-- Material faltante: Marco Civil da Internet (Lei 12.965/2014).
-- Entra em revisão para conferência editorial antes da publicação ao aluno.
begin;

alter table public.study_materials
  add column if not exists flashcards jsonb not null default '[]'::jsonb,
  add column if not exists quiz jsonb not null default '[]'::jsonb;

insert into public.study_materials
  (slug, discipline, topic_label, sort_order, title, summary, body_md,
   contest_name, syllabus_topic_order, source_note, legal_basis, flashcards, quiz)
values
('legislacao-marco-civil-internet-2026', 'Direito', 'Marco Civil da Internet', 220,
 'Marco Civil da Internet — Lei nº 12.965/2014',
 'Princípios, direitos dos usuários, neutralidade, guarda de registros e responsabilidade dos provedores, com atualização regulamentar de 2026.',
$md$
## Visão geral

A **Lei nº 12.965/2014** estabelece princípios, garantias, direitos e deveres para o uso da Internet no Brasil. Para prova, organize o estudo em quatro blocos: fundamentos e direitos do usuário; neutralidade de rede; guarda de registros e proteção de dados; responsabilidade civil dos provedores.

## 1. Fundamentos e direitos

- O acesso à Internet é **essencial ao exercício da cidadania** (art. 7º).
- O usuário tem direito à inviolabilidade da intimidade e da vida privada, ao sigilo do fluxo das comunicações e ao sigilo das comunicações privadas armazenadas, salvo ordem judicial.
- O contrato de prestação de conexão deve trazer informações claras sobre proteção de registros, manutenção de registros e gerenciamento de tráfego.
- A retirada de conteúdo que viole a intimidade, com divulgação de nudez ou ato sexual de caráter privado, pode ser exigida diretamente ao provedor após notificação da vítima (art. 21).

> **Cai em prova:** a conexão à Internet e a aplicação de Internet são conceitos diferentes. O provedor de conexão apenas viabiliza o acesso; o provedor de aplicações oferece funcionalidades acessíveis pela Internet.

## 2. Neutralidade de rede (art. 9º)

O responsável pela transmissão, comutação ou roteamento deve tratar de forma isonômica quaisquer pacotes de dados, sem distinção por conteúdo, origem, destino, serviço, terminal ou aplicação. A discriminação ou degradação só pode decorrer de requisitos técnicos indispensáveis à prestação adequada dos serviços e aplicações ou da priorização de serviços de emergência, conforme regulamentação.

## 3. Registros e proteção

- O provedor de conexão deve manter **registros de conexão** sob sigilo por 1 ano.
- O provedor de aplicações constituído como pessoa jurídica e que atue de forma organizada, profissionalmente e com fins econômicos deve manter **registros de acesso a aplicações** por 6 meses.
- A autoridade policial, administrativa ou o Ministério Público pode requerer cautelarmente a guarda dos registros, mas deve requerer autorização judicial para acesso no prazo legal.
- A disponibilização dos registros depende, em regra, de ordem judicial e de indicação dos fundamentos, período e finalidade do pedido.

## 4. Responsabilidade civil dos provedores

A regra do art. 19 é que o provedor de aplicações somente pode ser responsabilizado civilmente por danos decorrentes de conteúdo gerado por terceiros se, após ordem judicial específica, não tornar indisponível o conteúdo indicado. A ordem deve identificar claramente o material apontado como ilícito, sob pena de nulidade.

A exceção mais cobrada é o art. 21: para divulgação não autorizada de cenas de nudez ou de ato sexual de caráter privado, a responsabilização pode ocorrer após notificação da vítima ou de seu representante, se o provedor não retirar o conteúdo diligentemente.

## 5. Atualização regulamentar

O **Decreto nº 12.975/2026**, publicado no Planalto, atualizou a regulamentação do Marco Civil e atribuiu à ANPD competências de regulação, fiscalização e apuração de infrações relacionadas aos direitos dos usuários e aos deveres dos provedores de aplicações. Ele acrescentou deveres de cuidado, canais permanentes de denúncia, transparência e resposta a conteúdos criminosos, com responsabilização por falha sistêmica. A existência isolada de conteúdo ilícito não caracteriza, por si só, falha sistêmica.

O **Decreto nº 12.976/2026** trata especificamente da proteção de mulheres no ambiente digital, incluindo violência digital e conteúdo íntimo gerado ou modificado por inteligência artificial. A ANPD informa prazo de até duas horas para remoção de conteúdo íntimo divulgado sem consentimento, conforme as condições do decreto. Em questões atuais, confira a redação dos dois decretos e a regulamentação complementar antes de responder.

## Checklist de revisão

1. Art. 7º: direitos do usuário e essencialidade da Internet.
2. Art. 9º: neutralidade e exceções regulamentares.
3. Arts. 10 a 12: guarda, sigilo, proteção e sanções.
4. Arts. 15 e 16: guarda de registros de acesso a aplicações.
5. Arts. 19 e 21: regra e exceção de responsabilidade por conteúdo de terceiros.
6. Decreto nº 12.975/2026: regulamentação atualizada e competências da ANPD.
$md$,
 'Polícia Federal — Direito Digital', 220,
 'Revisado em 27/10/2026 contra a Lei nº 12.965/2014 e os Decretos nº 12.975/2026 e nº 12.976/2026 no Planalto, além da página institucional e FAQ da ANPD. Aguardando validação editorial final e publicação administrativa.',
 '[{"title":"Lei nº 12.965/2014 — Planalto","url":"https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm"},{"title":"Decreto nº 12.975/2026 — Planalto","url":"https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/decreto/d12975.htm"},{"title":"Decreto nº 12.976/2026 — Planalto","url":"https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/decreto/d12976.htm"},{"title":"Marco Civil da Internet — ANPD","url":"https://www.gov.br/anpd/pt-br/assuntos/marco-civil-da-internet"}]'::jsonb,
 '[{"f":"Qual é a regra do art. 19 para a responsabilidade do provedor de aplicações?","b":"Responsabilidade civil somente após ordem judicial específica não cumprida."},{"f":"Por quanto tempo o provedor de conexão guarda registros de conexão?","b":"Um ano, sob sigilo."},{"f":"Qual é a exceção do art. 21?","b":"Nudez ou ato sexual privado divulgado sem autorização, mediante notificação da vítima."},{"f":"Quais são as exceções à neutralidade de rede?","b":"Requisitos técnicos indispensáveis e priorização de serviços de emergência, conforme regulamentação."}]'::jsonb,
 '[{"q":"O provedor de aplicações responde automaticamente por todo conteúdo publicado por terceiros.","a":false,"why":"A regra do art. 19 exige ordem judicial específica não cumprida."},{"q":"O provedor de conexão deve manter registros de conexão por um ano.","a":true,"why":"É o prazo do art. 13."},{"q":"A retirada de nudez privada não autorizada depende sempre de ordem judicial.","a":false,"why":"O art. 21 admite notificação da vítima ou representante."},{"q":"A neutralidade permite discriminar pacotes por preferência comercial sem justificativa técnica.","a":false,"why":"O art. 9º exige tratamento isonômico e limita as exceções."}]'::jsonb)
on conflict (slug) do update set
  title = excluded.title, summary = excluded.summary, body_md = excluded.body_md,
  source_note = excluded.source_note, legal_basis = excluded.legal_basis,
  flashcards = excluded.flashcards, quiz = excluded.quiz,
  updated_at = now()
where public.study_materials.content_status = 'under_review';

commit;
