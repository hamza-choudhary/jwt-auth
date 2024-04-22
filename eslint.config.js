import pluginJs from '@eslint/js'
import globals from 'globals'

export default [
	{ languageOptions: { globals: { ...globals.browser, process: true } } },
	{
		...pluginJs.configs.recommended,
		rules: {
			...pluginJs.configs.recommended.rules,
			'no-unused-vars': 'warn',
		},
	},
]
