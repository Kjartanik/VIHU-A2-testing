import { Rule } from "eslint";

declare module "eslint" {
  namespace Rule {
    // Define a minimal version of the rule module type.
    export type RuleModule = {
      meta: {
        type: "problem" | "suggestion" | "layout";
        docs: {
          description: string;
          category: string;
          recommended: boolean;
        };
        fixable?: "code" | "whitespace";
        schema: any[];
      };
      create(context: any): any;
    };
  }
}
