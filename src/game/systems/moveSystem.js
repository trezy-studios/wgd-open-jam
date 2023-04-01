// Local imports
import { getMovingEntities } from '../entities/selectors/getMovingEntities.js'





/** Moves entities based on their velocity. */
export function moveSystem() {
	for (const props of getMovingEntities()) {
		const {
			position,
			velocity,
		} = props

		position.x += velocity.x
		position.y += velocity.y
	}
}
