import pluginJs from '@eslint/js'
import globals from 'globals'

export default [
	// Merge language options with browser globals
	{ languageOptions: { globals: globals.browser } },
	// Extend recommended configuration from pluginJs
	{
		...pluginJs.configs.recommended,
		// Customize rules
		rules: {
			...pluginJs.configs.recommended.rules,
			// Change no-unused-vars to emit warnings instead of errors
			'no-unused-vars': 'warn',
		},
	},
]
