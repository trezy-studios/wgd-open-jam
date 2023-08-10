// Module imports
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useDrag } from 'react-dnd'





// Local imports
import styles from './InventoryManager.module.scss'

import { Item } from '../../game/structures/Item.js'
import { Sprite } from '../Sprite/Sprite.jsx'
import { useMemo } from 'react'





/**
 * Renders an item in the player's inventory.
 *
 * @component
 * @param {object} props All props.
 */
export function InventoryItem(props) {
	const {
		currentSlot,
		item,
	} = props

	const [{ isDragging }, drag] = useDrag(() => ({
		item: {
			currentSlot,
			item,
		},
		type: 'InventoryItem',

		// eslint-disable-next-line jsdoc/require-jsdoc
		collect(monitor) {
			return { isDragging: Boolean(monitor.isDragging()) }
		},
	}))

	const compiledClassName = useMemo(() => {
		return classnames({
			[styles['is-dragging']]: isDragging,
			[styles['item']]: true,
		})
	}, [isDragging])

	return (
		<div
			ref={drag}
			className={compiledClassName}>
			<Sprite {...item.sprite} />
		</div>
	)
}

InventoryItem.defaultProps = {
	item: null,
}

InventoryItem.propTypes = {
	currentSlot: PropTypes.number.isRequired,
	item: PropTypes.instanceOf(Item),
}
