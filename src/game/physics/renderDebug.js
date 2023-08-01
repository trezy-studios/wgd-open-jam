// Module imports
import {
	Color,
	Graphics,
} from 'pixi.js'
import { PIXELS_PER_METER } from '.'
import { store } from '../../store/store.js'
// import { RenderLayers } from '@components/render'
// import RAPIER from '@dimforge/rapier2d-compat'

// import { DEBUG, PIXELS_PER_METER } from '@utils/const'

let GRAPHICS_CACHE = []

/**
 * Renders debug rectangles for all rigid bodies and colliders
 * added to the physics simulation.
 */
export function renderDebug() {
	const buffers = store.state.physicsWorld.debugRender()
	const allVertices = buffers.vertices
	const allColors = buffers.colors

	const { viewport } = store.state

	GRAPHICS_CACHE.forEach(graphics => graphics.destroy())
	GRAPHICS_CACHE = []

	let vertexIndex = 0

	while (vertexIndex < allVertices.length) {
		const vertexBaseIndex = vertexIndex * 4
		const colorBaseIndex = vertexBaseIndex * 2

		if (allColors[colorBaseIndex]) {
			const color = new Color({
				r: allColors[colorBaseIndex] * 255,
				g: allColors[colorBaseIndex + 1] * 255,
				b: allColors[colorBaseIndex + 2] * 255,
				a: allColors[colorBaseIndex + 3] * 255,
			})

			const graphics = new Graphics
			graphics.lineStyle(0.5, color, 1)
			graphics.moveTo(allVertices[vertexBaseIndex] * PIXELS_PER_METER, allVertices[vertexBaseIndex + 1] * PIXELS_PER_METER)
			graphics.lineTo(allVertices[vertexBaseIndex + 2] * PIXELS_PER_METER, allVertices[vertexBaseIndex + 3] * PIXELS_PER_METER)
			graphics.closePath()

			GRAPHICS_CACHE.push(graphics)
			viewport.addChild(graphics)
		}

		vertexIndex += 1
	}
}
