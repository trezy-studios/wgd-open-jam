// Local imports
import { collisionBody } from '../components/collisionBody.js'
import { createEntity } from './createEntity.js'
import { inventoryComponent } from '../components/inventoryComponent.js'
import { isRenderable } from '../components/isRenderable.js'
import { position } from '../components/position.js'
import { size } from '../components/size.js'
import { velocity } from '../components/velocity.js'





/**
 * Creates a new entity representing an actor.
 *
 * @param {object} config Configuration for the entity.
 * @param {object} config.components Additional components to be attached to the created entity.
 * @param {number} config.inventory The entity's initial inventory.
 * @param {number} config.x The entity's initial X position.
 * @param {number} config.y The entity's initial X position.
 * @returns {object} The new entity.
 */
export function createActorEntity(config = {}) {
	const {
		components = {},
		inventory,
		x,
		y,
	} = config

	return createEntity(x, y, {
		// TODO: Figure out how to make these sizing of the collision body dynamic
		...collisionBody(x, y, 'rectangle', null, 8, 8),
		...inventoryComponent(inventory),
		...isRenderable(),
		...position(x, y),
		...size(),
		...velocity(),
		...components,
	})
}
