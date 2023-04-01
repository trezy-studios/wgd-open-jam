// Module imports
import {
	schedule,
	unschedule,
} from 'rafael'
import { useEffect } from 'react'





// Local imports
import { gameLoop } from '../game/gameLoop.js'





export function useGameLoop() {
	useEffect(() => {
		schedule(gameLoop, { id: 'game loop' })

		return () => unschedule('game loop')
	}, [])
}
