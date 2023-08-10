/**
 * Maintains an entity's size.
 *
 * @param {number} [width] The entity's initial width.
 * @param {number} [height] The entity's initial height.
 * @returns {object} The entity's initial size.
 */
export function size(width = 0, height = 0) {
	return {
		size: {
			height,
			width,
		},
	}
}
