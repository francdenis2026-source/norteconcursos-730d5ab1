import { createFileRoute } from "@tanstack/react-router";
import { NorteCube } from "@/components/landing/NorteCube";

export const Route = createFileRoute("/teste-cubo")({
  component: TesteCubo,
  head: () => ({
    meta: [{ title: "Teste do cubo | Norte Concursos" }, { name: "robots", content: "noindex" }],
  }),
});

function TesteCubo() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "#0b0f14",
        color: "#e6e1d2",
      }}
    >
      <section
        style={{
          display: "grid",
          gap: "24px",
          justifyItems: "center",
          textAlign: "center",
          maxWidth: 560,
        }}
      >
        <NorteCube />
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Teste do cubo Norte</h1>
        <p style={{ margin: 0, color: "#b4b9c0" }}>
          Arraste para girar. Duas fatias giram sozinhas a cada poucos segundos. Com “reduzir
          movimento” ativado, o cubo fica parado.
        </p>
      </section>
    </main>
  );
}
