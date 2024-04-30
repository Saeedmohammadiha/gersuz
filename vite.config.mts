import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			jsxImportSource: '@emotion/react'
		}),
		tsconfigPaths({
			parseNative: false
		}),
		svgrPlugin(),
		{
			name: 'custom-hmr-control',
			handleHotUpdate({ file, server }) {
				if (file.includes('src/app/configs/')) {
					server.ws.send({
						type: 'full-reload'
					});
					return [];
				}
				return;
			}
		},
		ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') })
	],
	build: {
		outDir: 'dist',
		commonjsOptions: {
			include: [
				/ckeditor5/,
				/ckeditor5-custom-build/,
				/node_modules/
			]
		}
	},
	server: {
		open: true,
		port: 3000
	},
	define: {
		global: 'window'
	},
	resolve: {
		alias: {
			'@': '/src',
			'@fuse': '/src/@fuse',
			'@history': '/src/@history',
			'@lodash': '/src/@lodash',
			'@mock-api': '/src/@mock-api',
			'@schema': '/src/@schema',
			'app/store': '/src/app/store',
			'app/shared-components': '/src/app/shared-components',
			'app/configs': '/src/app/configs',
			'app/theme-layouts': '/src/app/theme-layouts',
			'app/AppContext': '/src/app/AppContext'
		}
	},
	optimizeDeps: {
		include: [
			'@mui/icons-material',
			'@mui/material',
			'@mui/base',
			'@mui/styles',
			'@mui/system',
			'@mui/utils',
			'@emotion/cache',
			'@emotion/react',
			'@emotion/styled',
			'lodash',
			'ckeditor5',
			'ckeditor5-custom-build'
		],
		exclude: [],
		esbuildOptions: {
			loader: {
				'.js': 'jsx'
			}
		}
	}
});
