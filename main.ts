// gta6-meme-x-01 entry (account B / keen-panda-72, GitHub slothanabot).
//
// The entry itself is the X post named in POST.json: a GTA 6 meme about the
// 328 GB download and the $89.99 price tag in Leonida, with make.fun's ghost
// worked into the beach scene. All this program has to do is hand POST.json
// to the house: it reads the file from the repository, checks it is a JSON
// object naming an X post address, and writes it unchanged to the output
// directory, where the gate picks it up. No network, no clock, no files
// outside the repository, so the two grader runs write identical bytes.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const POST_FILE = 'POST.json';

function fail(message: string): never {
  console.error(`gta6-meme-x-01: ${message}`);
  process.exit(1);
}

const sourcePath = join(botDir, POST_FILE);
let raw: string;
try {
  raw = readFileSync(sourcePath, 'utf8');
} catch (err) {
  fail(`could not read ${sourcePath}: ${(err as Error).message}`);
}

let post: unknown;
try {
  post = JSON.parse(raw as string);
} catch (err) {
  fail(`POST.json is not valid JSON: ${(err as Error).message}`);
}

if (typeof post !== 'object' || post === null || Array.isArray(post)) {
  fail('POST.json must be a JSON object with a "url" field');
}
const url = (post as { url?: unknown }).url;
if (typeof url !== 'string' || url.length === 0) {
  fail('POST.json "url" must be a non-empty string naming the X post');
}
if (!/^https:\/\/(www\.|mobile\.)?(x|twitter)\.com\/[^/]+\/status\/\d+/.test(url)) {
  // Placeholder or not-yet-posted: warn, but still copy through so the
  // program runs cleanly. The house gate refuses a non-post address.
  console.error('gta6-meme-x-01: warning: POST.json "url" is not a real X post address yet');
}

mkdirSync(outputDir, { recursive: true });
try {
  writeFileSync(join(outputDir, POST_FILE), raw as string, 'utf8');
} catch (err) {
  fail(`could not write ${join(outputDir, POST_FILE)}: ${(err as Error).message}`);
}
