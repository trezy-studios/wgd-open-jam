import {
	createCollider,
	createDynamicBody,
} from '../physics'

/**
 * Describes an entity's collision body.
 *
 * @param {number} [x] The entity's initial X position.
 * @param {number} [y] The entity's initial X position.
 * @param {string} [shape] The entity's collision shape (circle or rectangle).
 * @param {number} [radius] The entity's collider's radius (pixels). Only needed if circle.
 * @param {number} [width] The entity's collider's width (pixels). Only needed if rectangle.
 * @param {number} [height] The entity's collider's height (pixels). Only needed if rectangle.
 * @returns {object} The entity's initial position.
 */
export function collisionBody(x, y, shape, radius = 0, width = 0, height = 0) {
	const body = createDynamicBody(x, y)
	const collider = createCollider(shape, {
		radius,
		width,
		height,
	}, body)

	return {
		collisionBody: {
			shape,
			radius,
			width,
			height,
			body,
			collider,
		},
	}
}
