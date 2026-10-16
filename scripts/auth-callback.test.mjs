import test from "node:test";
import assert from "node:assert/strict";
import { readEmailAuthCallback, finishEmailAuthCallback, createEmailAuthCallbackFlow, callbackErrorMessage } from "../src/lib/authCallback.ts";

const session = { user: { id: "candidate" } };
const result = (value = session) => ({ data: { session: value }, error: null });

test("confirmation on the home URL is recognized before the SDK clears its fragment", () => {
  const callback = readEmailAuthCallback("https://norteconcursos.xyz/#access_token=test&refresh_token=test&type=signup");
  assert.equal(callback.present, true);
  assert.equal(callback.recovery, false);
  assert.equal(readEmailAuthCallback("https://norteconcursos.xyz/").present, false);
});

test("PKCE codes are consumed by the SDK once, rather than exchanged again", async () => {
  const callback = readEmailAuthCallback("https://norteconcursos.xyz/auth?code=example");
  let reads = 0;
  const completed = await finishEmailAuthCallback({ getSession: async () => { reads++; return result(); }, verifyOtp: () => assert.fail("not a token_hash link") }, callback);
  assert.equal(reads, 1);
  assert.equal(completed.session, session);
  assert.equal(completed.error, null);
});

test("custom email confirmation verifies token_hash with its original type", async () => {
  let received;
  const callback = readEmailAuthCallback("https://norteconcursos.xyz/auth?token_hash=example&type=email");
  const completed = await finishEmailAuthCallback({ getSession: () => assert.fail("verify first"), verifyOtp: async (input) => { received = input; return result(); } }, callback);
  assert.deepEqual(received, { token_hash: "example", type: "email" });
  assert.equal(completed.session, session);
});

test("recovery intent survives implicit, PKCE and custom verification links", async () => {
  for (const url of ["https://norteconcursos.xyz/#access_token=test&type=recovery", "https://norteconcursos.xyz/auth?code=test&recovery=true", "https://norteconcursos.xyz/auth?token_hash=test&type=recovery"]) {
    const callback = readEmailAuthCallback(url);
    const completed = await finishEmailAuthCallback({ getSession: async () => result(), verifyOtp: async () => result() }, callback);
    assert.equal(completed.recovery, true);
    assert.equal(completed.session, session);
  }
});

test("expired links cannot reuse an unrelated existing session or display URL error text", async () => {
  const callback = readEmailAuthCallback("https://norteconcursos.xyz/#error=access_denied&error_code=otp_expired&error_description=untrusted");
  const completed = await finishEmailAuthCallback({ getSession: () => assert.fail("do not reuse session"), verifyOtp: () => assert.fail("do not verify error") }, callback);
  assert.equal(completed.error, "expired");
  assert.equal(completed.session, null);
  assert.match(callbackErrorMessage(completed.error), /entre com sua senha/);
  assert.doesNotMatch(callbackErrorMessage(completed.error), /untrusted/);
});

test("invalid OTP types never reach the verification endpoint", async () => {
  const callback = readEmailAuthCallback("https://norteconcursos.xyz/auth?token_hash=test&type=sms");
  const completed = await finishEmailAuthCallback({ getSession: () => assert.fail(), verifyOtp: () => assert.fail() }, callback);
  assert.equal(completed.error, "invalid");
});

test("missing callback session gives a usable error instead of silently returning to login", async () => {
  const callback = readEmailAuthCallback("https://norteconcursos.xyz/auth?code=test");
  const completed = await finishEmailAuthCallback({ getSession: async () => result(null), verifyOtp: () => assert.fail() }, callback);
  assert.equal(completed.error, "invalid");
  assert.equal(completed.session, null);
});

test("verification expiry and network failures are handled without leaking tokens", async () => {
  const callback = readEmailAuthCallback("https://norteconcursos.xyz/auth?token_hash=private-value&type=signup");
  const expired = await finishEmailAuthCallback({ verifyOtp: async () => ({ data: { session: null }, error: { code: "otp_expired" } }) }, callback);
  assert.equal(expired.error, "expired");
  const failed = await finishEmailAuthCallback({ verifyOtp: async () => { throw new Error("private-value"); } }, callback);
  assert.equal(failed.error, "failed");
  assert.doesNotMatch(callbackErrorMessage(failed.error), /private-value/);
});

test("multiple mounts share one verification and never reuse its session after logout", async () => {
  let verifications = 0;
  let reads = 0;
  const flow = createEmailAuthCallbackFlow({
    verifyOtp: async () => { verifications++; return result(); },
    getSession: async () => { reads++; return result(null); },
  }, readEmailAuthCallback("https://norteconcursos.xyz/auth?token_hash=test&type=recovery"));
  assert.equal(flow.recoveryPending(), true);
  const completions = await Promise.all([flow.complete(), flow.complete(), flow.complete()]);
  assert.equal(verifications, 1);
  assert.ok(completions.every((r) => r.session === session && r.recovery));
  flow.markHandled();
  assert.equal(flow.hasPending(), false);
  assert.equal(flow.recoveryPending(), false);
  const loggedOut = await flow.complete();
  assert.equal(loggedOut.session, null);
  assert.equal(loggedOut.error, null);
  assert.equal(loggedOut.recovery, false);
  assert.equal(reads, 1);
  assert.equal(verifications, 1);
});
