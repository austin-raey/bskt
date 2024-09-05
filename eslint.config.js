import eslint from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import prettier from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.stylistic,
  perfectionist.configs["recommended-alphabetical"],
  prettier,
  { ignores: ["bin/"] },
);
