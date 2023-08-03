/**
 * Maintains an entity's inventory.
 *
 * @param {number} [config] Initial inventory configuration.
 * @param {number} [config.capacity = 10] The amount of weight the entity can currently store in their inventory.
 * @param {Array} [config.contents = []] The initial contents of the inventory.
 * @returns {object} The entity's initial inventory.
 */
export function inventoryComponent(config = {}) {
	const result = {
		inventory: {
			capacity: config.capacity ?? 8,
			contents: config.contents,

			/**
			 * Adds an item to this inventory.
			 *
			 * @param {object} item The item to be added.
			 * @param {number} [slot] The slot to place the item in. If not set, item will be placed in the next empty slot.
			 * @returns {boolean} Whether the item was added successfully.
			 */
			addItem(item, slot = 0) {
				const {
					capacity,
					contents,
				} = this

				let slotToCheck = slot
				let success = false

				while (slotToCheck < capacity) {
					if (contents[slotToCheck] === null) {
						this.contents = [...this.contents]
						this.contents[slotToCheck] = item
						success = true
						break
					}

					slotToCheck += 1
				}

				return success
			},
		},
	}

	let slotIndex = 0
	while (slotIndex < result.inventory.capacity) {
		result.inventory.contents[slotIndex] = config.contents[slotIndex] ?? null
		slotIndex += 1
	}

	return result
}
