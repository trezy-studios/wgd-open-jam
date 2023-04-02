// Local imports
import { cameraSystem } from './systems/cameraSystem.js'
import { controllerSystem } from './systems/controllerSystem.js'
import { initialisationSystem } from './systems/initialisationSystem.js'
import { moveSystem } from './systems/moveSystem.js'
import { renderSystem } from './systems/renderSystem.js'
import { sortSystem } from './systems/sortSystem.js'
import { store } from '../store/store.js'





/**
 * Updates the game logic and renders the camera.
 *
 * @returns {boolean} Whether the loop executed successfully.
 */
export function gameLoop() {
	const { isPaused } = store.state

	if (isPaused) {
		return true
	}

	initialisationSystem()
	controllerSystem()
	moveSystem()
	sortSystem()
	cameraSystem()
	renderSystem()

	return true
}
