// Module imports
import {
	schedule,
	unschedule,
} from 'rafael'
import { useLayoutEffect } from 'react'
import { useStore } from 'statery'





// Local imports
import { gameLoop } from '../game/gameLoop.js'
import { loadGameAssets } from '../game/loadGameAssets.js'
import { loadRapier } from '../game/loadRapier.js'
import { setupPixi } from '../game/setupPixi.js'
import { store } from '../store/store.js'





/**
 * Schedules the game loop to run on mount and unschedules it on unmount.
 */
export function useGameLoop() {
	const {
		areAssetsLoaded,
		pixiApp,
		physicsWorld,
	} = useStore(store)

	useLayoutEffect(() => {
		if (!pixiApp) {
			setupPixi()
		} else if (!areAssetsLoaded) {
			loadGameAssets()
		} else if (!physicsWorld) {
			loadRapier()
		} else {
			schedule(gameLoop, { id: 'game loop' })

			return () => unschedule('game loop')
		}
	}, [
		areAssetsLoaded,
		pixiApp,
		physicsWorld,
	])
}
