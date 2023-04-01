// Local imports
import { getRenderableEntities } from '../selectors.js'
import { quicksort } from '../../helpers/quicksort.js'
import { store } from '../../store/store.js'





/**
 * Sorts all entities by their y position.
 */
export function sortSystem() {
	const entitiesToSort = getRenderableEntities()

	const entityRenderOrder = Array(entitiesToSort.size)
		.fill(null)
		.map((_, index) => index)

	quicksort(entityRenderOrder, entityIndex => {
		const entity = entitiesToSort.entities[entityIndex]
		return entity.position.y
	})

	store.set(() => ({ entityRenderOrder }))
}
