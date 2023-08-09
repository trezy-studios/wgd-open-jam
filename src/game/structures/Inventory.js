// Local imports
import { EventEmitter } from './EventEmitter.js'





/**
 * @typedef {object} InventoryConfig
 * @property {number} [capacity] The number of slots available in this inventory.
 * @property {{ [key: string]: object }} [contents] The number of slots available in this inventory.
 */

/**
 * An inventory for an entity.
 */
export class Inventory extends EventEmitter {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	#capacity = 8

	#contents = {}





	/****************************************************************************\
	 * Constructor
	\****************************************************************************/

	/**
	 * Creates a new inventory.
	 *
	 * @param {InventoryConfig} [config] All inventory configuration.
	 */
	constructor(config = {}) {
		super()

		if (config.capacity) {
			this.setCapacity(config.capacity)
		}

		if (config.contents) {
			Object.entries(config.contents).forEach(([key, value]) => {
				this.#contents[key] = value ?? null
			})
		}
	}





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	/**
	 * Adds an item.
	 *
	 * @param {object} item The item to be added.
	 * @param {number} [destinationSlot] The slot to place the item in. If not set, item will be placed in the next empty slot.
	 * @fires InventoryItemAdded
	 * @returns {boolean} Whether the item was added successfully.
	 */
	addItem(item, destinationSlot = 0) {
		let slotToCheck = destinationSlot ?? 0
		let success = false

		while (slotToCheck < this.#capacity) {
			if (this.#contents[slotToCheck] === null) {
				this.#contents[slotToCheck] = item
				success = true
				break
			}

			if (typeof destinationSlot !== 'undefined') {
				break
			}

			slotToCheck += 1
		}

		if (success) {
			/**
			 * Item added event.
			 *
			 * @event InventoryItemAdded
			 * @type {object}
			 * @property {import('./Item.js').Item} item The item that was added.
			 */
			this.emit('item added', {
				item,
				slot: slotToCheck,
			})
		}

		return success
	}

	/**
	 * Retrieves an item from a slot.
	 *
	 * @param {number} slot The number of the slot from which the item will be retrieved.
	 * @returns {object | null} The item, or null if the slot is empty.
	 */
	getItem(slot) {
		return this.#contents[slot]
	}

	/**
	 * Moves an item to a new slot.
	 *
	 * @param {object} item The item to be moved.
	 * @param {number} currentSlot The current slot.
	 * @param {number} destinationSlot The destination slot.
	 * @fires InventoryItemMoved
	 * @returns {boolean} Whether the item was move successfully.
	 */
	moveItem(item, currentSlot, destinationSlot) {
		if (destinationSlot > this.#capacity) {
			throw new RangeError(`Cannot place item in slot ${destinationSlot}; inventory only has ${this.#capacity} slots.`)
		}

		this.#contents[currentSlot] = this.#contents[destinationSlot]
		this.#contents[destinationSlot] = item

		/**
		 * Item moved event.
		 *
		 * @event InventoryItemMoved
		 */
		this.emit('items moved')

		return true
	}

	/**
	 * Removes an item from the inventory.
	 *
	 * @param {number} slot The current slot.
	 * @fires InventoryItemRemoved
	 * @returns {boolean} Whether the item was removed successfully.
	 */
	removeItem(slot) {
		if (this.#contents[slot] !== null) {
			const item = this.#contents[slot]
			this.#contents[slot] = null

			/**
			 * Item removed event.
			 *
			 * @event InventoryItemRemoved
			 * @type {object}
			 * @property {import('./Item.js').Item} item The item that was removed.
			 * @property {number} slot The slot that the removed item occupied.
			 */
			this.emit('item removed', {
				item,
				slot,
			})
		}

		return true
	}

	/**
	 * Updates the inventory's capacity.
	 *
	 * @param {number} capacity The new capacity of the inventory.
	 * @fires InventoryCapacityChanged
	 * @returns {object[]} An array of items that don't fit with the new inventory capacity.
	 */
	setCapacity(capacity) {
		const newContents = {}

		const currentSlotsArray = Object.values(this.#contents)
		const filteredSlotsArray = currentSlotsArray.filter(Boolean)
		const occupiedSlotCount = filteredSlotsArray.length

		let itemsToDrop = []

		if (occupiedSlotCount > capacity) {
			itemsToDrop = filteredSlotsArray.slice(capacity)
		}

		let lastOccupiedSlot = currentSlotsArray.length

		while (lastOccupiedSlot > capacity) {
			currentSlotsArray.splice(currentSlotsArray.indexOf(null), 1)
			lastOccupiedSlot = currentSlotsArray.length
		}

		let slotIndex = 0

		while (slotIndex < capacity) {
			newContents[slotIndex] = currentSlotsArray[slotIndex] ?? null
			slotIndex += 1
		}

		this.#capacity = capacity

		/**
		 * Capacity changed event.
		 *
		 * @event InventoryCapacityChanged
		 * @type {object}
		 * @property {number} capacity The new capacity of the inventory.
		 * @property {import('./Item.js').Item[]} itemsToDrop An array of items that no longer fit in the bag after the capacity has been changed.
		 */
		this.emit('capacity changed', {
			capacity,
			itemsToDrop,
		})

		return itemsToDrop
	}





	/****************************************************************************\
	 * Public instance getters/setters
	\****************************************************************************/

	/** @returns {number} The number of slots available in this inventory. */
	get capacity() {
		return this.#capacity
	}
}
