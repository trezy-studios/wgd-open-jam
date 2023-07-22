// Local imports
import { cameraSystem } from './systems/cameraSystem.js'
import { collisionBodySystem } from './systems/collisionBodySystem.js'
import { controllerSystem } from './systems/controllerSystem.js'
import { initialisationSystem } from './systems/initialisationSystem.js'
import { moveSystem } from './systems/moveSystem.js'
import { renderPhysicsDebug } from './physics/index.js'
import { renderSystem } from './systems/renderSystem.js'
import { sortSystem } from './systems/sortSystem.js'
import { store } from '../store/store.js'





/**
 * Updates the game logic and renders the camera.
 *
 * @returns {boolean} Whether the loop executed successfully.
 */
export function gameLoop() {
	const {
		isPaused,
		physicsWorld,
		physicsEvents,
	} = store.state

	if (isPaused) {
		return true
	}

	initialisationSystem()
	controllerSystem()
	collisionBodySystem()
	moveSystem()
	sortSystem()
	cameraSystem()
	renderSystem()

	physicsWorld.step(physicsEvents)

	physicsEvents.drainContactForceEvents(evt => {
		console.log('Contact Event', evt)
	})

	physicsEvents.drainCollisionEvents((collider1, collider2, started) => {
		console.log('Collision Event', collider1, collider2, started)
	})

	renderPhysicsDebug(physicsWorld)

	return true
}
