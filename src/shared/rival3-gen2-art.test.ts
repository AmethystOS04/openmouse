import assert from "node:assert/strict";
import test from "node:test";

import { deviceImage, isUnknownDevice } from "./device-images.ts";

test("Rival 3 Gen 2 resolves to the fork-local artwork", () => {
  assert.equal(
    deviceImage(null, "SteelSeries Rival 3 Gen 2"),
    "/devices/steelseries-rival-3-gen-2.svg",
  );
  assert.equal(isUnknownDevice(null, "SteelSeries Rival 3 Gen 2"), false);
});
