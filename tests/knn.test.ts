import { getKNearestNeighborsByUserId } from "@/lib/knn";
import { expect, test } from "vitest";
import util from "util";

test("k nearest neighbors", async () => {
  const users = await getKNearestNeighborsByUserId(
    "ce0d71e5-3822-4150-a116-66c574de1450",
    5
  );
  console.log(util.inspect(users, { colors: true, depth: null }));
  expect(users.length).toBe(5);
});