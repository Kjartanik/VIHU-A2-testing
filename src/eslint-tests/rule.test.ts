import { RuleTester } from "eslint";
import enforceCamelCase from "../../rules/enforceCamelCase.js";
import forbidConsoleLog from "../../rules/forbidConsoleLog.js";
import forbidRestrictedPackage from "../../rules/forbidRestrictedPackage.js";

// Cast the rules to any to bypass ESLint type issues.
const enforceCamelCaseRule = enforceCamelCase as any;
const forbidConsoleLogRule = forbidConsoleLog as any;
const forbidRestrictedPackageRule = forbidRestrictedPackage as any;

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
});

ruleTester.run("enforce-camel-case", enforceCamelCaseRule, {
  valid: [
    { code: "const myVariable = 123;" },
    { code: "function testFunction() {}" },
    { code: "class myClass {}" },
  ],
  invalid: [
    {
      code: "const my_variable = 123;",
      errors: [{ message: 'Identifier "my_variable" is not in camelCase.' }],
      output: "const myVariable = 123;",
    },
    {
      code: "function my_function() {}",
      errors: [{ message: 'Identifier "my_function" is not in camelCase.' }],
      output: "function myFunction() {}",
    },
  ],
});

ruleTester.run("forbid-console-log", forbidConsoleLogRule, {
  valid: [{ code: "alert('Hello world');" }],
  invalid: [
    {
      code: "console.log('Hello world');",
      errors: [{ message: "Unexpected console.log statement." }],
    },
  ],
});

ruleTester.run("forbid-restricted-packages", forbidRestrictedPackageRule, {
  valid: [
    { code: "import something from 'lodash';" },
    { code: "const moment = require('not-moment');" },
  ],
  invalid: [
    {
      code: "import moment from 'moment';",
      options: [{ packages: ["moment"] }],
      errors: [{ message: "Importing 'moment' is restricted." }],
    },
    {
      code: "const moment = require('moment');",
      options: [{ packages: ["moment"] }],
      errors: [{ message: "Importing 'moment' is restricted." }],
    },
  ],
});
