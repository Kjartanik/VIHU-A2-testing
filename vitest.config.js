// vitest.config.js
export default {
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
    exclude: ["node_modules/**", "dist/**", "src/eslint-tests/**"], // adjust as needed
  },
};
