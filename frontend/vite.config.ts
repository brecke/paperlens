import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	/**
	 * Forward all requests made by our React frontend to `localhost:3000/api`
	 * to our Phoenix backend running at `localhost:4000`.
	 * This is only necessary during development.
	 * In production, our Phoenix and React apps are served from the same
	 * domain and port, which makes this configuration unecessary.
	 */
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:4000',
				secure: false,
				ws: true,
			},
		},
	},
	/**
	 * Using the `webapp` base path for production builds
	 * so we can leverage Phoenix static assets plug to deliver
	 * our React app directly from our final Elixir app,
	 * Serving all files from the `priv/static/webapp` folder.
	 * NOTE: Remember to move the frontend build files to the
	 * `priv` folder during the application build process in CI
	 */
	// @ts-expect-error
	base: process.env.NODE_ENV === 'production' ? '/webapp/' : '/',
});
