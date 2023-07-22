// Module imports
import { World } from 'miniplex'





// Local imports
import { createCameraEntity } from '../entities/createCameraEntity.js'
import { createController } from '../../helpers/createController.js'
import { createPlayerEntity } from '../entities/createPlayerEntity.js'
import { initialiseMap } from '../initialiseMap.js'
import { store } from '../../store/store.js'





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
		// TODO: Figure out why the fuck this is a thing.
		const newPlayer = createPlayerEntity(
			50 * 8 * 8,
			94 * 8 * 8,
		)
		store.set(() => ({ player: newPlayer }))
	}
}
