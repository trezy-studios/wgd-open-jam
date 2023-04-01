// Module imports
import { Application } from 'pixi.js'
import { createController } from '../../helpers/createController.js'
import { World } from 'miniplex'





// Local imports
import { createPlayerEntity } from '../entities/createPlayerEntity.js'
import { store } from '../../store/store.js'





/** Ensures everything required for the game to run has been initialised. */
export function initialisationSystem() {
	const {
		controller,
		pixiApp,
		player,
		world,
	} = store.state

	if (!controller) {
		store.set(() => ({ controller: createController() }))
	}

	if (!pixiApp) {
		store.set(() => ({ pixiApp: new Application }))
	}

	if (!world) {
		store.set(() => ({ world: new World }))
	}

	if (!player) {
		store.set(() => ({ player: createPlayerEntity() }))
	}
}
