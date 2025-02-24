/**
 * @fileoverview Enforce camelCase naming convention for identifiers.
 */
"use strict";

// Check if a name is in camelCase: starts with a lowercase letter followed by letters and digits.
function isCamelCase(name) {
  return /^[a-z][a-zA-Z0-9]*$/.test(name);
}

function toCamelCase(name) {
  return name.replace(/[-_]+(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
}

const enforceCamelCase = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce camelCase naming convention",
      category: "Stylistic Issues",
      recommended: false,
    },
    fixable: "code",
    schema: [], // no options
  },
  create(context) {
    function checkAndReport(node, name) {
      if (!isCamelCase(name)) {
        const camelCased = toCamelCase(name);
        context.report({
          node,
          message: 'Identifier "{{name}}" is not in camelCase.',
          data: { name },
          fix(fixer) {
            return fixer.replaceText(node, camelCased);
          },
        });
      }
    }

    return {
      // Check variable declarations: e.g., let my_variable = 1;
      VariableDeclarator(node) {
        if (node.id && node.id.type === "Identifier") {
          checkAndReport(node.id, node.id.name);
        }
      },
      // Check function declarations and parameters.
      FunctionDeclaration(node) {
        if (node.id && node.id.type === "Identifier") {
          checkAndReport(node.id, node.id.name);
        }
        node.params.forEach((param) => {
          if (param.type === "Identifier") {
            checkAndReport(param, param.name);
          }
        });
      },
      // Check function expressions and their parameters.
      FunctionExpression(node) {
        if (node.id && node.id.type === "Identifier") {
          checkAndReport(node.id, node.id.name);
        }
        node.params.forEach((param) => {
          if (param.type === "Identifier") {
            checkAndReport(param, param.name);
          }
        });
      },
      // Check arrow function parameters.
      ArrowFunctionExpression(node) {
        node.params.forEach((param) => {
          if (param.type === "Identifier") {
            checkAndReport(param, param.name);
          }
        });
      },
      // Check class declarations.
      ClassDeclaration(node) {
        if (node.id && node.id.type === "Identifier") {
          checkAndReport(node.id, node.id.name);
        }
      },
    };
  },
};

export default enforceCamelCase;
