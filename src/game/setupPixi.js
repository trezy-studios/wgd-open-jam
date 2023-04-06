// Module imports
import {
	Application,
	BaseTexture,
	extensions,
	SCALE_MODES,
	settings,
} from 'pixi.js'





// Local imports
import { store } from '../store/store.js'
import { TMXLoader } from '../pixi-tmx-loader/TMXLoader.js'
import { TSXLoader } from '../pixi-tmx-loader/TSXLoader.js'





/**
 * Initialises the Pixi app and any extensions.
 */
export function setupPixi() {
	let { pixiApp } = store.state

	if (!pixiApp) {
		// Render pixel art properly.
		BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST

		// Set options for pixi-tilemap.
		settings.TEXTILE_UNITS = 4
		settings.TEXTURES_PER_TILEMAP = 4
		settings.use32bitIndex = true

		extensions.add(TMXLoader)
		extensions.add(TSXLoader)

		// Create the Pixi app.
		pixiApp = new Application({
			antialias: false,
			autoDensity: true,
			resolution: window.devicePixelRatio || 1,
		})

		// Scale the stage up 4x.
		pixiApp.stage.setTransform(
			0,
			0,
			4,
			4,
			0,
			0,
			0,
			0,
			0,
		)

		// Add the Pixi app to the store so it's globally accessible.
		store.set(() => ({ pixiApp }))
	}
}
