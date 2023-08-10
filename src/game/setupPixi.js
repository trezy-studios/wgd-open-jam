// Module imports
import {
	Application,
	BaseTexture,
	extensions,
	SCALE_MODES,
} from 'pixi.js'





// Local imports
import { LDTKLoader } from '../pixi-ldtk-loader'
import { store } from '../store/store.js'





/**
 * Initialises the Pixi app and any extensions.
 */
export function setupPixi() {
	let { pixiApp } = store.state

	if (!pixiApp) {
		// Render pixel art properly.
		BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST

		extensions.add(LDTKLoader)

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
