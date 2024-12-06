import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin"; // Correct import
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks"; // React Hooks plugin
import typescriptParser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest", // Adjust based on your project's requirements
        sourceType: "module",
      },
    },
    plugins: {
      react: pluginReact,
      "@typescript-eslint": tseslint,
      "react-hooks": pluginReactHooks, // Ensure React hooks are included
    },
    settings: {
      react: {
        version: "detect", // Automatically detects React version
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      "react-hooks/rules-of-hooks": "error", // Hooks must follow the rules
      "react-hooks/exhaustive-deps": "warn", // Warn for missing dependencies
    },
  },
];
