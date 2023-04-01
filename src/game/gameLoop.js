// Module imports
import { Application } from 'pixi.js'
import { World } from 'miniplex'





// Local imports
import { createPlayerEntity } from './entities/createPlayerEntity.js'
import { store } from '../store/store.js'





/**
 * Updates the game logic and renders the camera.
 *
 * @returns {boolean} Whether the loop executed successfully.
 */
export function gameLoop() {
	const { isPaused } = store.state

	let {
		pixiApp,
		player,
		world,
	} = store.state

	if (isPaused) {
		return true
	}

	if (!pixiApp) {
		pixiApp = new Application
		store.set(() => ({ pixiApp }))
	}

	if (!world) {
		world = new World
		store.set(() => ({ world }))
	}

	if (!player) {
		player = createPlayerEntity()
		store.set(() => ({ player }))
	}

	return true
}
