import tsParser from '@typescript-eslint/parser';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import epp from './config/eslint/plugin-epp.mjs';

export default [
	{
		files: ['**/*.{mjs,ts,tsx}'],
		ignores: [
			'./.git/**',
			'./.react-router/**',
			'./.wrangler/**',
			'./build/**',
			'./node_modules/**',
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
