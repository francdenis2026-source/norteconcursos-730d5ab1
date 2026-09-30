import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { readImport, chunks } from "./import-drive-review.mjs";

function fixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "drive-review-"));
  fs.mkdirSync(path.join(dir, "textos-extraidos"));
  const text = "Questão\r\nTexto de origem.";
  const doc = {
    id: "source-1",
    text_sha256: crypto.createHash("sha256").update(text.replace(/\r/g, "")).digest("hex"),
  };
  const row = {
    id: "a".repeat(64),
    source_drive_id: doc.id,
    source_item_number: 1,
    question_text_candidate: "Texto de origem.",
    publishable: false,
    content_status: "under_review",
  };
  fs.writeFileSync(path.join(dir, "documentos.json"), JSON.stringify([doc]));
  fs.writeFileSync(path.join(dir, "textos-extraidos", doc.id + ".json"), JSON.stringify({ text }));
  const save = (rows) =>
    fs.writeFileSync(
      path.join(dir, "candidatos.jsonl"),
      rows.map((r) => JSON.stringify(r)).join("\n"),
    );
  save([row]);
  return { dir, row, save };
}

test("preserva fonte original e aceita checksum normalizado das quebras de linha", () => {
  const f = fixture();
  const data = readImport(f.dir);
  assert.equal(data.documents[0].raw_text, "Questão\r\nTexto de origem.");
  assert.equal(data.candidates[0].payload.publishable, false);
});
test("recusa publicação, IDs repetidos e fonte ausente antes do acesso ao banco", () => {
  const f = fixture();
  f.save([{ ...f.row, publishable: true }]);
  assert.throws(() => readImport(f.dir), /não permitido/);
  f.save([f.row, f.row]);
  assert.throws(() => readImport(f.dir), /repetido/);
  f.save([{ ...f.row, source_drive_id: "other" }]);
  assert.throws(() => readImport(f.dir), /sem fonte/);
});
test("recusa fonte alterada e status ativo", () => {
  const f = fixture();
  f.save([{ ...f.row, content_status: "active" }]);
  assert.throws(() => readImport(f.dir), /não permitido/);
  f.save([f.row]);
  fs.writeFileSync(
    path.join(f.dir, "textos-extraidos/source-1.json"),
    JSON.stringify({ text: "Alterado" }),
  );
  assert.throws(() => readImport(f.dir), /alterado/);
});
test("fracionamento preserva ordem e todos os registros incluindo texto grande", () => {
  const rows = [
    { id: 1, text: "ç".repeat(100) },
    { id: 2, text: "x".repeat(1000) },
    { id: 3, text: "fim" },
  ];
  const result = [...chunks(rows, 300)];
  assert.deepEqual(result.flat(), rows);
  assert.equal(result[1].length, 1);
});
