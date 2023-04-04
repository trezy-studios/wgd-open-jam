// Module imports
import {
	useEffect,
	useRef,
} from 'react'
import { useStore } from 'statery'





// Local imports
import styles from './Game.module.scss'

import { GameUI } from '../GameUI/GameUI.jsx'
import { store } from '../../store/store.js'
import { useGameLoop } from '../../hooks/useGameLoop.js'





/**
 * Wrapper component for the game.
 *
 * @component
 */
export function Game() {
	const {
		areAssetsLoaded,
		pixiApp,
	} = useStore(store)

	const gameWrapperRef = useRef(null)

	useGameLoop()

	useEffect(() => {
		if (!areAssetsLoaded) {
			return
		}

		const gameWrapper = gameWrapperRef.current

		if (!gameWrapper || !pixiApp) {
			return
		}

		gameWrapper.appendChild(pixiApp.view)
		pixiApp.resizeTo = gameWrapper
	}, [
		areAssetsLoaded,
		gameWrapperRef,
		pixiApp,
	])

	return (
		<>
			<div
				ref={gameWrapperRef}
				className={styles['game-wrapper']} />

			<GameUI />
		</>
	)
}
