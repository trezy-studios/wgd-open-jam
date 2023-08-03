/**
 * Maintains an entity's inventory.
 *
 * @param {number} [config] Initial inventory configuration.
 * @param {number} [config.capacity = 10] The amount of weight the entity can currently store in their inventory.
 * @param {Array} [config.contents = []] The initial contents of the inventory.
 * @returns {object} The entity's initial inventory.
 */
export function inventoryComponent(config = {}) {
	const {
		capacity = 10,
		contents = [],
	} = config

	return {
		inventory: {
			capacity,
			contents,
		},
	}
}
