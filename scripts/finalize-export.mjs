import { rename, access, writeFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Post-processing for GitHub Pages.
 *
 * Next's generated metadata images (app/opengraph-image.tsx, app/apple-icon.tsx)
 * are exported as extensionless files. GitHub Pages picks Content-Type from the
 * file extension, so an extensionless PNG is served as application/octet-stream
 * and social crawlers reject it. Renaming them here — with the metadata in
 * app/layout.tsx pointing at the renamed paths — is the whole fix.
 */

const OUT = join(process.cwd(), "out");

const renames = [
  ["opengraph-image", "og.png"],
  ["apple-icon", "apple-icon.png"],
];

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

let failed = false;

for (const [from, to] of renames) {
  const src = join(OUT, from);
  if (!(await exists(src))) {
    console.error(`finalize-export: expected ${from} in out/, not found`);
    failed = true;
    continue;
  }
  await rename(src, join(OUT, to));
  console.log(`finalize-export: ${from} -> ${to}`);
}

// GitHub Pages runs Jekyll unless told not to, and Jekyll drops _next/.
const nojekyll = join(OUT, ".nojekyll");
if (!(await exists(nojekyll))) {
  await writeFile(nojekyll, "");
  console.log("finalize-export: wrote .nojekyll");
}

if (failed) process.exit(1);
