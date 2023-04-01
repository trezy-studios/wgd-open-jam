// Module imports
import {
	useEffect,
	useRef,
} from 'react'
import { useStore } from 'statery'





// Local imports
import styles from './GamePage.module.scss'

import { GameUI } from '../GameUI/GameUI.jsx'
import { store } from '../../store/store.js'
import { useGameLoop } from '../../hooks/useGameLoop.js'





/**
 * Renders necessary components for the game.
 *
 * @component
 */
export function GamePage() {
	const { pixiApp } = useStore(store)

	const gameWrapperRef = useRef(null)

	useGameLoop()

	useEffect(() => {
		const gameWrapper = gameWrapperRef.current

		if (gameWrapper && pixiApp) {
			gameWrapper.appendChild(pixiApp.view)
			pixiApp.resizeTo = gameWrapper
		}
	}, [
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
