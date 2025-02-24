import enforceCamelCase from "./rules/enforceCamelCase.js";
import forbidConsoleLog from "./rules/forbidConsoleLog.js";
import forbidRestrictedPackages from "./rules/forbidRestrictedPackage.js";
import tsParser from "@typescript-eslint/parser";

export default [
  // Global configuration for JavaScript and TypeScript files
  {
    files: ["**/*.{js,ts}"],
    ignores: ["node_modules/", ".github/", "rules/"],
    plugins: {
      "custom-rules": {
        rules: {
          "enforce-camel-case": enforceCamelCase,
          "forbid-console-log": forbidConsoleLog,
          "forbid-restricted-packages": forbidRestrictedPackages,
        },
      },
    },
    rules: {
      "custom-rules/enforce-camel-case": "error",
      "custom-rules/forbid-console-log": "error",
      "custom-rules/forbid-restricted-packages": [
        "error",
        { packages: ["moment"] },
      ],
    },
  },
  // Override for TypeScript files so they parse correctly using @typescript-eslint/parser
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": {},
    },
    rules: {
      // Add or override rules for TS files here if needed
    },
  },
  // Disable custom rules for files in the rules folder
  {
    files: ["rules/**"],
    rules: {
      "custom-rules/enforce-camel-case": "off",
      "custom-rules/forbid-console-log": "off",
      "custom-rules/forbid-restricted-packages": "off",
    },
  },
];
