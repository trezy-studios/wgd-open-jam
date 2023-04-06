import {
	createCollider,
	createDynamicBody,
	PIXELS_PER_METER,
} from '../physics'

/**
 * Describes an entity's collision body.
 *
 * @param {number} [x] The entity's initial X position.
 * @param {number} [y] The entity's initial X position.
 * @param {string} [shape] The entity's collision shape (circle or rectangle).
 * @param {number} [radius = 0] The entity's collider's radius (pixels). Only needed if circle.
 * @param {number} [width = 0] The entity's collider's width (pixels). Only needed if rectangle.
 * @param {number} [height = 0] The entity's collider's height (pixels). Only needed if rectangle.
 * @returns {object} The entity's initial position.
 */
export function collisionBody(x, y, shape, radius, width, height) {
	const body = createDynamicBody(x / PIXELS_PER_METER, y / PIXELS_PER_METER)
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
