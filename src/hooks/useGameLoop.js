// Module imports
import {
	schedule,
	unschedule,
} from 'rafael'
import { useLayoutEffect } from 'react'





// Local imports
import { gameLoop } from '../game/gameLoop.js'





/**
 * Schedules the game loop to run on mount and unschedules it on unmount.
 */
export function useGameLoop() {
	useLayoutEffect(() => {
		schedule(gameLoop, { id: 'game loop' })

		return () => unschedule('game loop')
	}, [])
}
