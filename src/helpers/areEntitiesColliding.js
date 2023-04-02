/**
 * @typedef Vector2
 * @property {number} x The horizontal position.
 * @property {number} y The vertical position.
 */

/**
 * @typedef CollidableEntity
 * @property {Vector2[]} boundingBox Vectors representing the top left and bottom right of the bounding box.
 */

/**
 * Determines whether entities are colliding based on their bounding boxes.
 *
 * @param {CollidableEntity} entityA The first entity to check.
 * @param {CollidableEntity} entityB The second entity to check.
 * @returns {boolean} Whether the entities are colliding.
 */
export function areEntitiesColliding(entityA, entityB) {
	const boundingBoxA = entityA.boundingBox
	const boundingBoxB = entityB.boundingBox

	if ((boundingBoxA[0].x > boundingBoxB[1].x) || (boundingBoxA[1].x < boundingBoxB[0].x)) {
		return false
	}

	if ((boundingBoxA[0].y > boundingBoxB[1].y) || (boundingBoxA[1].y < boundingBoxB[0].y)) {
		return false
	}

	return true
}
