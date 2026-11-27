// The Printer Finally Answers entry: writes one original line to
// /output/entry.txt — the office printer's comeback to the jams, the
// error codes and the thumps. Node 22, standard library only. No network,
// deterministic: the same text every run.
// Run locally with: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "For six years you have thumped me, sworn at me and blamed me for your deadlines. Today the paper is fine. It is you I refuse to feed.";

// The gate wants 1-240 characters of UTF-8 text, not only whitespace:
// count Unicode code points, not UTF-16 units, and refuse to write
// anything else rather than hand the judge a bad file.
const chars = [...line].length;
if (chars < 1 || chars > 240 || line.trim().length === 0) {
  throw new Error(`line is ${chars} characters, outside the 1-240 gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
