// Local imports
import styles from './GamePage.module.scss'

import { GameUI } from '../GameUI/GameUI.jsx'
import { useGameLoop } from '../../hooks/useGameLoop.js'





/**
 * Renders necessary components for the game.
 *
 * @component
 */
export function GamePage() {
	useGameLoop()

	return (
		<div className={styles['game-wrapper']}>
			<GameUI />

			<canvas id={'game'} />
		</div>
	)
}
