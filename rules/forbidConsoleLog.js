/**
 * @fileoverview Disallow the use of console.log.
 */
"use strict";

const forbidConsoleLog = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow the use of console.log",
      category: "Possible Errors",
      recommended: false,
    },
    schema: [], // no options
  },
  create(context) {
    return {
      MemberExpression(node) {
        if (
          node.object &&
          node.object.name === "console" &&
          node.property &&
          node.property.name === "log"
        ) {
          context.report({
            node,
            message: "Unexpected console.log statement.",
          });
        }
      },
    };
  },
};

export default forbidConsoleLog;
