import type { Contest } from "@/types";

export function contestDisplay(
  contest: Pick<Contest, "name" | "agency" | "role" | "career" | "educationLevel">,
) {
  const name = contest.name.trim();
  const agency = contest.agency.trim();
  const role = contest.role.trim() || name || agency || "Cargo não informado";
  const context = [agency || name, agency && name && agency !== name ? name : ""]
    .filter(Boolean)
    .join(" · ");
  return {
    context: context || "Concurso não informado",
    role,
    career: contest.career || "Carreira não informada",
    education: contest.educationLevel || "Escolaridade não informada",
  };
}
