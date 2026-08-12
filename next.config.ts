import type { NextConfig } from "next";

/**
 * The site is deployed to https://meeth-w.github.io from the user-site
 * repository `Meeth-W.github.io`, so it is served from the domain root.
 * No basePath / assetPrefix — adding one would break every asset URL.
 */
const nextConfig: NextConfig = {
  // Emit a fully static `out/` directory. No server runtime anywhere.
  output: "export",

  // GitHub Pages serves `/projects/index.html` for `/projects/`, not for
  // `/projects`. Trailing slashes keep exported routes and links in agreement.
  trailingSlash: true,

  // next/image's optimizer needs a server; static export has none.
  images: { unoptimized: true },
};

export default nextConfig;
