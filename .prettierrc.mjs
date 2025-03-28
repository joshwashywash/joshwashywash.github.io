/** @type {import("prettier").Config} */
export default {
	plugins: [
		"prettier-plugin-astro",
		"prettier-plugin-svelte",
		"prettier-plugin-tailwindcss",
	],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
		{
			files: "*.svelte",
			options: {
				parser: "svelte",
			},
		},
	],
	singleAttributePerLine: true,
	useTabs: true,
};
