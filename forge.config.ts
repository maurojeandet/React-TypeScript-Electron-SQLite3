import type { ForgeConfig } from '@electron-forge/shared-types'
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives'
import { WebpackPlugin } from '@electron-forge/plugin-webpack'

import { mainConfig } from './webpack.main.config'
import { rendererConfig } from './webpack.renderer.config'

const config: ForgeConfig = {
	packagerConfig: {
		asar: true,
	},
	rebuildConfig: {},
	makers: [
		{
			name: '@electron-forge/maker-squirrel',
			config: {
				authors: 'Mauro Jeandet',
				description: 'Desktop app with Electron and React',
				certificateFile: './cert.pfx',
				certificatePassword: process.env.CERTIFICATE_PASSWORD
			}
		}
	],
	plugins: [
		new AutoUnpackNativesPlugin({}),
		new WebpackPlugin({
			mainConfig,
			renderer: {
				config: rendererConfig,
				entryPoints: [
					{
						html: './src/forge/index.html',
						js: './src/forge/renderer.ts',
						name: 'main_window',
						preload: {
							js: './src/forge/preload.ts',
						},
					},
				],
			},
		}),
	],
}

export default config
