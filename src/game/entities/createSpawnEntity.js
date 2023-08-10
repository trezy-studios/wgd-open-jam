// Local imports
import { createEntity } from './createEntity.js'
import { spawn } from '../components/spawn.js'
import { spriteContainer } from '../components/spriteContainer.js'





/**
 * Creates a new entity representing.
 *
 * @param {number} x The entity's initial X position.
 * @param {number} y The entity's initial X position.
 * @param {string} type What type of spawn this should be.
 * @param {import('pixi.js').DisplayObject} container A container for spawn sprites.
 * @param {object} components Additional components to be attached to the created entity.
 * @returns {object} The new entity.
 */
export function createSpawnEntity(x, y, type, container, components = {}) {
	return createEntity(x, y, {
		...spawn(type),
		...spriteContainer(container),
		...components,
	})
}
