import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      quotes: ["error", "double"],
      "jsx-quotes": ["error", "prefer-double"],
      semi: ["error", "never"],
      "no-unused-vars": "off",
      "no-console": "warn",
      "indent": ["error", 2],
      "max-len": ["error", { "code": 160 }],
      "no-trailing-spaces": "error",
      "eol-last": "error",
      "object-curly-spacing": ["error", "always"],

      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/no-var-requires": "off",
      "import/no-named-as-default": 0,
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "padding-line-between-statements": [
        "error",
        { "blankLine": "always", prev: "*", next: "return" },
        { "blankLine": "always", prev: "block-like", next: "*" },
        { "blankLine": "always", prev: "*", next: "block-like" },
        { "blankLine": "always", prev: "*", next: "directive" },
        { "blankLine": "any", prev: "directive", next: "directive" }
      ],
    },
  },
]

export default eslintConfig
