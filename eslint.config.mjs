import tsParser from '@typescript-eslint/parser';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import epp from './config/eslint/plugin-epp.mjs';

export default [
	{
		files: ['**/*.{mjs,ts,tsx}'],
		ignores: [
			'**/node_modules/',
			'.git/',
			'.react-router/',
			'.wrangler/',
			'build/',
		],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			perfectionistPlugin,
		},
		rules: { ...epp },
	},
];
