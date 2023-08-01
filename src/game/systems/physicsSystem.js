// Local imports
import { getCollidableEntities } from '../entities/selectors/getCollidableEntities.js'
import { renderPhysicsDebug } from '../physics/index.js'
import { store } from '../../store/store.js'





/** Moves entities based on their velocity. */
export function physicsSystem() {
	const {
		physicsWorld,
		physicsEvents,
	} = store.state

	physicsWorld.step(physicsEvents)

	physicsEvents.drainContactForceEvents(event => {
		console.log('Contact Event', event)
	})

	physicsEvents.drainCollisionEvents((collider1, collider2, started) => {
		console.log('Collision Event', collider1, collider2, started)
	})

	for (const entity of getCollidableEntities()) {
		physicsWorld.intersectionsWith(entity.collisionBody.collider, otherCollider => {
			console.log('Detected intersection between:', [
				entity.collisionBody.collider,
				otherCollider,
			])
		})
	}

	renderPhysicsDebug(physicsWorld)
}
