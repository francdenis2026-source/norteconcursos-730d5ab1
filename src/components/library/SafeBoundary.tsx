import { Component, type ReactNode } from "react";

/** Recursos de apoio (dicas, testes rápidos) nunca devem derrubar a leitura: em caso de erro, mostram o fallback. */
export class SafeBoundary extends Component<{ fallback?: ReactNode; children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  override componentDidCatch(error: unknown) { console.error("Recurso de apoio falhou", error); }
  override render() { return this.state.failed ? (this.props.fallback ?? null) : this.props.children; }
}
