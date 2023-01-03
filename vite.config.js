import { sveltekit } from '@sveltejs/kit/vite';
import { VitePWA } from 'vite-plugin-pwa';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), VitePWA()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
	css: {
		postcss: true,
	},
};

export default config;
