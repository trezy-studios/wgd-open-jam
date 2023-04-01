/**
 * Marks an entity to prevent it from being rendered.
 *
 * @returns {object} The entity's renderable state.
 */
export function isNonRenderable() {
	return { isNonRenderable: true }
}
