// Module imports
import { World } from 'miniplex'





// Local imports
import { createCameraEntity } from '../entities/createCameraEntity.js'
import { createController } from '../../helpers/createController.js'
import { createPlayerEntity } from '../entities/createPlayerEntity.js'
import { initialiseMap } from '../../helpers/initialiseMap.js'
import { store } from '../../store/store.js'





/** Ensures everything required for the game to run has been initialised. */
export function initialisationSystem() {
	const {
		camera,
		controller,
		map,
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

	if (!map) {
		initialiseMap()
	}

	if (!player) {
		store.set(() => ({ player: createPlayerEntity() }))
	}
}
