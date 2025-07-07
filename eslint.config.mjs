import { defineConfig } from "eslint/config";
import typescriptEslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import globals from "globals";
import jest from "eslint-plugin-jest";
import js from "@eslint/js";
import love from "eslint-config-love";

export default defineConfig([
	js.configs.recommended,
	typescriptEslint.configs.eslintRecommended,
	typescriptEslint.configs.recommendedTypeChecked,
	typescriptEslint.configs.strict,
	love,
	prettier,
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},
			parserOptions: {
				project: "./tsconfig.json",
			},
		},

		rules: {
			"import/prefer-default-export": "off",
			"import/no-default-export": "error",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
			"@typescript-eslint/require-await": "off",

			// These rules are enabled by the `love` ruleset and our code base violates them.
			// We're disabling them here so we can re-enable one-by-one alongside necessary fixes.
			"@typescript-eslint/no-magic-numbers": "off",
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/no-unsafe-type-assertion": "off",
			"@typescript-eslint/return-await": "off",
			"import/enforce-node-protocol-usage": "off",
			"@typescript-eslint/consistent-type-exports": "off",
			"@typescript-eslint/array-type": "off",
			"@typescript-eslint/prefer-destructuring": "off",
			"eslint-comments/require-description": "off",
			"n/no-path-concat": "off",
		},
	},
	{
		files: ["**/*.test.ts"],

		plugins: {
			jest,
		},

		rules: {
			"max-lines": "off",
			"@typescript-eslint/no-magic-numbers": "off",
		},
	},
]);
