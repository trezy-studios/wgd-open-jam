// Module imports
import { createController } from '../../helpers/createController.js'
import { World } from 'miniplex'





// Local imports
import { createPlayerEntity } from '../entities/createPlayerEntity.js'
import { store } from '../../store/store.js'





/** Ensures everything required for the game to run has been initialised. */
export function initialisationSystem() {
	const {
		controller,
		player,
		world,
	} = store.state

	if (!controller) {
		store.set(() => ({ controller: createController() }))
	}

	if (!world) {
		store.set(() => ({ world: new World }))
	}

	if (!player) {
		store.set(() => ({ player: createPlayerEntity() }))
	}
}
