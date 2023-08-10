/**
 * Maintains an entity's velocity.
 *
 * @param {number} [speed] The entity's initial velocity on the horizontal axis.
 * @param {number} [x] The entity's initial velocity on the horizontal axis.
 * @param {number} [y] The entity's initial velocity on the vertical axis.
 * @returns {object} The entity's initial velocity.
 */
export function velocity(speed = 0, x = 0, y = 0) {
	return {
		velocity: {
			speed,
			x,
			y,
		},
	}
}
