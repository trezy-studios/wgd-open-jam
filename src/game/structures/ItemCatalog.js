export const ITEM_TYPES = {
	WEAPON: 'weapon',
}

export const CATALOG = {
	axe: {
		name: 'Axe',
		sprite: {
			height: 8,
			url: '/sprites/items/weapons1.png',
			width: 8,
			x: 224,
			y: 24,
		},
		type: ITEM_TYPES.WEAPON,
	},
	sword: {
		name: 'Sword',
		sprite: {
			height: 8,
			url: '/sprites/items/weapons1.png',
			width: 8,
			x: 136,
			y: 24,
		},
		type: ITEM_TYPES.WEAPON,
	},
}

/**
 * An ItemCatalog.
 */
class ItemCatalogClass {
	/**
	 * Retrieves metadata for an item from the catalog.
	 *
	 * @param {string} id The unique ID of the item.
	 * @returns {object | null} Metadata for the requested item, or null if the item isn't found.
	 */
	getItem(id) {
		return CATALOG[id] ?? null
	}
}

/**
 * A catalog of all items in the game.
 */
export const ItemCatalog = new ItemCatalogClass
