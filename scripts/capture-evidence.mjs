import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { chromium } from "playwright";

const root = resolve("storybook-static");
const mime = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
};
let server;
let base = process.env.STORYBOOK_URL?.replace(/\/$/, "");
if (!base) {
  server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(
        new URL(request.url ?? "/", "http://localhost").pathname,
      );
      let file = resolve(root, `.${pathname}`);
      if (!file.startsWith(`${root}/`) && file !== root)
        throw new Error("Invalid path");
      if ((await stat(file)).isDirectory()) file = join(file, "index.html");
      response.writeHead(200, {
        "Content-Type": mime[extname(file)] ?? "application/octet-stream",
      });
      response.end(await readFile(file));
    } catch {
      response.writeHead(404);
      response.end("Not found");
    }
  });

  await new Promise((resolveReady) =>
    server.listen(0, "127.0.0.1", resolveReady),
  );
  const address = server.address();
  if (!address || typeof address === "string")
    throw new Error("Unable to start evidence server");
  base = `http://127.0.0.1:${address.port}`;
}
const browser = await chromium.launch({
  executablePath: process.env.CHROME_BIN ?? "/usr/bin/google-chrome",
  headless: true,
});

async function capture(path, output, viewport) {
  const page = await browser.newPage({ viewportSize: viewport });
  await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
  await page.locator("#storybook-preview-iframe").waitFor({ state: "visible" });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: output, fullPage: true });
  await page.close();
}

try {
  await capture(
    "/?path=/docs/foundations-introduction--docs",
    "docs/images/storybook-foundations.png",
    { width: 1440, height: 1000 },
  );
  await capture(
    "/?path=/story/components-cards-feature-card--desktop",
    "docs/images/storybook-component.png",
    { width: 1440, height: 1000 },
  );
  await capture(
    "/?path=/story/pages-public-page--mobile",
    "docs/images/storybook-responsive.png",
    { width: 1180, height: 1000 },
  );
  console.log(`Evidence captured from ${base} in docs/images/`);
} finally {
  await browser.close();
  server?.closeAllConnections();
  server?.close();
}
