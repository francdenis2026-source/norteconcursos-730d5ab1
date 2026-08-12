import { createFileRoute } from "@tanstack/react-router";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Norte Concurso
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Seu estudo na direção certa.
      </p>
      <div className="mt-8 max-w-2xl text-left bg-muted p-6 rounded-lg">
        <p className="text-sm text-foreground">
          O projeto a seguir nao é para conectar ao lovablecloud, criarei meu proprio banco de dados, e enviarei postiormente a edição do projeto: Crie uma plataforma web SaaS completa, profissional, moderna e responsiva para preparação para concursos públicos chamada:
          <br /><br />
          # Norte Concurso
          <br /><br />
          Slogan: “Seu estudo na direção certa.”
          <br /><br />
          A plataforma será inicialmente lançada em Feijó, no interior do Acre, mas deverá ser construída com arquitetura escalável para atender estudantes de todo o Brasil.
        </p>
      </div>
    </div>
  );
}
