import assert from "node:assert/strict";
import test from "node:test";
import { PREVIEW_FIXTURES } from "./preview-fixtures.ts";
import { familyOf, traitsFor } from "./device/traits.ts";
import { cardAvailability } from "./app/cards/availability.ts";
import type { ControlSnapshot } from "./device/types.ts";

function snapshotFor(key: "atk-f1"): ControlSnapshot {
  const status = PREVIEW_FIXTURES[key].status;
  return {
    status,
    traits: traitsFor(status),
  } as ControlSnapshot;
}

test("atk-f1 fixture matches the F1 Ultimate 2.0 driver shape", () => {
  const { status } = PREVIEW_FIXTURES["atk-f1"];
  assert.equal(status.brand, "ATK");
  assert.equal(status.name, "ATK F1 Ultimate 2.0");
  assert.equal(familyOf(status), "atk");
  assert.equal(status.pollingRateHz, 1000);
  assert.deepEqual(status.supportedPollingRates, [125, 250, 500, 1000, 2000, 4000, 8000]);
  assert.equal(status.dpi, 1600);
  // F1-only fields that gate the modernized widgets.
  assert.equal(status.atkSensorMode, 1);
  assert.equal(status.debounceMs, 1);
  assert.equal(status.angleTuning, 0);
  assert.ok((status.atkAntiMistouchMs ?? 0) > 0);
  assert.equal(status.atkDongleLight, 2);
  assert.deepEqual(status.liftOffScale, {
    value: 4, min: 1, max: 11, millimetres: 1, minMillimetres: 0.7, maxMillimetres: 1.7,
  });
});

test("atk-f1 fixture lights up the offender cards", () => {
  const snapshot = snapshotFor("atk-f1");
  assert.equal(snapshot.traits.debounce, true);
  assert.equal(snapshot.traits.sleep, true);
  const has = cardAvailability({
    ...snapshot,
    settingsPending: false,
  } as ControlSnapshot);
  assert.equal(has.debounce, true);
  assert.equal(has.sleep, true);
  assert.equal(has.processing, true);
  assert.equal(has.atkF1Sensor, true);
  assert.equal(has.atkF1Dongle, true);
});

test("the EGG fixtures carry the shape their driver actually reports", () => {
  // No EGG driver publishes `ui.family`, so neither fixture may claim one: the
  // previews have to exercise the same path real hardware takes.
  const v1 = PREVIEW_FIXTURES["egg-op1"].status;
  assert.equal(v1.brand, "Endgame Gear");
  assert.equal(familyOf(v1), "endgame gear");
  assert.deepEqual(v1.eggLodOptions, ["0.7 mm", "1 mm", "2 mm"]);
  assert.equal(v1.eggSupportsV2SensorControls, false);
  assert.equal(v1.eggCpiMax, 26_000);

  const v2 = PREVIEW_FIXTURES["egg-op1-v2"].status;
  assert.equal(v2.eggLodOptions?.length, 11);
  assert.equal(v2.eggCpiMin, 10);
  assert.equal(v2.eggCpiMax, 30_000);
  assert.equal(v2.eggCpiStepLow, 10);
  assert.equal(v2.eggSupportsV2SensorControls, true);
  assert.equal(v2.eggMotionSyncAt8k, true);
});

test("the EGG fixtures light up every advanced card they have controls for", () => {
  for (const key of ["egg-op1", "egg-op1-v2"] as const) {
    const status = PREVIEW_FIXTURES[key].status;
    const has = cardAvailability({
      status,
      traits: traitsFor(status),
      settingsPending: false,
      preferences: { showExperimental: true },
    } as unknown as ControlSnapshot);
    assert.equal(has.advancedHost, true, key);
    assert.equal(has.eggFilter, true, key);
    assert.equal(has.eggSpdt, true, key);
    assert.equal(has.eggCpi, true, key);
    assert.equal(has.eggButtons, true, key);
    assert.equal(has.eggHanded, true, key);
    // Only the v2 mouse has the v2 sensor block.
    assert.equal(has.eggV2Sensor, key === "egg-op1-v2", key);
    // Signal and sleep are not part of this driver.
    assert.equal(has.signal, false, key);
    assert.equal(has.sleep, false, key);
  }
});
