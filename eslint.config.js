import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import tsParser from '@typescript-eslint/parser';

export default [
	js.configs.recommended,
	{
		ignores: ['dist/**/*', '.astro/**/*', 'node_modules/**/*', 'public/**/*', 'scripts/**/*'],
	},
	{
		files: ['**/*.{js,mjs}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				// Browser globals for portfolio
				window: 'readonly',
				document: 'readonly',
				localStorage: 'readonly',
				fetch: 'readonly',
				console: 'readonly',
				// Google CMP & Analytics globals
				googlefc: 'readonly',
				gtag: 'readonly',
				dataLayer: 'readonly',
			},
		},
		rules: {
			// General JavaScript rules for portfolio
			'no-console': 'warn',
			'no-debugger': 'error',
			'no-duplicate-imports': 'error',
			'no-unused-expressions': 'error',
			'prefer-const': 'error',
			'no-var': 'error',
			'object-shorthand': 'error',
			'prefer-template': 'error',
		},
	},
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			globals: {
				// TypeScript environment globals
				window: 'readonly',
				document: 'readonly',
				googlefc: 'readonly',
				gtag: 'readonly',
			},
		},
		rules: {
			// TypeScript specific rules
			'@typescript-eslint/no-unused-vars': 'error',
			'@typescript-eslint/prefer-const': 'error',
		},
	},
	...astro.configs.recommended,
	{
		files: ['**/*.astro'],
		rules: {
			// Astro specific rules for portfolio
			'astro/no-unused-css-selector': 'warn',
			'astro/prefer-class-list-directive': 'error',
		},
	},
];
