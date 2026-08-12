import coreWebVitals from "eslint-config-next/core-web-vitals";
import next from "eslint-config-next";
import typescript from "eslint-config-next/typescript";

/**
 * eslint-config-next ships native flat configs as of Next 16 — no FlatCompat.
 */
const eslintConfig = [
  { ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"] },
  ...next,
  ...coreWebVitals,
  ...typescript,
];

export default eslintConfig;
