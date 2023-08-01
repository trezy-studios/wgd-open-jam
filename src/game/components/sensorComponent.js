// Local imports
import { createCollider } from '../physics/index.js'





/**
 * Flags a container for rendering the entity's sprites.
 *
 * @param {object} config All configuration.
 * @returns {object} The entity's sprite container state.
 */
export function sensorComponent(config) {
	const {
		height,
		shape = 'rectangle',
		width,
		x,
		y,
	} = config

	return {
		collider: createCollider(shape, {
			height,
			width,
			x,
			y,
		}),
	}
}
