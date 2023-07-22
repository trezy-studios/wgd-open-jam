// Local imports
import { getMovingEntities } from '../entities/selectors/getMovingEntities.js'
import { PIXELS_PER_METER } from '../physics/index.js'





/** Moves entities based on their velocity. */
export function moveSystem() {
	for (const props of getMovingEntities()) {
		const {
			position,
			collisionBody,
		} = props

		// Pull the position from the collision body
		position.x = collisionBody.body.translation().x * PIXELS_PER_METER
		position.y = collisionBody.body.translation().y * PIXELS_PER_METER
	}
}
