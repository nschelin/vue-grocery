module.exports = {
	root: true,
	env: {
		node: true,
		es6: true
	},
	extends: ['eslint:recommended', 'plugin:prettier/recommended'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'prettier/prettier': ['error', { singleQuote: true, useTabs: true }]
	},
	parserOptions: {
		parser: 'babel-eslint',
		ecmaVersion: 8
	}
};
