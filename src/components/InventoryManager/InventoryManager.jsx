// Module imports
import { useMemo } from 'react'





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
	const {
		isInventoryManagerOpen,
		player,
	} = useStore(store)

	const contentsGrid = useMemo(() => {
		const slots = []

		if (player) {
			while (slots.length < player.inventory.capacity) {
				const cellIndex = slots.length
				const item = player.inventory.contents[cellIndex]
				let slotContents = null

				if (item) {
					slotContents = (
						<div className={styles['item']}>
							{item.name}
						</div>
					)
				}

				slots.push((
					<div
						key={cellIndex}
						className={styles['slot']}>
						{slotContents}
					</div>
				))
			}

			return slots
		}

		return slots
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		player,
		player?.inventory.capacity,
		player?.inventory.contents,
	])

	return (
		<Overlay isVisible={isInventoryManagerOpen}>
			<div className={styles['inventory-manager']}>
				<h2>{'Inventory'}</h2>

				<div className={styles['contents']}>
					{contentsGrid}
				</div>
			</div>
		</Overlay>
	)
}
