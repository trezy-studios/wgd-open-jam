// Module imports
import { useStore } from 'statery'





// Local imports
import styles from './GameUI.module.scss'

import { InventoryManager } from '../InventoryManager/InventoryManager.jsx'
import { store } from '../../store/store.js'





/**
 * Renders the game's UI.
 *
 * @component
 */
export function GameUI() {
	const { player } = useStore(store)

	if (!player) {
		return null
	}

	return (
		<div className={styles['game-ui-wrapper']}>
			<InventoryManager />
		</div>
	)
}
