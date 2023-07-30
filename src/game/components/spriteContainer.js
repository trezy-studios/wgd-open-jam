/**
 * Flags a container for rendering the entity's sprites.
 *
 * @param {import('pixi.js').Container} container A Pixi container within which the entities will be rendered.
 * @returns {object} The entity's sprite container state.
 */
export function spriteContainer(container) {
	return { spriteContainer: container }
}
