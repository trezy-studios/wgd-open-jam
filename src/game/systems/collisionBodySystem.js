// Local imports
import { getCollidableEntities } from '../entities/selectors/getCollidables.js'





/** Updates the player character's position based on controller inputs. */
export function collisionBodySystem() {
	for (const entt of getCollidableEntities()) {

		// If entity also has the velocity component
		if (entt.velocity) {
			entt.collisionBody.body.setLinvel({
				x: entt.velocity.x,
				y: entt.velocity.y,
			}, true)
		}
	}
}
