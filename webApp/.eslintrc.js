module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		"no-debugger": "error",
		indent: ["error", "tab"],
		"linebreak-style": ["error", "windows"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"sort-imports": [
			"error",
			{
				ignoreCase: false,
				ignoreDeclarationSort: false,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
				allowSeparatedGroups: false,
			},
		],
	},
};
