/**
 * Marks whether an entity is renderable.
 *
 * @param {boolean} [value] Whether the entity will be renderable.
 * @returns {object} The entity's renderable state.
 */
export function isRenderable(value = true) {
	return { isRenderable: value }
}
