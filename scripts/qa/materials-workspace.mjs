/** Materials: all study surfaces, responsive tabs, CE keys, exact scopes and preserved sessions. No production writes.
 * PLAYWRIGHT_MODULE=/path/to/playwright-core/index.mjs node scripts/qa/materials-workspace.mjs
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
      if (location.hostname !== "127.0.0.1") return;
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

const material = {
  id: "material-1",
  slug: "informatica-seguranca",
  discipline: "Informática",
  topic_label: "Segurança da informação",
  sort_order: 1,
  title: "Segurança da informação",
  summary: "Entenda confidencialidade, integridade e disponibilidade.",
  contest_name: null,
  syllabus_topic_order: null,
  law_version_checked_at: null,
  content_status: "active",
  updated_at: "2026-10-24T12:00:00Z",
  quiz: [
    {
      q: "A autenticação auxilia a proteção do acesso.",
      a: true,
      why: "O acesso precisa ser verificado.",
    },
  ],
  flashcards: [],
  body_md:
    "# Segurança da informação\n\nA confidencialidade restringe o acesso a pessoas autorizadas.",
  source_note: "Material de teste local.",
  legal_basis: [],
  reviewed_at: null,
};
const questions = Array.from({ length: 23 }, (_, i) => ({
  id: "10000000-0000-4000-8000-" + String(i + 1).padStart(12, "0"),
  contest_name: "Prova QA",
  exam_year: 2026,
  career_name: "Agente",
  exam_board: "CEBRASPE",
  item_number: i + 1,
  subject: "Informática",
  tested_topic: "Segurança da informação",
  question_text:
    "Julgue o item: a autenticação em dois fatores acrescenta uma verificação à senha. Item " + i,
  official_answer: "C",
  review_note: "A afirmação está correta. Exemplo: uma senha e um código temporário.",
  legal_basis: [],
  content_status: "active",
  difficulty: "facil",
  legal_review_required: false,
  context_review_required: false,
}));
const course = {
  id: "course-1",
  slug: "codigo-processo-penal",
  title: "Código de Processo Penal — leitura atualizada",
  material_slug: material.slug,
  source_url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del3689.htm",
  checked_at: "2026-10-24T12:00:00Z",
  overview: {
    intro: "Leitura por artigo.",
    jurisprudence: [],
    contest: "PF",
    objectives: [],
    alerts: "",
    editorial_scope: "",
  },
};
const unit = {
  id: "unit-1",
  course_id: course.id,
  unit_key: "art-5",
  label: "Art. 5º",
  chapter: "Inquérito policial",
  position: 1,
  body_text: "Art. 5º Nos crimes de ação pública o inquérito policial será iniciado...",
  content_status: "current",
  recall: { prompts: [], checklist: [] },
};
const results = [];
for (const [width, height, theme] of [
  [390, 844, "dark"],
  [768, 1024, "light"],
  [1366, 900, "dark"],
]) {
  const context = await contextFor(width, height);
  await context.addInitScript((theme) => {
    if (location.hostname === "127.0.0.1") localStorage.setItem("theme", theme);
  }, theme);
  await context.route("https://gkwphadbveiyjcwiiizw.supabase.co/rest/v1/**", async (route) => {
    const url = new URL(route.request().url());
    const path = url.pathname;
    let body;
    if (path.endsWith("/study_materials"))
      body = url.searchParams.get("slug") ? material : [material];
    else if (path.endsWith("/official_exam_questions"))
      body = questions.slice(
        Number(url.searchParams.get("offset") || 0),
        Number(url.searchParams.get("offset") || 0) + Number(url.searchParams.get("limit") || 1000),
      );
    else if (path.endsWith("/legal_courses")) body = [course];
    else if (path.endsWith("/legal_course_units"))
      body = Number(url.searchParams.get("offset") || 0) > 0 ? [] : [unit];
    else if (path.endsWith("/legal_unit_explanations")) body = null;
    else if (path.endsWith("/legal_explanation_coverage"))
      body = [{ course_slug: course.slug, explained: 0, total_units: 1 }];
    else if (
      path.endsWith("/check_library_daily_access") ||
      path.endsWith("/consume_library_daily_access")
    )
      body = { allowed: true };
    if (body === undefined) return route.fallback();
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(body),
      headers: { "content-range": "0-0/1", "access-control-expose-headers": "content-range" },
    });
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const path of [
    "/dashboard/library/informatica-seguranca",
    "/dashboard/trilhas?t=informatica",
    "/dashboard/disciplinas?d=Informática",
  ]) {
    await page.goto(base + path);
    const tabs = page.getByRole("tablist", { name: "Etapas de estudo" });
    await tabs.waitFor({ timeout: 30000 });
    await page.getByRole("tab", { name: "Explicação didática", exact: true }).click();
    await page.getByRole("tab", { name: "Praticar · até 20", exact: true }).click();
    if (path.includes("/disciplinas"))
      await page
        .getByRole("combobox", { name: /^Assunto/ })
        .selectOption("Segurança da informação");
    if (path.includes("/library/")) {
      await page.getByRole("button", { name: "Iniciar 20 questões", exact: true }).click();
      await page.getByRole("button", { name: "C Certo", exact: true }).click();
      await page.getByRole("button", { name: "Próxima questão", exact: true }).click();
      await page.getByRole("tab", { name: "Texto-base", exact: true }).click();
      await page.getByRole("tab", { name: "Praticar · até 20", exact: true }).click();
      await page.getByText("Questão 2 de 20", { exact: false }).waitFor();
      const href = await page
        .getByRole("link", { name: "Explorar questões deste assunto" })
        .getAttribute("href");
      assert.ok(href.includes("materialTopic=Seguran"));
      assert.ok(href.includes("studySubject=Inform"));
      await page.screenshot({
        path: "/tmp/materials-" + width + "-" + theme + ".png",
        fullPage: true,
      });
    }
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth + 2,
    );
    assert.ok(!overflow, "Horizontal overflow " + width + " " + path);
    results.push({ width, theme, path, overflow });
  }

  await page.goto(base + "/dashboard/legal-course/codigo-processo-penal?art=art-5");
  await page
    .getByRole("navigation", { name: "Passos de estudo deste artigo" })
    .getByRole("button", { name: /Praticar/ })
    .click();
  await page.getByRole("button", { name: "Iniciar 0 questões", exact: true }).waitFor();
  assert.ok(
    await page.getByRole("button", { name: "Iniciar 0 questões", exact: true }).isDisabled(),
  );
  const lawHref = await page
    .getByRole("link", { name: "Explorar questões deste assunto" })
    .getAttribute("href");
  assert.ok(lawHref.includes("law=codigo-processo-penal"));
  assert.ok(lawHref.includes("studyArticle=Art."));
  assert.ok(!(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2)));
  results.push({ width, theme, path: "legal-course", emptyScopeMaintained: true });
  assert.deepEqual(errors, []);
  await context.close();
}
console.log(JSON.stringify(results, null, 2));
await browser.close();
