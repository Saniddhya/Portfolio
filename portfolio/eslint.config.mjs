import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allow apostrophes in JSX text — the formatter converts ' back to '
      "react/no-unescaped-entities": "off",
      // React 19's new strict rule — our use cases are legitimate (lazy init from localStorage)
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;