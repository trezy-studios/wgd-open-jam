// Local imports
import { collisionBody } from '../components/collisionBody.js'
import { createEntity } from './createEntity.js'
import { inventory } from '../components/inventory.js'
import { isRenderable } from '../components/isRenderable.js'
import { position } from '../components/position.js'
import { size } from '../components/size.js'
import { velocity } from '../components/velocity.js'





/**
 * Creates a new entity representing an actor.
 *
 * @param {number} x The entity's initial X position.
 * @param {number} y The entity's initial X position.
 * @param {object} components Additional components to be attached to the created entity.
 * @returns {object} The new entity.
 */
export function createActorEntity(x, y, components = {}) {
	return createEntity(x, y, {
		// TODO: Figure out how to make these sizing of the collision body dynamic
		...collisionBody(x, y, 'rectangle', null, 8, 8),
		...inventory(),
		...isRenderable(),
		...position(x, y),
		...size(),
		...velocity(),
		...components,
	})
}
