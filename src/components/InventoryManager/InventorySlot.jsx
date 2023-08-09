// Module imports
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useDrop } from 'react-dnd'
import { useStore } from 'statery'





// Local imports
import styles from './InventoryManager.module.scss'

import { store } from '../../store/store.js'
import { useMemo } from 'react'





/**
 * Renders a slot in the player's inventory.
 *
 * @component
 * @param {object} props All props.
 */
export function InventorySlot(props) {
	const {
		children,
		slotIndex,
	} = props

	const { player } = useStore(store)

	const [{ isHovered }, drop] = useDrop(
		() => ({
			accept: 'InventoryItem',

			// eslint-disable-next-line jsdoc/require-jsdoc
			collect(monitor) {
				/**
				 * @type {object}
				 * @property {number} currentSlot The current slot of the dragged item.
				 */
				const item = monitor.getItem()

				return {
					isHovered: Boolean(monitor.isOver()) && ((item ?? {}).currentSlot !== slotIndex),
					sourceSlot: (item || {}).currentSlot,
				}
			},

			/**
			 * @param {object} dropProps Properties of the drop event.
			 * @param {number} dropProps.currentSlot The slot that the item is currently occupying.
			 * @param {import('../../game/structures/Item.js').Item} dropProps.item The item to be moved.
			 */
			drop(dropProps) {
				const {
					currentSlot,
					item,
				} = dropProps

				player.inventory.moveItem(item, currentSlot, slotIndex)
			},
		}),
		[slotIndex],
	)

	const compiledClassName = useMemo(() => {
		return classnames({
			[styles['is-drop-target']]: isHovered,
			[styles['slot']]: true,
		})
	}, [isHovered])

	return (
		<div
			ref={drop}
			className={compiledClassName}>
			{children}
		</div>
	)
}

InventorySlot.defaultProps = {
	children: null,
}

InventorySlot.propTypes = {
	children: PropTypes.node,
	slotIndex: PropTypes.number.isRequired,
}
