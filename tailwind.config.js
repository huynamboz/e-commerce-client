/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
		"!./components/loading/**/*.vue"
	],
	theme: {
		borderWidth: {
			'0': '0',
			'1': '1px',
		},
		extend: {},
	},
	plugins: [],
}

