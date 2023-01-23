/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,md,mdx,svelte,ts}'],
	theme: {
		container: { center: true },
		extend: {
			colors: {
				base: '#232136',
				surface: '#2a273f',
				overlay: '#393552',
				muted: '#6e6a86',
				subtle: '#908caa',
				text: '#e0def4',
				love: '#eb6f92',
				gold: '#f6c177',
				rose: '#ea9a97',
				pine: '#3e8fb0',
				foam: '#9ccfd8',
				iris: '#c4a7e7',
				highlightLow: '#2a283e',
				highlightMed: '#44415a',
				highlightHigh: '#56526e',
			},
			typography({ theme }) {
				return {
					rose: {
						css: {
							'--tw-prose-body': theme('colors.text'),
							'--tw-prose-bold': theme('colors.text'),
							'--tw-prose-bullets': theme('colors.subtle'),
							'--tw-prose-captions': theme('colors.text'),
							'--tw-prose-code': theme('colors.love'),
							'--tw-prose-counters': theme('colors.subtle'),
							'--tw-prose-headings': theme('colors.text'),
							'--tw-prose-hr': theme('colors.muted'),
							'--tw-prose-lead': theme('colors.iris'),
							'--tw-prose-links': theme('colors.pine'),
							'--tw-prose-pre-bg': theme('colors.surface'),
							'--tw-prose-pre-code': theme('colors.love'),
							'--tw-prose-quote-borders': theme('colors.love'),
							'--tw-prose-quotes': theme('colors.text'),
							'--tw-prose-td-borders': theme('colors.rose'),
							'--tw-prose-th-borders': theme('colors.love'),
						},
					},
				};
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
