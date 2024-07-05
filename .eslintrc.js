// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier", "autofix"],
  rules: {
    "prettier/prettier": "error",
    "react-hooks/exhaustive-deps": "error",
    "autofix/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
        destructuredArrayIgnorePattern: "^_"
      }
    ],
    "arrow-body-style": ["error", "as-needed"],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "parent",
          "sibling",
          "index",
          "object",
          "type"
        ],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before"
          }
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true
        }
      }
    ],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "*" },
      { blankLine: "any", prev: "import", next: "import" }
    ]
  }
};
