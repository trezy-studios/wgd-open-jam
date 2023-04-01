/**
 * Marks whether an entity is renderable.
 *
 * @param {boolean} [value = true] Whether the entity will be renderable.
 * @returns {object} The entity's renderable state.
 */
export function isRenderable(value = true) {
	return { isRenderable: value }
}
