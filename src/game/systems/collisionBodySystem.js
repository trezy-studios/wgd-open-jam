// Local imports
import { getCollidableEntities } from '../entities/selectors/getCollidableEntities.js'





/** Updates the player character's position based on controller inputs. */
export function collisionBodySystem() {
	for (const entity of getCollidableEntities()) {
		// If entity also has the velocity component
		if (entity.velocity) {
			entity.collisionBody.body.setLinvel({
				x: entity.velocity.x,
				y: entity.velocity.y,
			}, true)
		}
	}
}
