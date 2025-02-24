/**
 * @fileoverview Disallow importing of restricted packages.
 * By default, it forbids importing 'moment'.
 */
"use strict";

const forbidRest = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow importing of restricted packages",
      category: "Possible Errors",
      recommended: false,
    },
    schema: [
      {
        type: "object",
        properties: {
          packages: {
            type: "array",
            items: { type: "string" },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const options = context.options[0] || {};
    const restrictedPackages = options.packages || ["moment"];

    function checkImport(sourceValue, node) {
      if (restrictedPackages.includes(sourceValue)) {
        context.report({
          node,
          message: "Importing '{{package}}' is restricted.",
          data: { package: sourceValue },
        });
      }
    }

    return {
      // For ES module imports.
      ImportDeclaration(node) {
        if (node.source && node.source.value) {
          checkImport(node.source.value, node);
        }
      },
      // For CommonJS require calls.
      CallExpression(node) {
        if (
          node.callee &&
          node.callee.name === "require" &&
          node.arguments &&
          node.arguments.length === 1 &&
          node.arguments[0].type === "Literal"
        ) {
          checkImport(node.arguments[0].value, node);
        }
      },
    };
  },
};

export default forbidRest;
