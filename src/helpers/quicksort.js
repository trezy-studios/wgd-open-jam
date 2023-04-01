/**
 * Swaps the position of 2 items in an array.
 *
 * @param {Array} items The array containing the items to be swapped.
 * @param {number} firstIndex The index of the first item to be swapped.
 * @param {number} secondIndex The index of the second item to be swapped.
 */
function swap(items, firstIndex, secondIndex) {
	const temp = items[firstIndex]
	items[firstIndex] = items[secondIndex]
	items[secondIndex] = temp
}

/**
 * Partitions and sorts an array.
 *
 * @param {Array} items The items to be sorted.
 * @param {Function} valueAccessor A method to retrieve the sort value from an item.
 * @param {number} leftIndex The index of the left side item in the comparison.
 * @param {number} rightIndex The index of the right side item in the comparison.
 * @returns {number} The index at which the partition ended.
 */
function partition(items, valueAccessor, leftIndex, rightIndex) {
	// Grab a central value as the pivot
	const pivot = valueAccessor(items[Math.floor((rightIndex + leftIndex) / 2)])

	// Loop over all items until the indeces meet at the pivot
	while (leftIndex <= rightIndex) {
		while (valueAccessor(items[leftIndex]) < pivot) {
			leftIndex += 1
		}

		while (valueAccessor(items[rightIndex]) > pivot) {
			rightIndex -= 1
		}

		if (leftIndex <= rightIndex) {
			swap(items, leftIndex, rightIndex)
			leftIndex += 1
			rightIndex -= 1
		}
	}

	return leftIndex
}

/**
 * Sorts an array using the Quick Sort algorithm.
 *
 * @param {Array} items The items to be sorted.
 * @param {Function} valueAccessor A method to retrieve the sort value from an item.
 * @param {number} leftIndex The index of the left side item in the comparison.
 * @param {number} rightIndex The index of the right side item in the comparison.
 * @returns {Array} The sorted array.
 */
export function quicksort(items, valueAccessor = item => item, leftIndex = 0, rightIndex = null) {
	if (!rightIndex) {
		rightIndex = items.length - 1
	}

	let index = null

	if (items.length > 1) {
		index = partition(items, valueAccessor, leftIndex, rightIndex)

		if (leftIndex < index - 1) {
			quicksort(items, valueAccessor, leftIndex, index - 1)
		}

		if (index < rightIndex) {
			quicksort(items, valueAccessor, index, rightIndex)
		}
	}

	return items
}
