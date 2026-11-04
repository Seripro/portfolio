import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import Module from "node:module";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(new URL("../lib/og-fallback.ts", import.meta.url));
const compiled = new Module(filename);
compiled._compile(ts.transpileModule(readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText, filename);
const { getOpenGraphFallback } = compiled.exports;

test("verified Udemy course retains coupon and returns the captured OGP", () => {
  const url = "https://www.udemy.com/course/modern_javascipt_react_beginner/?couponCode=PMNVD2525";
  const data = getOpenGraphFallback(url);
  assert.equal(data.url, url);
  assert.match(data.title, /React入門/);
  assert.equal(data.image, "https://img-c.udemycdn.com/course/480x270/3452848_0c2e.jpg");
});

test("snapshot does not apply to other courses, unsafe URLs or lookalike hosts", () => {
  for (const url of [
    "invalid", "http://127.0.0.1/", "http://169.254.169.254/",
    "https://www.udemy.com/course/another-course/",
    "https://www.udemy.com.evil.example/course/modern_javascipt_react_beginner/",
    "http://www.udemy.com/course/modern_javascipt_react_beginner/",
    "https://user:password@www.udemy.com/course/modern_javascipt_react_beginner/",
    "https://www.udemy.com:444/course/modern_javascipt_react_beginner/",
  ]) assert.equal(getOpenGraphFallback(url), null, url);
});
