/** Verify the actual CSS second tick and responsive artwork; all account requests are intercepted.
 * PLAYWRIGHT_MODULE=/path/to/playwright-core/index.mjs node scripts/qa/backdrop-clock.mjs
 */
import assert from "node:assert/strict";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const base = process.env.BASE_URL || "http://127.0.0.1:3000";
try {
  for (const theme of ["light", "dark"])
    for (const width of [390, 1440]) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        reducedMotion: "reduce",
      });
      await context.route("https://gkwphadbveiyjcwiiizw.supabase.co/**", (route) =>
        route.fulfill({ contentType: "application/json", body: "[]" }),
      );
      await context.addInitScript((theme) => localStorage.setItem("theme", theme), theme);
      const page = await context.newPage();
      await page.goto(base + "/");
      await page.waitForFunction(() => document.documentElement.dataset.norteBoot === "ready");
      await page.locator("#norte-initial-loading").waitFor({ state: "hidden" });
      const dial = page.locator(".home-backdrop .tactical-clock-backdrop");
      await dial.locator(".tactical-clock-backdrop__second").waitFor({ state: "attached" });
      assert.equal(await dial.locator(".tactical-clock-backdrop__scale > g").count(), 12);
      assert.equal(await dial.locator(".tactical-clock-backdrop__minute-mark").count(), 48);
      assert.equal(await dial.locator(".tactical-clock-backdrop__numerals").count(), 0);
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.waitForFunction(
        () =>
          document.querySelector(".home-backdrop .tactical-clock-backdrop__second")?.getAnimations()
            .length === 1,
      );
      const tick = await dial.locator(".tactical-clock-backdrop__second").evaluate((el) => {
        const animation = el.getAnimations()[0];
        animation.pause();
        const timing = animation.effect.getTiming();
        animation.currentTime = Number(timing.delay) + 250;
        const first = getComputedStyle(el).transform;
        animation.currentTime = Number(timing.delay) + 850;
        const held = getComputedStyle(el).transform;
        animation.currentTime = Number(timing.delay) + 1050;
        const advanced = getComputedStyle(el).transform;
        return {
          first,
          held,
          advanced,
          duration: timing.duration,
          easing: getComputedStyle(el).animationTimingFunction,
        };
      });
      assert.equal(tick.first, tick.held, "second hand must remain still within a single second");
      assert.notEqual(tick.first, tick.advanced, "second hand must advance on the next second");
      assert.equal(tick.duration, 60000, "one complete revolution per real minute");
      assert.match(tick.easing, /^steps\(60/);
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
      );
      assert.equal(await dial.evaluate((el) => getComputedStyle(el).pointerEvents), "none");
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.waitForFunction(() => {
        const hand = document.querySelector(".home-backdrop .tactical-clock-backdrop__second");
        return hand && getComputedStyle(hand).animationName === "none";
      });
      await context.close();
      console.log(
        "PASS",
        theme,
        width,
        "12 indices, 48 minute dots, accurate quartz tick, reduced motion and responsive background",
      );
    }
} finally {
  await browser.close();
}
