// Local imports
import { ItemCatalog } from './ItemCatalog.js'





/**
 * @typedef {object} ItemConfig
 * @property {string} name The name of the item.
 */

/**
 * An item.
 */
export class Item {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	#metadata





	/****************************************************************************\
	 * Constructor
	\****************************************************************************/

	/**
	 * Creates a new item.
	 *
	 * @param {string} id The ID of the item in the catalog.
	 */
	constructor(id) {
		this.#metadata = ItemCatalog.getItem(id)
	}





	/****************************************************************************\
	 * Public instances getters/setters
	\****************************************************************************/

	/** @returns {string} The item's image URL. */
	get sprite() {
		return this.#metadata.sprite
	}

	/** @returns {string} The item's name. */
	get name() {
		return this.#metadata.name
	}
}
