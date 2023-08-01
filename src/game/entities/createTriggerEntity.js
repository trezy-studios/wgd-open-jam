// Local imports
import { createEntity } from './createEntity.js'
import { sensorComponent } from '../components/sensorComponent.js'





/**
 * Creates a new entity representing a trigger.
 *
 * @param {number} entity The trigger entity.
 * @param {object} components Additional components to be attached to the created entity.
 * @returns {object} The new entity.
 */
export function createTriggerEntity(entity, components = {}) {
	const {
		height,
		position,
		width,
	} = entity

	return createEntity(position.x, position.y, {
		...sensorComponent({
			height: height,
			width: width,
			x: position.x,
			y: position.y,
		}),
		...components,
	})
}
