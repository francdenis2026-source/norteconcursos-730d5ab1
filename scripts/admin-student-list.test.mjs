import test from "node:test";
import assert from "node:assert/strict";
import { visibleAdminStudentProfiles } from "../src/lib/adminStudentList.ts";

test("admin student list excludes anonymous guest profiles but keeps real students", () => {
  const rows = [
    { id: "real", email: "student@example.com", full_name: "Student", subscription_tier: "free", created_at: null },
    { id: "guest", email: null, full_name: null, subscription_tier: "free", created_at: null },
    { id: "empty", email: "", full_name: null, subscription_tier: "free", created_at: null },
  ];
  assert.deepEqual(visibleAdminStudentProfiles(rows).map((row) => row.id), ["real"]);
});
