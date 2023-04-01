// Local imports
import { inventory } from '../components/inventory.js'
import { isRenderable } from '../components/isRenderable.js'
import { position } from '../components/position.js'
import { size } from '../components/size.js'
import { store } from '../../store/store.js'
import { velocity } from '../components/velocity.js'





/**
 * Creates a new entity representing an actor.
 *
 * @returns {object} The new entity.
 */
export function createActorEntity() {
	const { world } = store.state

	const actor = world.add({
		...inventory(),
		...isRenderable(),
		...position(),
		...size(),
		...velocity(),
	})

	return actor
}
