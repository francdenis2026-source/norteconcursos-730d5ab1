# Auditoria de permissões RPC — 30/10/2026

O Security Advisor do projeto Supabase aponta 37 funções SECURITY DEFINER invocáveis pelo papel anon. A revisão específica identifica `admin_student_details`, `admin_student_progress`, `admin_student_time`, `admin_students_access` e `admin_students_online`.

As definições de `admin_student_details`, `admin_student_progress` e `admin_students_access` no repositório incluem verificações internas de administrador. Isto reduz o risco de exposição, mas não elimina a necessidade de permissões explícitas e de testes.

## Próximas verificações

1. Conferir a definição efetivamente implantada de cada função, inclusive suas sobrecargas.
2. Confirmar os grants atuais dos papéis PUBLIC, anon e authenticated.
3. Avaliar a remoção de EXECUTE anônimo apenas das funções administrativas, preservando chamadas legítimas.
4. Testar invocação como anon, aluno comum e administrador; não retornar dados pessoais sem autorização.
5. Executar novamente o Security Advisor depois das alterações, sem modificar funções públicas necessárias para visitantes.

Nenhuma mudança de permissão foi aplicada neste documento.
