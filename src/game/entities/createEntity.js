// Local imports
import { position } from '../components/position.js'
import { store } from '../../store/store.js'





/**
 * Creates a new entity representing.
 *
 * @param {number} x The entity's initial X position.
 * @param {number} y The entity's initial X position.
 * @param {object} components Additional components to be attached to the created entity.
 * @returns {object} The new entity.
 */
export function createEntity(x, y, components = {}) {
	const { world } = store.state

	return world.add({
		...position(x, y),
		...components,
	})
}
