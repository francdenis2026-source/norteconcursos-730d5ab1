# Configuração das notificações push — Norte Concursos

A base de código, a tabela e a Edge Function já foram criadas. Para habilitar o envio real, configure os segredos fora do Git.

## Supabase

Projeto: `gkwphadbveiyjcwiiizw`

Em **Project Settings → Edge Functions → Secrets**, adicione:

- `VAPID_PRIVATE_KEY`: chave privada VAPID gerada especificamente para o Norte Concursos (não colocar no Git).
- `VAPID_SUBJECT`: `mailto:suporte@norteconcursos.xyz`
- `PUSH_RELEASE_WEBHOOK_SECRET`: segredo aleatório compartilhado com o GitHub Actions.

A chave pública VAPID já está no frontend e na Edge Function. Nunca publique a chave privada.

## GitHub Actions

No repositório oficial, abra **Settings → Secrets and variables → Actions → New repository secret** e crie:

- Name: `PUSH_RELEASE_WEBHOOK_SECRET`
- Value: exatamente o mesmo valor configurado no Supabase.

O workflow `.github/workflows/push-release-notification.yml` dispara depois que o workflow CI da branch main termina com sucesso. Se o segredo não estiver configurado, ele registra o aviso e não envia push.

## Uso

- O aluno ativa notificações em **Meu perfil → Notificações**.
- Cada dispositivo/browser tem sua própria autorização.
- Atualizações e comunicados importantes podem ser ativados separadamente.
- Administradores enviam comunicados em **Administração → Comunicados**.
- No iPhone/iPad, o usuário precisa adicionar o site à Tela de Início e abrir o app instalado antes de pedir permissão.
- O envio de notificações exige consentimento explícito do navegador.

## Validação antes de anunciar como concluído

1. Configurar os três segredos no Supabase.
2. Configurar o segredo no GitHub Actions.
3. Ativar push em Android/Chrome e desktop.
4. No iOS, instalar o PWA e autorizar notificações.
5. Enviar um comunicado de teste para uma conta de teste.
6. Fazer um commit na main, aguardar CI verde e confirmar o push automático.
7. Conferir logs da Edge Function e remover inscrições expiradas (404/410).
