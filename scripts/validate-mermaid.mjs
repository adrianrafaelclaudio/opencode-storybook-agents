import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright";

async function markdownFiles(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === "storybook-static")
      continue;
    const target = join(path, entry.name);
    if (entry.isDirectory()) files.push(...(await markdownFiles(target)));
    else if (entry.name.endsWith(".md")) files.push(target);
  }
  return files;
}

let diagrams = 0;
const browser = await chromium.launch({
  executablePath: process.env.CHROME_BIN ?? "/usr/bin/google-chrome",
  headless: true,
});
const page = await browser.newPage();
await page.addScriptTag({ path: "node_modules/mermaid/dist/mermaid.min.js" });

try {
  for (const file of await markdownFiles(".")) {
    const source = await readFile(file, "utf8");
    for (const match of source.matchAll(/```mermaid\n([\s\S]*?)```/g)) {
      await page.evaluate(
        (diagram) => globalThis.mermaid.parse(diagram),
        match[1],
      );
      diagrams += 1;
    }
  }
} finally {
  await browser.close();
}

console.log(`${diagrams} Mermaid diagrams validated`);
