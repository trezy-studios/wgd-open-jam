// Local imports
import { v4 as uuid } from 'uuid'





// Constants
const CACHE = {}





/**
 * Creates a selector function for retrieving entities from the world.
 *
 * @param {Function} selector The function which will retrieve entities from the world.
 * @returns {Function} The generated selector function.
 */
export function createSelector(selector) {
	const id = uuid()

	return () => {
		if (!CACHE[id]) {
			CACHE[id] = selector()
		}

		return CACHE[id]
	}
}
