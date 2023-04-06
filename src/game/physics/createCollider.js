// Module imports
import RAPIER from '@dimforge/rapier2d-compat'




// Local imports
import { PIXELS_PER_METER } from './index'
import { store } from '../../store/store'





/**
 * Builds a rectangular collider descriptor which can be used
 * to initialize a real collider in the physics world.
 *
 * @param {number} width Width of rectangle collider (pixels)
 * @param {number} height Height of rectangle collider (pixels)
 * @returns {RAPIER.ColliderDesc} Collider describer object
 */
function buildRectangleCollider(width, height) {
	return new RAPIER.ColliderDesc(
		new RAPIER.Cuboid(
			width / 2 / PIXELS_PER_METER,
			height / 2 / PIXELS_PER_METER,
		),
	)
}

/**
 * Builds a circular collider descriptor which can be used
 * to initialize a real collider in the physics world.
 *
 * @param {number} radius Radius of circular collider (pixels)
 * @returns {RAPIER.ColliderDesc} Collider describer object
 */
function buildCircleCollider(radius) {
	return new RAPIER.ColliderDesc(
		new RAPIER.Ball(radius / PIXELS_PER_METER),
	)
}

/**
 * Builds a rectangular collider descriptor which can be used
 * to initialize a real collider in the physics world.
 *
 * @param {string} shape Shape of the collider to build (circle | rectangle)
 * @param {object} config Configuration of the collider (width, height, radius, etc)
 * @param {RAPIER.RigidBody} parentRigidBody RigidBody to attach this collider to; optional
 * @returns {RAPIER.Collider} Rapier collider object
 */
export function createCollider(shape, config, parentRigidBody) {
	// TODO: Implement assigning "group" and "collision filters"
	// to the collider before creating it.
	// const opts = {
	// 	group: config.group,
	// 	filter: config.filter,
	// }

	let colliderDesc = null
	if (shape === 'circle') {
		colliderDesc = buildCircleCollider(config.radius)
	} else if (shape === 'rectangle') {
		colliderDesc = buildRectangleCollider(config.width, config.height)
	} else {
		console.error('Invalid shape type requested --', config)
		return null
	}

	colliderDesc.setFriction(0)

	const { physicsWorld } = store.state
	return physicsWorld.createCollider(colliderDesc, parentRigidBody)
}
