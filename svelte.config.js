import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import dotenv from 'dotenv';
dotenv.config();

const dev = process.env.VITE_NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess()],
	
	kit: {
		adapter: adapter({
			pages: 'build',   // Output directory
			assets: 'build',
			fallback: 'index.html',  // Required for SPA routing
        }),
		paths: {
			base: dev ? '' : '/the-meditation-game',
		}
	}
};
export default config;