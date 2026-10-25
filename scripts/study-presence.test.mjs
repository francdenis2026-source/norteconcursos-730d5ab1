import test from "node:test";
import assert from "node:assert/strict";
import {
  browserPresenceId,
  countOnlineBrowsers,
  studyPresenceLabel,
  BROWSER_PRESENCE_KEY,
} from "../src/lib/studyPresence.ts";
const ID = "00000000-0000-4000-8000-000000000001";
test("tabs and login changes reuse a random browser ID, without needing account data", () => {
  const values = new Map();
  const storage = { getItem: (k) => values.get(k), setItem: (k, v) => values.set(k, v) };
  assert.equal(
    browserPresenceId(storage, () => ID),
    ID,
  );
  assert.equal(
    browserPresenceId(storage, () => {
      throw new Error("must reuse existing ID");
    }),
    ID,
  );
  assert.equal(values.get(BROWSER_PRESENCE_KEY), ID);
});
test("blocked or corrupt storage has a functional temporary anonymous identifier", () => {
  assert.equal(
    browserPresenceId(
      {
        getItem: () => {
          throw new Error("blocked");
        },
        setItem: () => {
          throw new Error("blocked");
        },
      },
      () => ID,
    ),
    ID,
  );
  assert.equal(
    browserPresenceId({ getItem: () => "account@example.invalid", setItem: () => {} }, () => ID),
    ID,
  );
});
test("multiple tabs count once, anonymous and authenticated browsers both count, hidden tabs do not", () => {
  assert.equal(
    countOnlineBrowsers({
      browser1: [{ visible: true }, { visible: true }],
      browser2: [{ visible: true }],
      browser3: [],
      browser4: [{ visible: false }],
    }),
    2,
  );
  assert.equal(countOnlineBrowsers({}), 0);
  assert.equal(countOnlineBrowsers({ browser1: [{ visible: true }, { visible: false }] }), 1);
  for (const value of [null, undefined, 2, []]) assert.equal(countOnlineBrowsers(value), null);
});
test("presence labels accurately describe visitors rather than registered students", () => {
  assert.equal(studyPresenceLabel(0), "0 visitantes online");
  assert.equal(studyPresenceLabel(1), "1 visitante online");
  assert.equal(studyPresenceLabel(1200), "1.200 visitantes online");
});
