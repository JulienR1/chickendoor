module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "simple-import-sort"],
	rules: {
		indent: ["error", "tab"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"no-await-in-loop": "error",
		"no-constructor-return": "error",
		"no-empty-function": "error",
		"simple-import-sort/imports": "error",
		"simple-import-sort/exports": "error",
	},
	overrides: [
		{
			files: ["*.spec.ts"],
			rules: {
				"no-empty-function": "off",
				"@typescript-eslint/no-empty-function": "off",
				"@typescript-eslint/no-explicit-any": "off",
			},
		},
	],
};
