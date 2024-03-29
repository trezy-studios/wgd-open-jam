/* eslint-env node */

'use strict'

module.exports = {
	opts: {
		template: 'node_modules/better-docs',
	},
	tags: {
		allowUnknownTags: ['optional'],
	},
	plugins: ['node_modules/better-docs/typescript'],
	source: {
		includePattern: '\\.(jsx|js)$',
	},
}
