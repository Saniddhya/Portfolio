import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * Flat ESLint config.
 *
 * Ignored build artifacts are listed explicitly — without this the linter walks
 * `.next` and chokes on generated route types.
 */
const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "next-env.d.ts",
      "*.log",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Apostrophes and typographic characters appear in editorial copy.
      "react/no-unescaped-entities": "off",
      // Lazy initialisation from browser APIs in effects is intentional here.
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;