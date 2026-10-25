/** Question workspace functional and responsive regression with mocked authentication; no production writes.
 * PLAYWRIGHT_MODULE=/path/to/playwright-core/index.mjs node scripts/qa/questions-workspace.mjs
 * Start the local dev server first (BASE_URL defaults to http://127.0.0.1:3000).
 */
import assert from "node:assert/strict";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.BASE_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const uid = "11111111-1111-4111-8111-111111111111";
const storageKey = "sb-gkwphadbveiyjcwiiizw-auth-token";
const session = (role) => {
  const exp = Math.floor(Date.now() / 1000) + 86400;
  const user = {
    id: uid,
    email: `${role}@example.test`,
    role: "authenticated",
    aud: "authenticated",
    user_metadata: { full_name: "CONTA DE TESTE" },
    app_metadata: { provider: "email" },
    created_at: new Date().toISOString(),
  };
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return {
    access_token: `${encode({ alg: "HS256", typ: "JWT" })}.${encode({ sub: uid, exp, role: "authenticated", session_id: "22222222-2222-4222-8222-222222222222" })}.test`,
    refresh_token: "test-refresh",
    token_type: "bearer",
    expires_in: 86400,
    expires_at: exp,
    user,
  };
};
async function mock(context, role, roleError = false, heldNetwork = false) {
  const calls = { logout: 0, ownership: 0 };
  await context.route("https://gkwphadbveiyjcwiiizw.supabase.co/**", async (route) => {
    const path = new URL(route.request().url()).pathname;
    if (process.env.DEBUG_QA) console.log(route.request().method(), path);
    if (path.includes("/logout")) calls.logout++;
    if (heldNetwork && (path.includes("/logout") || path.endsWith("/study_heartbeat"))) return;
    if (path.includes("/active_user_sessions")) calls.ownership++;
    let status = 200,
      body = [];
    if (path.endsWith("/get_public_question_summary")) body = { registered: 12, available: 8 };
    else if (path.endsWith("/token")) body = session(role);
    else if (path.endsWith("/user")) body = session(role).user;
    else if (path.endsWith("/profiles"))
      body = {
        id: uid,
        full_name: "CONTA DE TESTE",
        onboarding_completed: true,
        subscription_tier: "premium",
        is_activated: true,
        created_at: new Date().toISOString(),
      };
    else if (path.endsWith("/user_roles")) body = [{ role }];
    else if (path.endsWith("/has_role")) {
      status = roleError ? 503 : 200;
      body = roleError ? { message: "temporarily unavailable" } : role === "admin";
    } else if (path.endsWith("/verify_account_session")) body = true;
    else if (path.endsWith("/server_now")) body = new Date().toISOString();
    else if (path.endsWith("/active_user_sessions")) body = { session_key: "another-tab-old-key" };
    await route.fulfill({
      status,
      contentType: "application/json",
      body: JSON.stringify(body),
      headers: { "access-control-allow-origin": "*" },
    });
  });
  return calls;
}

async function contextFor(width, height, { seed = true, coarse = false, noNative = true } = {}) {
  const context = await browser.newContext({
    viewport: { width, height },
    ...(coarse ? { isMobile: true, hasTouch: true } : {}),
  });
  await mock(context, "user");
  await context.addInitScript(
    ({ key, value, seed, noNative }) => {
      localStorage.setItem("theme", "dark");
      localStorage.setItem("norte_sidebar_collapsed", "0");
      if (noNative)
        Object.defineProperty(document, "fullscreenEnabled", {
          configurable: true,
          get: () => false,
        });
      if (seed && !sessionStorage.getItem("qa-seeded")) {
        localStorage.setItem(key, JSON.stringify(value));
        sessionStorage.setItem("qa-seeded", "1");
      }
    },
    { key: storageKey, value: session("user"), seed, noNative },
  );
  return context;
}

const questions = Array.from({ length: 8 }, (_, i) => ({
  id: "10000000-0000-4000-8000-" + String(i + 1).padStart(12, "0"),
  contest_name: "Polícia Civil do Acre",
  exam_year: 2025,
  career_name: "Agente",
  exam_board: "CEBRASPE",
  item_number: i + 1,
  subject: i < 4 ? "Matemática" : "Informática",
  tested_topic: i < 4 ? "Aritmética" : "Segurança da informação",
  question_text:
    i < 4
      ? `O resultado de ${i + 1} + 1 é ${i + 2}.`
      : "A autenticação em dois fatores acrescenta uma verificação à senha.",
  official_answer: "C",
  review_note: "A afirmação está correta. Confira o conceito e compare com o enunciado.",
  legal_basis: [],
  content_status: "active",
  difficulty: "facil",
  legal_review_required: false,
  context_review_required: false,
}));
async function fixture(width, height, theme = "dark", state = "populated") {
  let activeState = state;
  const context = await contextFor(width, height);
  const answers = new Map(),
    history =
      state === "empty"
        ? []
        : questions.slice(0, 2).map((q, i) => ({
            question_table: "official_exam_questions",
            question_id: q.id,
            question_source: "official",
            selected_answer: i ? "C" : "E",
            is_correct: !!i,
            answered_at: new Date().toISOString(),
          }));
  await context.addInitScript((theme) => localStorage.setItem("theme", theme), theme);
  await context.route("https://gkwphadbveiyjcwiiizw.supabase.co/**", async (route) => {
    const req = route.request(),
      url = new URL(req.url()),
      table = url.pathname.split("/").pop();
    let body;
    if (table === "profiles" && state === "free")
      body = {
        id: uid,
        full_name: "CONTA DE TESTE",
        onboarding_completed: true,
        subscription_tier: "free",
        is_activated: true,
        created_at: "2020-01-01T00:00:00Z",
      };
    else if (table === "question_training_responses" && req.method() === "HEAD" && state === "free")
      return route.fulfill({
        status: 200,
        headers: { "content-range": "0-998/999", "access-control-expose-headers": "content-range" },
      });
    else if (table === "official_exam_questions") {
      if (activeState === "error")
        return route.fulfill({
          status: 503,
          contentType: "application/json",
          body: JSON.stringify({ message: "fixture unavailable" }),
        });
      body = state === "empty" ? [] : questions;
    } else if (table === "get_question_first_answers") body = history;
    else if (table === "question_training_responses") {
      if (req.method() === "POST") {
        const row = req.postDataJSON();
        answers.set(row.id, row);
        history.push({ ...row, answered_at: new Date().toISOString() });
        body = [];
      } else if (url.searchParams.get("id"))
        body = answers.get(url.searchParams.get("id").slice(3));
      else if (url.searchParams.get("select") === "response_seconds")
        body = { response_seconds: 3 };
      else body = [];
    } else if (table === "flashcards")
      body = [
        {
          id: "card-1",
          user_id: uid,
          front: "Quanto é dois mais dois?",
          back: "Quatro.",
          subject: "Matemática",
          topic: "Aritmética",
          state: "new",
          due_at: new Date(Date.now() - 60000).toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          reps: 0,
          lapses: 0,
          interval_days: 0,
          ease_factor: 2.5,
        },
      ];
    else return route.fallback();
    if (Array.isArray(body) && Number(url.searchParams.get("offset") || 0) > 0) body = [];
    await route.fulfill({ contentType: "application/json", body: JSON.stringify(body ?? null) });
  });
  return { context, answers, setState: (value) => (activeState = value) };
}
async function checkCatalog() {
  for (const theme of ["light", "dark"])
    for (const [width, height] of [
      [320, 700],
      [390, 844],
      [768, 1024],
      [1440, 1000],
    ]) {
      const { context } = await fixture(width, height, theme);
      const page = await context.newPage();
      await page.goto(`${base}/dashboard/question-bank`);
      await page.locator(".catalog-metric").first().waitFor();
      assert.equal(await page.locator(".catalog-metric").count(), 4);
      for (const metric of await page.locator(".catalog-metric, .platform-question-counts__grid button").all()) {
        await metric.click();
        await page.getByRole("dialog").waitFor();
        assert(await page.getByRole("dialog").getByRole("heading").first().isVisible());
        assert.equal(
          await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
          false,
        );
        assert.equal(
          await page.locator(".catalog-details").evaluate((el) => el.scrollWidth > el.clientWidth),
          false,
        );
        const bounds = await page.getByRole("dialog").boundingBox();
        assert(bounds.y >= 0 && bounds.y + bounds.height <= height + 1);
        await page.getByRole("dialog").getByRole("button", { name: "Fechar", exact: true }).click();
        await page.getByRole("dialog").waitFor({ state: "hidden" });
        assert(await metric.evaluate((el) => el === document.activeElement));
      }
      await page.getByRole("button", { name: /Bancas: 1/ }).click();
      await page.getByRole("textbox", { name: "Buscar nos detalhes" }).fill("cesp");
      assert.equal(await page.locator(".catalog-details__row").count(), 0);
      await page.getByRole("button", { name: "Limpar busca" }).click();
      assert.equal(await page.locator(".catalog-details__row").count(), 1);
      await page.getByRole("button", { name: "Fechar", exact: true }).click();
      await page.getByRole("textbox", { name: "Buscar no acervo" }).fill("Informática");
      await page.getByRole("button", { name: /Questões da seleção: 4/ }).waitFor();
      await page.getByRole("button", { name: /Disciplinas: 1/ }).click();
      const row = page.locator(".catalog-details__row");
      assert.equal(await row.count(), 1);
      assert((await row.innerText()).includes("Informática"));
      const href = await row.getAttribute("href");
      assert(href.includes("catalogQuery=Inform") && href.includes("subject=Inform"));
      if (width === 390) await page.screenshot({ path: `/tmp/catalog-${theme}.png` });
      await row.click();
      await page.locator(".trainer-workbench").waitFor();
      assert.equal(new URL(page.url()).searchParams.get("subject"), "Informática");
      if (width === 390 && theme === "light") {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(base + "/");
        await page.locator(".question-count-main strong").waitFor();
        await page.waitForFunction(() => document.querySelector(".question-count-main strong")?.textContent === "8");
        assert.equal(await page.locator(".question-count-registered strong").innerText(), "12");
        await page.goto(base + "/dashboard");
        await page.getByRole("link", { name: /Total cadastrado: 12/ }).waitFor();
        await page.getByRole("link", { name: /Disponíveis para treinar: 8/ }).waitFor();
        assert.equal(await page.locator(".platform-question-counts").count(), 1);
        console.log("PASS shared counts: homepage, student home and catalog");
      }
      await context.close();
      console.log("PASS", theme, width);
    }
  const { context } = await fixture(390, 844, "dark");
  const extra = (suffix, overrides) => ({ ...questions[0], id: `20000000-0000-4000-8000-${String(suffix).padStart(12, "0")}`, ...overrides });
  await context.route("https://gkwphadbveiyjcwiiizw.supabase.co/rest/v1/**", async (route) => {
    const url = new URL(route.request().url());
    const table = url.pathname.split("/").pop();
    let rows;
    if (table === "get_public_question_summary") return route.fulfill({ contentType: "application/json", body: JSON.stringify({ registered: 12, available: 11 }) });
    if (table === "official_exam_questions") rows = [...questions,
      extra(1, { contest_name: "ENEM", exam_board: "INEP" }),
      extra(2, { contest_name: "ENEM", exam_board: "INEP" }),
      extra(3, { context_review_required: true })];
    else if (table === "curated_question_catalog") rows = [extra(4, { contest_year: 2025 })];
    else if (table === "question_bank") rows = [extra(5, { contest_year: 2025 })];
    else return route.fallback();
    await route.fulfill({ contentType: "application/json", body: JSON.stringify(Number(url.searchParams.get("offset") || 0) > 0 ? [] : rows) });
  });
  const page = await context.newPage();
  await page.goto(base + "/dashboard/question-bank");
  await page.getByRole("button", { name: /Total cadastrado: 12/ }).waitFor();
  await page.getByRole("button", { name: /Questões da seleção: 10/ }).waitFor();
  await page.getByRole("button", { name: /Total cadastrado: 12/ }).click();
  assert.match(await page.locator(".catalog-details__areas").innerText(), /9 questões/);
  assert.match(await page.locator(".catalog-details__areas").innerText(), /2 questões/);
  const publicLinks = await page.locator(".catalog-details__areas a").evaluateAll(links => links.map(a => a.href));
  assert.equal(publicLinks.length, 3);
  assert(publicLinks.every(href => /source=(official|curated)/.test(href)));
  await page.getByRole("button", { name: "Fechar", exact: true }).click();
  await page.getByRole("button", { name: "ENEM", exact: true }).click();
  await page.getByRole("button", { name: /Questões da seleção: 2/ }).waitFor();
  await page.getByRole("button", { name: /Total cadastrado: 12/ }).waitFor();
  await page.getByRole("button", { name: /Disponíveis para treinar: 11/ }).waitFor();
  await context.close();
  console.log("PASS catalog: mixed collections, private exclusion, pending content, scoped links");

}
async function checkCountError() {
  const { context } = await fixture(390, 844, "light");
  let recovered = false;
  await context.route("**/rpc/get_public_question_summary", route => route.fulfill({
    status: recovered ? 200 : 503, contentType: "application/json",
    body: JSON.stringify(recovered ? { registered: 12, available: 8 } : { message: "temporarily unavailable" }),
  }));
  const page = await context.newPage();
  await page.goto(base + "/dashboard/question-bank");
  await page.getByText(/Não foi possível atualizar os totais/).waitFor();
  assert.equal(await page.locator('[data-count-kind="registered"] strong').innerText(), "—");
  assert.equal(await page.locator('[data-count-kind="available"] strong').innerText(), "—");
  await page.getByRole("textbox", { name: "Buscar no acervo" }).fill("Informática");
  recovered = true;
  await page.getByRole("button", { name: "Atualizar totais de questões" }).click();
  await page.getByRole("button", { name: /Total cadastrado: 12/ }).waitFor();
  await page.getByRole("button", { name: /Disponíveis para treinar: 8/ }).waitFor();
  await page.getByRole("button", { name: /Questões da seleção: 4/ }).waitFor();
  await context.close();
  console.log("PASS summary failure: no fabricated zero, retry recovers shared totals and preserves filters");
}

async function checkWorkspace() {
  for (const theme of ["light", "dark"])
    for (const [width, height] of [
      [320, 700],
      [390, 844],
      [768, 1024],
      [1440, 1000],
    ]) {
      const { context, answers } = await fixture(width, height, theme);
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(base + "/dashboard/question-trainer");
      await page.waitForFunction(() => document.documentElement.dataset.norteBoot === "ready");
      const start = page.getByRole("button", { name: "Começar sessão", exact: true });
      await start.waitFor();
      await page.waitForFunction(
        () =>
          !Array.from(document.querySelectorAll("button")).find((b) =>
            b.textContent.includes("Começar sessão"),
          )?.disabled,
      );
      assert.equal(await page.locator(".trainer-practice-mode").count(), 4);
      await page.screenshot({ path: "/tmp/questions-setup-" + theme + "-" + width + ".png" });
      await page.getByRole("radio", { name: /Revisar meus erros/ }).check();
      assert.match(await page.locator(".trainer-stock").innerText(), /1/);
      await page.getByRole("radio", { name: /Questões novas/ }).check();
      await page.getByRole("combobox", { name: "Disciplina", exact: true }).click();
      await page
        .getByRole("dialog")
        .getByRole("option", { name: /Matemática/ })
        .click();
      await page.getByRole("combobox", { name: "Ordem das questões", exact: true }).click();
      await page
        .getByRole("dialog")
        .getByRole("option", { name: /Ordem do acervo/ })
        .click();
      assert.match(await page.locator(".trainer-start-bar").innerText(), /2 questões nesta sessão/);
      await start.click();
      await page.locator("#trainer-question").waitFor();
      assert.equal(
        await page.getByRole("button", { name: "Encerrar treino", exact: true }).count(),
        1,
      );
      assert.equal(await page.locator(".question-study-companion").count(), 0);
      await page.getByRole("button", { name: "Confirmar resposta", exact: false }).waitFor();
      assert.ok(
        await page.getByRole("button", { name: "Confirmar resposta", exact: false }).isDisabled(),
      );
      const mapVisible = await page.locator(".trainer-session-overview").isVisible();
      assert.equal(
        await page.getByRole("button", { name: "Navegar questões", exact: true }).isVisible(),
        !mapVisible,
      );
      const map = mapVisible ? page.locator(".trainer-session-overview") : null;
      if (map) assert.equal(await map.getByText("Puladas", { exact: true }).count(), 1);
      else {
        await page.getByRole("button", { name: "Navegar questões", exact: true }).click();
        assert.equal(
          await page.getByRole("dialog").getByText("Puladas", { exact: true }).count(),
          1,
        );
        assert.ok(
          await page
            .getByRole("dialog")
            .getByRole("button", { name: "Ir para questão 2", exact: true })
            .isDisabled(),
        );
        await page.keyboard.press("Escape");
      }
      await page.getByRole("button", { name: /Certo/ }).click();
      await page.getByRole("button", { name: "Confirmar resposta", exact: false }).click();
      await page.getByRole("button", { name: "Próxima questão", exact: true }).waitFor();
      assert.equal(answers.size, 1);
      assert.equal([...answers.values()][0].is_correct, true);
      await page.getByRole("button", { name: "Comentário e materiais", exact: true }).click();
      await page
        .getByRole("dialog")
        .getByRole("button", { name: "Voltar à questão", exact: true })
        .click();
      await page.screenshot({ path: "/tmp/questions-answer-" + theme + "-" + width + ".png" });
      await page.reload();
      await page.locator("#trainer-question").waitFor();
      await page.getByRole("button", { name: "Próxima questão", exact: true }).click();
      await page.getByRole("button", { name: "Pular questão", exact: true }).click();
      await page.locator("#trainer-result-title").waitFor();
      assert.match(await page.locator(".trainer-result-score").innerText(), /100%/);
      assert.equal(answers.size, 1, "skip never records an answer");
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await page.screenshot({ path: "/tmp/questions-results-" + theme + "-" + width + ".png" });
      assert.deepEqual(errors, []);
      console.log(
        "PASS",
        theme,
        width,
        "modes, filters, map, answer, learning, resume, skip, results",
      );
      await context.close();
    }
  for (const path of ["question-bank", "errors", "notebooks", "flashcards"]) {
    const { context } = await fixture(390, 844, "light");
    const page = await context.newPage();
    await page.goto(base + "/dashboard/" + path);
    await page.locator(".question-workspace").waitFor();
    await page.waitForFunction(() => document.documentElement.dataset.norteBoot === "ready");
    if (path === "question-bank") {
      await page.getByRole("textbox", { name: "Buscar no acervo", exact: true }).fill("Matemática");
      await page.getByRole("link", { name: "Treinar Matemática", exact: true }).waitFor();
      assert.equal(await page.locator(".question-workspace__metric").count(), 4);
    }
    if (path === "errors") {
      await page.getByRole("button", { name: "Revisão sequencial", exact: true }).click();
      await page.getByText("Dominado (sair da revisão)", { exact: true }).waitFor();
    }
    if (path === "notebooks") {
      await page.getByRole("button", { name: "Criar caderno", exact: true }).click();
      await page
        .getByRole("textbox", { name: "Nome da coleção", exact: true })
        .fill("Minha revisão");
      await page.getByRole("button", { name: "Salvar coleção", exact: true }).click();
      await page.getByText("Minha revisão", { exact: true }).waitFor();
      await page.getByRole("button", { name: "Editar coleção", exact: true }).click();
      await page
        .getByRole("textbox", { name: "Nome da coleção", exact: true })
        .fill("Revisão final");
      await page.getByRole("button", { name: "Salvar coleção", exact: true }).click();
      await page.getByText("Revisão final", { exact: true }).waitFor();
    }
    if (path === "flashcards") {
      await page.getByRole("button", { name: "Mostrar resposta", exact: true }).click();
      await page.getByText("Quatro.", { exact: true }).waitFor();
    }
    await page.screenshot({ path: "/tmp/questions-" + path + ".png" });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    console.log("PASS related", path);
    await context.close();
  }
  for (const state of ["empty", "error"]) {
    const { context, setState } = await fixture(390, 844, "dark", state);
    const page = await context.newPage();
    await page.goto(base + "/dashboard/question-trainer");
    if (state === "empty") {
      await page.getByRole("button", { name: "Começar sessão", exact: true }).waitFor();
      assert.ok(
        await page.getByRole("button", { name: "Começar sessão", exact: true }).isDisabled(),
      );
    } else {
      await page.getByRole("button", { name: "Tentar novamente", exact: true }).waitFor();
      setState("populated");
      await page.getByRole("button", { name: "Tentar novamente", exact: true }).click();
      await page.getByRole("button", { name: "Começar sessão", exact: true }).waitFor();
    }
    console.log("PASS state", state);
    await context.close();
  }

  const { context } = await fixture(390, 844, "dark", "free");
  const page = await context.newPage();
  await page.goto(base + "/dashboard/question-trainer");
  await page.getByText(/^0 novas respostas disponíveis hoje/).waitFor();
  assert.ok(await page.getByRole("button", { name: "Começar sessão", exact: true }).isDisabled());
  await page.getByRole("radio", { name: /Todas da seleção/ }).check();
  assert.match(await page.locator(".trainer-start-bar").innerText(), /2 questões nesta sessão/);
  assert.ok(await page.getByRole("button", { name: "Começar sessão", exact: true }).isEnabled());
  assert.match(
    await page.locator(".trainer-start-bar").innerText(),
    /0 novas respostas disponíveis hoje/,
  );
  console.log("PASS daily quota: new answers blocked, existing answers remain reviewable");
  await context.close();
}
try {
  await checkCatalog();
  await checkCountError();
  if (!process.env.QA_ONLY_CATALOG) await checkWorkspace();
} finally {
  await browser.close();
}
