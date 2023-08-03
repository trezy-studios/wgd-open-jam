// Local imports
import styles from './InventoryManager.module.scss'

import { Overlay } from '../Overlay/Overlay.jsx'
import { store } from '../../store/store.js'
import { useStore } from 'statery'





/**
 * Renders the player's inventory manager.
 *
 * @component
 */
export function InventoryManager() {
	const { isInventoryManagerOpen } = useStore(store)

	return (
		<Overlay isVisible={isInventoryManagerOpen}>
			<div className={styles['inventory-manager']}>
				{String(isInventoryManagerOpen)}
			</div>
		</Overlay>
	)
}
