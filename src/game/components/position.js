/**
 * Maintains an entity's position in world space.
 *
 * @param {number} [x = 0] The entity's initial position on the horizontal axis.
 * @param {number} [y = 0] The entity's initial position on the vertical axis.
 * @returns {object} The entity's initial position.
 */
export function position(x = 0, y = 0) {
	return {
		position: {
			x,
			y,
		},
	}
}
