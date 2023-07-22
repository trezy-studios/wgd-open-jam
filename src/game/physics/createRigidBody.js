// Module imports
import RAPIER from '@dimforge/rapier2d-compat'




// Local imports
import { PIXELS_PER_METER } from './index'
import { store } from '../../store/store'





/**
 * Creates a new Rapier RigidBody object. Can be configured to be static or
 * dynamic and rotations can be locked via the options parameter.
 *
 * @param {number} x X position to place body at (pixels)
 * @param {number} y Y position to place body at (pixels)
 * @param {object} opts Configuration options (static, lockRotations)
 * @returns {RAPIER.RigidBody} A new Rapier RigidBody object
 */
function createRigidBody(x, y, opts = {}) {
	let bodyDescriptor = RAPIER.RigidBodyDesc.dynamic
	if (opts.static) {
		bodyDescriptor = RAPIER.RigidBodyDesc.fixed
	}
	const bodyDesc = bodyDescriptor()
		.setTranslation(x / PIXELS_PER_METER, y / PIXELS_PER_METER)
		.setCcdEnabled(true)

	if (opts.allowRotations !== true) {
		bodyDesc.lockRotations()
	}

	const { physicsWorld } = store.state
	return physicsWorld.createRigidBody(bodyDesc)
}

/**
 * Creates a new dynamic Rapier RigidBody object. Rotations can be locked via
 * the options parameter.
 *
 * @param {number} x X position to place body at (pixels)
 * @param {number} y Y position to place body at (pixels)
 * @param {object} opts Configuration options (allowRotations)
 * @returns {RAPIER.RigidBody} A new Rapier RigidBody object
 */
export function createDynamicBody(x, y, opts = {}) {
	delete opts.static
	return createRigidBody(x, y, {
		static: false,
		...opts,
	})
}

/**
 * Creates a new static Rapier RigidBody object. Rotations can be locked via
 * the options parameter.
 *
 * @param {number} x X position to place body at (pixels)
 * @param {number} y Y position to place body at (pixels)
 * @param {object} opts Configuration options (allowRotations)
 * @returns {RAPIER.RigidBody} A new Rapier RigidBody object
 */
export function createStaticBody(x, y, opts = {}) {
	delete opts.static
	return createRigidBody(x, y, {
		static: true,
		...opts,
	})
}
