// Local imports
import { renderPhysicsDebug } from '../physics/index.js'
import { store } from '../../store/store.js'





/** Moves entities based on their velocity. */
export function physicsSystem() {
	const {
		physicsWorld,
		physicsEvents,
	} = store.state

	physicsWorld.step(physicsEvents)

	physicsEvents.drainContactForceEvents(evt => {
		console.log('Contact Event', evt)
	})

	physicsEvents.drainCollisionEvents((collider1, collider2, started) => {
		console.log('Collision Event', collider1, collider2, started)
	})

	renderPhysicsDebug(physicsWorld)
}
