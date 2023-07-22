// Local imports
import {
	createCollider,
	createStaticBody,
} from '../game/physics/index.js'





/**
 * Creates static bodies for each map object.
 *
 * @param {{
 * 	height: number,
 * 	width: number,
 * 	x: number,
 * 	y: number,
 * }} objects An object representing the size and position of the static body.
 */
export function createMapBodies(objects) {
	objects.forEach(object => {
		const staticBody = createStaticBody(
			object.x + (object.width / 2),
			object.y + (object.height / 2),
		)
		createCollider('rectangle', {
			height: object.height,
			width: object.width,
		}, staticBody)
	})
}
