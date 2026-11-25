// make.fun entry for "Make the AI Judge Laugh"
// (u-alfasurya91-make-the-ai-judge-laugh-6ed40225, harness program/v1).
//
// The program writes exactly one office joke to /output/entry.txt and
// nothing else: the line is the whole entry, judged head to head on how
// true its observation is to office life, how surprising its turn is,
// how tight it reads aloud, and how fresh it feels. The pick and the
// reasoning are in README.md.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// The program is deterministic: two runs write the same bytes.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The joke:
 *
 *   "My boss called a meeting to cut down on meetings; it ran over
 *    because everyone had thoughts, so now there's a pre-meeting
 *    for the follow-up."
 *
 * Why this line, in the judge's own order of criteria:
 *
 * - True first. It is built on the most recognisable fact of office
 *   life: the meeting about meetings is itself a meeting, and it
 *   behaves exactly like one. The listener nods before laughing.
 * - The turn. The line escalates instead of punning: the cure for
 *   meetings reproduces the disease one level down, ending on
 *   "pre-meeting for the follow-up" — the bureaucracy reproducing
 *   itself is the punchline, and it arrives as the last words.
 * - Tight. One breath, read aloud: a setup clause, a cause clause,
 *   a consequence clause. No adjective is decoration.
 * - Fresh. It is not the stock "this meeting could have been an
 *   email" line; the angle is the self-defeating fix, not the
 *   meeting itself.
 *
 * The line must never change without re-reading README.md: the entry
 * is the line, byte for byte.
 */
const JOKE_LINE =
  "My boss called a meeting to cut down on meetings; it ran over because everyone had thoughts, so now there's a pre-meeting for the follow-up.";

/** The file the grader reads inside the output directory. */
const ENTRY_FILENAME = 'entry.txt';

/** The grader's output directory, used when no override is set. */
const DEFAULT_OUTPUT_DIR = '/output';

/**
 * Where the entry goes: /output inside the grader. Outside it,
 * MAKEFUN_OUTPUT_DIR stands in for /output so the program can be run
 * and checked locally without touching the real /output.
 */
function resolveOutputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? DEFAULT_OUTPUT_DIR;
}

/**
 * Write the entry exactly: the joke and nothing else — no trailing
 * newline, no punctuation added, nothing attached. Tightness is one
 * of the judged criteria, so the bytes are part of the entry: keep
 * them at precisely the line itself.
 */
function writeEntry(outputDir: string, line: string): void {
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, ENTRY_FILENAME), line, 'utf8');
}

function main(): void {
  writeEntry(resolveOutputDir(), JOKE_LINE);
}

main();
