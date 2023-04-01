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
