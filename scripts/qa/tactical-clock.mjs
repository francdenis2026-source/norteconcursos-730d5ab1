/** Tactical clock timing and responsive regression with mocked authentication; no production writes.
 * PLAYWRIGHT_MODULE=/path/to/playwright-core/index.mjs node scripts/qa/tactical-clock.mjs
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
    if (path.endsWith("/token")) body = session(role);
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

try {
  for (const width of [320, 390, 768, 1440]) {
    const context = await contextFor(width, 900);
    const page = await context.newPage();
    await page.goto(base + "/dashboard/timer");
    await page.locator(".tactical-clock--focus").waitFor();
    await page.getByRole("button", { name: "Iniciar", exact: true }).click();
    await page.waitForTimeout(2200);
    const running = await page
      .locator(".tactical-clock--focus .tactical-clock__time")
      .textContent();
    assert.notEqual(running, "25:00");
    await page.getByRole("button", { name: "Pausar", exact: true }).click();
    const paused = await page.locator(".tactical-clock--focus .tactical-clock__time").textContent();
    await page.waitForTimeout(1200);
    assert.equal(
      await page.locator(".tactical-clock--focus .tactical-clock__time").textContent(),
      paused,
    );
    assert.ok(await page.locator(".tactical-clock--focus").getAttribute("data-paused"));
    await page.getByRole("button", { name: "Reiniciar cronômetro" }).click();
    assert.equal(
      await page.locator(".tactical-clock--focus .tactical-clock__time").textContent(),
      "25:00",
    );
    await page.getByRole("button", { name: "Pausa Curta", exact: true }).click();
    assert.equal(
      await page.locator(".tactical-clock--focus .tactical-clock__time").textContent(),
      "05:00",
    );
    assert.ok(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      "no overflow " + width,
    );
    if (width === 1440) {
      assert.equal(await page.locator(".app-topbar [role=timer]").count(), 0);
      assert.ok(await page.evaluate(() => Object.keys(localStorage).some(key => key.startsWith("norte_clock_v2:"))), "active study tracking continues without topbar clocks");
    }
    await page.screenshot({ path: "/tmp/tactical-clock-" + width + ".png", fullPage: true });
    // Exercise the real question component with long elapsed times and all states.
    await page.evaluate(async () => {
      const reactModule = await import("/node_modules/.vite/deps/react.js");
      const React = reactModule.default || reactModule;
      const client = await import("/node_modules/.vite/deps/react-dom_client.js");
      const createRoot = client.createRoot || client.default.createRoot;
      const { QuestionTimer } = await import("/src/components/dashboard/QuestionTimer.tsx");
      const host = document.createElement("div");
      host.id = "qa-clocks";
      host.style =
        "position:fixed;inset:0;z-index:99999;background:#202020;display:flex;flex-wrap:wrap;align-content:start;gap:8px;padding:8px";
      document.body.append(host);
      createRoot(host).render(
        React.createElement(
          React.Fragment,
          null,
          React.createElement(QuestionTimer, { seconds: 3661 }),
          React.createElement(QuestionTimer, { seconds: 61, paused: true }),
          React.createElement(QuestionTimer, { seconds: 125, completed: true }),
        ),
      );
    });
    await page.locator("#qa-clocks .question-stopwatch").first().waitFor();
    assert.match(await page.locator("#qa-clocks").innerText(), /1:01:01/);
    assert.equal(await page.locator('#qa-clocks [data-paused="true"]').count(), 2);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    for (const theme of ["light", "dark"]) {
      await page.evaluate((theme) => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        document.documentElement.dataset.theme = theme;
      }, theme);
      await page.emulateMedia({ reducedMotion: "reduce" });
      const fits = await page.locator("#qa-clocks .tactical-clock--question").evaluateAll((nodes) =>
        nodes.every((node) => {
          const face = node.getBoundingClientRect(),
            dial = node.querySelector(".tactical-clock__face").getBoundingClientRect(),
            display = node.querySelector(".tactical-clock__display").getBoundingClientRect();
          return (
            display.left >= dial.right &&
            display.bottom <= face.bottom + 1 &&
            display.left >= face.left &&
            display.right <= face.right
          );
        }),
      );
      assert.ok(fits, "digital plaque stays inside reserved layout in " + theme);
    }
    await page.screenshot({ path: "/tmp/tactical-question-" + width + ".png" });
    await context.close();
    console.log("PASS", width, "timing, pause, reset, modes, question states, fit");
  }
} finally {
  await browser.close();
}
