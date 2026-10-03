// Envia as fotos das provas de Feijó 2017 e 2018 para o bucket 'student-exams' e cria um
// registro por página em student_exam_documents, para aparecerem em "Caderno digitalizado"
// na área do candidato (src/routes/dashboard/student-exams.tsx).
//
// Uso (PowerShell), com as credenciais SÓ nesta sessão do terminal, nunca em arquivo:
//   $env:SUPABASE_URL="https://<projeto>.supabase.co"
//   $env:SUPABASE_SERVICE_ROLE_KEY="<chave de serviço NOVA>"
//   $env:CANDIDATE_CPF="<cpf só com números>"
//   $env:PROVAS_DIR="C:\Users\familia\Desktop\PROVAS FEITAS POR MIM"
//   node scripts/upload-feijo-exam-pages.mjs            # simula (não grava nada)
//   node scripts/upload-feijo-exam-pages.mjs --apply    # envia de verdade
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, CANDIDATE_CPF, PROVAS_DIR } = process.env;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !CANDIDATE_CPF || !PROVAS_DIR)
  throw new Error("Defina SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, CANDIDATE_CPF e PROVAS_DIR.");
const apply = process.argv.includes("--apply");

// Prefixo do nome do arquivo -> número da página do caderno (lido nas fotos).
const EXAMS = [
  {
    year: "2017",
    folder: "CONCURSO PROFESSOR 2017",
    pages: {
      cf9c81cc: 3, e843f048: 4, efb03c3f: 5, "983bd507": 6, "48b3b28f": 7,
      c9004da8: 8, "07ea15e7": 9, db53b26c: 10, "7d534149": 11, be883067: 12,
    },
  },
  {
    year: "2018",
    folder: "CONCURSO PROFESSOR FEIJO 2018",
    pages: {
      "6e085482": 1, "5afdca81": 2, "791ecf44": 3, "1e65bf03": 4, a7261e62: 5, e3cc5258: 6,
      "0e9240ac": 7, c1914d64: 8, "52fe44c3": 9, "8d7c4237": 10, a3471628: 11, f246ed9c: 12,
      fdc250cc: 13, "55b5d5c8": 14, bc756a5f: 15, "6d525871": 16, fdd34cb7: 17,
    },
  },
];

const db = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const { data: profile, error: pErr } = await db
  .from("profiles")
  .select("id")
  .eq("cpf", CANDIDATE_CPF)
  .single();
if (pErr) throw pErr;
const userId = profile.id;

for (const exam of EXAMS) {
  const dir = path.join(PROVAS_DIR, exam.folder);
  const files = fs.readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f));
  for (const file of files) {
    const page = exam.pages[file.slice(0, 8)];
    if (!page) throw new Error(`Arquivo sem página mapeada: ${exam.folder}/${file}`);
    const storagePath = `${userId}/feijo-${exam.year}/pagina-${String(page).padStart(2, "0")}.jpg`;
    const bytes = fs.readFileSync(path.join(dir, file));
    console.log(`${apply ? "ENVIANDO" : "simulando"} ${exam.year} pág ${page} -> ${storagePath} (${bytes.length} B)`);
    if (!apply) continue;
    const up = await db.storage
      .from("student-exams")
      .upload(storagePath, bytes, { contentType: "image/jpeg", upsert: true });
    if (up.error) throw up.error;
    const exists = await db
      .from("student_exam_documents")
      .select("id")
      .eq("user_id", userId)
      .eq("storage_path", storagePath)
      .maybeSingle();
    if (exists.error) throw exists.error;
    if (exists.data) continue;
    const ins = await db.from("student_exam_documents").insert({
      user_id: userId,
      contest_name: "Prefeitura de Feijó",
      contest_year: exam.year,
      exam_board: "FUNDAPE",
      doc_type: "prova_realizada",
      file_name: `Feijo_${exam.year}_pagina_${page}.jpg`,
      storage_path: storagePath,
      file_size_bytes: bytes.length,
    });
    if (ins.error) throw ins.error;
  }
}
console.log(apply ? "Concluído." : "Simulação concluída. Rode com --apply para enviar.");
