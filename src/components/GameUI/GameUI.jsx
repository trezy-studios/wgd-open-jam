// Local imports
import styles from './GameUI.module.scss'

import { InventoryManager } from '../InventoryManager/InventoryManager.jsx'





/**
 * Renders the game's UI.
 *
 * @component
 */
export function GameUI() {
	return (
		<div className={styles['game-ui-wrapper']}>
			<InventoryManager />
		</div>
	)
}
