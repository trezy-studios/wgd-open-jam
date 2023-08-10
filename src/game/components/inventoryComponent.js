// Local imports
import { Inventory } from '../structures/Inventory.js'





/**
 * Maintains an entity's inventory.
 *
 * @param {object} [config] Initial inventory configuration.
 * @param {number} [config.capacity] The amount of weight the entity can currently store in their inventory.
 * @param {object} [config.contents] The initial contents of the inventory.
 * @returns {object} The entity's initial inventory.
 */
export function inventoryComponent(config = {}) {
	return { inventory: new Inventory(config) }
}
