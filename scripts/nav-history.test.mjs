import test from "node:test";
import assert from "node:assert/strict";
import { recordVisit, previousDashboardHref } from "../src/lib/navHistory.ts";

test("previous screen is the dashboard entry one step back; index 0 and external entries have none", () => {
  recordVisit(1, "/dashboard/material");
  recordVisit(2, "/dashboard/library/lei-x?back=1");
  assert.equal(previousDashboardHref(2), "/dashboard/material");
  assert.equal(previousDashboardHref(0), null);
  assert.equal(previousDashboardHref(1), null); // entrada 0 nunca foi registrada
  recordVisit(5, "/auth");
  recordVisit(6, "/dashboard/disciplinas");
  assert.equal(previousDashboardHref(6), null); // anterior fora da plataforma: usa o destino reserva
});
