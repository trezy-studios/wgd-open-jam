/**
 * Maintains an entity's inventory.
 *
 * @param {number} [capacity = 10] The amount of weight the entity can currently store in their inventory.
 * @param {Array} [contents = []] The initial contents of the inventory.
 * @returns {object} The entity's initial inventory.
 */
export function inventory(capacity = 10, contents = []) {
	return {
		inventory: {
			capacity,
			contents,
		},
	}
}
