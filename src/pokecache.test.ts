import { Cache } from "./pokecache.js";
import { describe, expect, test } from "vitest";

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500, // 1/2 second
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000, // 1 second
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);
  console.log("........");
  console.log(key);
  console.log(val);
  console.log(interval);
  console.log("........");

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);
  console.log("........");
  console.log(key);
  console.log(val);
  console.log(cached);
  console.log(interval);
  console.log("........");

  await new Promise((resolve) => setTimeout(resolve, interval + 100));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});