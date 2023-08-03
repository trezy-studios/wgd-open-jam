// Local imports
import { createEntity } from './createEntity.js'
import { sensorComponent } from '../components/sensorComponent.js'
import { store } from '../../store/store.js'





/**
 * Creates a new entity representing a trigger.
 *
 * @param {number} mapEntity The trigger entity.
 * @param {object} components Additional components to be attached to the created entity.
 * @returns {object} The new entity.
 */
export function createTriggerEntity(mapEntity, level, components = {}) {
	const {
		height,
		position,
		width,
	} = mapEntity
	} = entity

	const entity = createEntity(position.x, position.y, {
		...sensorComponent({
			height: height,
			width: width,
			x: position.x + level.worldPosition.x,
			y: position.y + level.worldPosition.y,
		}),
		triggerData: {
			teleportDestination: mapEntity.TeleportDestination,
			triggerAction: mapEntity.TriggerAction,
			triggerCondition: mapEntity.TriggerCondition,
		},
		...components,
	})

	return entity
}
