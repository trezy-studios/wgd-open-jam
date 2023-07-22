// Module imports
import { World } from 'miniplex'





// Local imports
import { createCameraEntity } from '../entities/createCameraEntity.js'
import { createCollider } from '../physics/createCollider.js'
import { createController } from '../../helpers/createController.js'
import { createPlayerEntity } from '../entities/createPlayerEntity.js'
import { createStaticBody } from '../physics/createRigidBody.js'
import { initialiseMap } from '../initialiseMap.js'
import { store } from '../../store/store.js'





let testColliderExists = null





/** Ensures everything required for the game to run has been initialised. */
export function initialisationSystem() {
	const {
		camera,
		controller,
		isMapInitialised,
		player,
		world,
	} = store.state

	if (!controller) {
		store.set(() => ({ controller: createController() }))
	}

	if (!world) {
		store.set(() => ({ world: new World }))
	}

	if (!camera) {
		store.set(() => ({ camera: createCameraEntity() }))
	}

	if (!isMapInitialised) {
		initialiseMap()
	}

	if (!player) {
		const newPlayer = createPlayerEntity(50 * 8 * 8, 94 * 8 * 8)
		store.set(() => ({ player: newPlayer }))
	}

	if (!testColliderExists) {
		// Create a test static body
		const testBody = createStaticBody(50 * 8, 90 * 8)
		createCollider('rectangle', {
			width: 32,
			height: 32,
		}, testBody)

		testColliderExists = true
	}
}
