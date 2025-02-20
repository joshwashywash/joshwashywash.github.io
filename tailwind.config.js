import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	plugins: [typography],
	theme: {
		extend: {
			typography: (theme) => {
				return {
					DEFAULT: {
						css: {
							a: {
								"&:hover": {
									color: theme("colors.neutral.500"),
								},
							},
						},
					},
				};
			},
		},
	},
};
