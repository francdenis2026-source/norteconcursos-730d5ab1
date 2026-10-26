# Ampliação didática — Informática (lote preparado)

**Estado:** conteúdo preparado para revisão e aplicação futura. **Não aplicado no Supabase por bloqueio da operação de gravação.**

Este arquivo é exclusivamente documental: não é migração, não é importação automática, não altera páginas, rotas, componentes ou estrutura de banco. Ao aplicar futuramente, anexar o conteúdo a `study_materials.body_md` pelo `slug` correspondente, com guarda de idempotência pelo título da seção, sem modificar `quiz`, `flashcards`, `content_status` ou histórico. Verificar antes e depois.

## informatica-backup-incremental-diferencial

### Oficina aplicada — qual cópia restaura a quinta-feira?

**Linha do tempo:** domingo, backup completo; segunda, alteração A; terça, alteração B; quarta, alteração C; quinta, alteração D. Após o backup de quinta, ocorre uma falha.

| Método diário | Cópias necessárias para restaurar o estado de quinta |
|---|---|
| Incremental | Completo de domingo + incrementais de segunda, terça, quarta e quinta |
| Diferencial | Completo de domingo + diferencial de quinta |

No modelo convencional, o incremental de quinta contém mudanças desde a cópia de quarta; o diferencial de quinta acumula A, B, C e D desde domingo.

**Questão comentada:** “Backup incremental dispensa a cópia completa anterior.” **Errado**, nesse cenário. A cadeia depende de uma base recuperável.

**Prática:** mantenha cópias separadas, proteja contra alteração indevida e teste a recuperação. RAID e sincronização não substituem automaticamente backups verificáveis.

## informatica-email-smtp-pop-imap

### Oficina aplicada — escolha o protocolo pelo trabalho

Uma servidora usa a mesma caixa no computador e no celular e quer pastas e estados de leitura sincronizados. **IMAP** é a escolha típica para sincronização no servidor. Para **enviar** mensagens, o cliente utiliza submissão baseada em **SMTP**.

| Situação | Conceito |
|---|---|
| Enviar e-mail pelo cliente | SMTP |
| Sincronizar pastas entre dispositivos | IMAP |
| Recuperar mensagens para o cliente | POP3 |
| Destinatário visível em cópia | Cc |
| Destinatário oculto dos demais | Cco |

**Questão comentada:** “POP3 necessariamente apaga a mensagem do servidor após o download.” **Errado.** Depende da configuração e das operações realizadas.

**Pegadinha:** Cco oculta endereços dos demais participantes, mas não cifra a mensagem. Links e anexos podem ser perigosos mesmo com nome de remetente conhecido.

## informatica-malware-antivirus-firewall

### Oficina aplicada — classifique ameaça e controle

**Cenário A:** conversor de PDF falso instala componente de espionagem. O disfarce sugere **trojan**; a coleta indevida caracteriza **spyware**. Categorias podem se sobrepor.

**Cenário B:** código malicioso se propaga entre computadores explorando uma falha de rede. É comportamento típico de **worm**.

**Cenário C:** arquivos ficam inacessíveis e há exigência de pagamento. É cenário compatível com **ransomware**.

| Controle | Ajuda a | Limite |
|---|---|---|
| Antimalware | Detectar ou bloquear ameaças | Não garante proteção absoluta |
| Firewall | Filtrar tráfego conforme regras | Não analisa necessariamente todo conteúdo malicioso |
| Atualizações | Corrigir vulnerabilidades conhecidas | Não substituem boas práticas |
| Backup testado | Recuperar dados | Não impede o ataque inicial |

**Questão comentada:** “Firewall e antivírus são sinônimos.” **Errado.** Têm funções distintas e complementares.

## informatica-powerpoint-impress-apresentacoes

### Oficina aplicada — organize uma apresentação

Uma candidata prepara cinco slides. Aplica um **tema** para aparência uniforme, usa o **mestre** para elementos recorrentes, cria uma **transição** entre slides 2 e 3 e uma **animação** para fazer o gráfico surgir no slide 3.

| Necessidade | Recurso |
|---|---|
| Padronizar rodapé | Mestre |
| Dispor título e conteúdo | Layout |
| Efeito entre slides | Transição |
| Efeito em objeto do slide | Animação |
| Lembretes do apresentador | Anotações |

**Questão comentada:** “Transição e animação são nomes diferentes para o mesmo efeito.” **Errado.** A primeira atua entre slides; a segunda, em objetos.

**Exportação:** PDF tende a conservar aparência estática, mas não garante reprodução das animações originais.

## informatica-seguranca-cid-controles

### Oficina aplicada — identifique o objetivo violado

Uma plataforma enfrenta três incidentes: (1) aluno lê respostas de outro; (2) nota é alterada indevidamente; (3) sistema fica fora do ar durante um simulado.

| Incidente | Princípio | Controle |
|---|---|---|
| Leitura não autorizada | Confidencialidade | Autorização e proteção de dados |
| Alteração indevida | Integridade | Validação e trilha de auditoria |
| Indisponibilidade | Disponibilidade | Redundância e recuperação |

**Autenticação não é autorização:** reconhecer o aluno não basta para permitir acesso a registros de outros usuários.

**MFA:** senha e código de aplicativo autenticador podem combinar conhecimento e posse, dependendo da implementação. Senha e PIN continuam na categoria conhecimento.

**Questão comentada:** “Hash isolado garante autenticidade mesmo se o atacante puder alterar arquivo e hash de referência.” **Errado.** A referência precisa ser confiável.

## informatica-word-writer-formatos-estilos

### Oficina aplicada — estrutura vale mais que aparência

Uma estudante cria resumo com 12 capítulos. Ao aplicar **estilos de título**, consegue gerar e atualizar um **sumário automático** com mais consistência que digitando páginas manualmente.

| Necessidade | Recurso |
|---|---|
| Manter títulos uniformes | Estilos |
| Lista de capítulos com páginas | Sumário automático |
| Iniciar capítulo na página seguinte | Quebra de página |
| Alterar orientação de parte do documento | Quebra de seção e configuração |
| Distribuir versão estática | Exportar para PDF |

**Questão comentada:** “Aumentar a fonte transforma automaticamente o parágrafo em título estrutural.” **Errado.** Aparência visual não equivale à aplicação de estilo semântico.

**Pegadinha:** DOCX, ODT e PDF são formatos diferentes. Converter pode alterar compatibilidade; PDF não é necessariamente impossível de editar.

---

## Verificação obrigatória antes de publicar

1. Confirmar o texto atual e a ausência da seção para cada `slug`.
2. Aplicar somente a extensão textual, preservando integralmente o conteúdo anterior.
3. Confirmar `content_status='active'`, contagem original de `quiz` e `flashcards`.
4. Conferir a renderização Markdown em desktop e celular.
5. Não executar deploy ou alteração de frontend a partir deste documento.
