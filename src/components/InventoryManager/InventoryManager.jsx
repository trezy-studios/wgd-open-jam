// Module imports
import {
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react'





// Local imports
import styles from './InventoryManager.module.scss'

import { InventoryItem } from './InventoryItem.jsx'
import { InventorySlot } from './InventorySlot.jsx'
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

	const [shouldUpdate, setShouldUpdate] = useState(null)

	const forceUpdate = useCallback(() => setShouldUpdate({}), [setShouldUpdate])

	const contentsGrid = useMemo(() => {
		const slots = []

		while (slots.length < player.inventory.capacity) {
			const slotIndex = slots.length
			const item = player.inventory.getItem(slotIndex)
			let slotContents = null

			if (item) {
				slotContents = (
					<InventoryItem
						currentSlot={slotIndex}
						item={item} />
				)
			}

			slots.push((
				<InventorySlot
					key={slotIndex}
					slotIndex={slotIndex}>
					{slotContents}
				</InventorySlot>
			))
		}

		return slots
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		player,
		shouldUpdate,
	])

	useEffect(() => {
		const { inventory } = player

		inventory.on('item added', forceUpdate)
		inventory.on('items moved', forceUpdate)
		inventory.on('item removed', forceUpdate)

		return () => {
			inventory.off('item added', forceUpdate)
			inventory.off('items moved', forceUpdate)
			inventory.off('item removed', forceUpdate)
		}
	}, [
		forceUpdate,
		player,
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
