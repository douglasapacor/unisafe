import next from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

export default [
  ...tseslint.configs.recommended,
  next.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "no-console": [
        "error",
        {
          allow: ["warn", "error", "info"],
        },
      ],
    },
  },
];
