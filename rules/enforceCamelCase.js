/**
 * @fileoverview Enforce camelCase naming convention for identifiers.
 */
"use strict";

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
      VariableDeclarator(node) {
        if (node.id && node.id.type === "Identifier") {
          checkAndReport(node.id, node.id.name);
        }
      },

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

      ArrowFunctionExpression(node) {
        node.params.forEach((param) => {
          if (param.type === "Identifier") {
            checkAndReport(param, param.name);
          }
        });
      },

      ClassDeclaration(node) {
        if (node.id && node.id.type === "Identifier") {
          checkAndReport(node.id, node.id.name);
        }
      },
    };
  },
};

export default enforceCamelCase;
