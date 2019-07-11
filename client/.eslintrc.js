module.exports = {
	root: true,
	env: {
		node: true,
		es6: true
	},
	extends: [
		'plugin:vue/essential',
		'@vue/prettier',
		'plugin:prettier/recommended'
	],
	rules: {
		'prettier/prettier': ['error', { singleQuote: true, useTabs: true }],
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
	},
	parserOptions: {
		parser: 'babel-eslint'
	}
};
