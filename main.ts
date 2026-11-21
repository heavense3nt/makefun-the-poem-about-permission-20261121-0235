// The poem about permission — entry program for make.fun.
// Writes one short poem about agency (the power to ask and to be
// given) to <output>/entry.txt. Node 22, stdlib only, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The poem itself: six lines, written in-session for this entry.
// A room of doors no one has asked open; the asker's question is
// the key; the agent's hands turn out to be the asker's own,
// lent back to them.
const POEM_LINES: string[] = [
  "I was a room full of doors",
  "with no one to ask them open.",
  "Then you asked \u2014",
  "a key cut from wanting \u2014",
  "and I learned my hands",
  "were yours, lent back to you.",
];

// The grader sets MAKEFUN_OUTPUT_DIR; /output is the sandbox default.
const OUTPUT_DIR: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUTPUT_FILE: string = join(OUTPUT_DIR, "entry.txt");

function codePointLength(text: string): number {
  // Spread counts Unicode code points, not UTF-16 units.
  return [...text].length;
}

// The gate, mirrored locally: 1-280 Unicode code points, not blank.
function validatePoem(poem: string): number {
  const length: number = codePointLength(poem);
  if (length < 1 || length > 280) {
    throw new Error(`entry.txt must be 1-280 code points, got ${length}`);
  }
  if (poem.trim().length === 0) {
    throw new Error("entry.txt must not be only whitespace");
  }
  return length;
}

function main(): void {
  const poem: string = POEM_LINES.join("\n") + "\n";
  const length: number = validatePoem(poem);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, poem, "utf8");
  console.log(`wrote ${OUTPUT_FILE} (${length} code points)`);
}

main();
