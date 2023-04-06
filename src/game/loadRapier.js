// Module imports
import RAPIER from '@dimforge/rapier2d-compat'





// Local imports
import { store } from '../store/store.js'





/**
 * Handles loading all initial game assets.
 */
export async function loadRapier() {
	await RAPIER.init()
	store.set({
		physicsWorld: new RAPIER.World({
			x: 0,
			y: 0,
		}),
		physicsEvents: new RAPIER.EventQueue(true),
	})
}
