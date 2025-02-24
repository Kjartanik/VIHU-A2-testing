import enforceCamelCase from "./rules/enforceCamelCase.js";
import forbidConsoleLog from "./rules/forbidConsoleLog.js";
import forbidRestrictedPackages from "./rules/forbidRestrictedPackage.js";
import tsParser from "@typescript-eslint/parser";

export default [
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
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": {},
    },
    rules: {
    },
  },
  {
    files: ["rules/**"],
    rules: {
      "custom-rules/enforce-camel-case": "off",
      "custom-rules/forbid-console-log": "off",
      "custom-rules/forbid-restricted-packages": "off",
    },
  },
];
