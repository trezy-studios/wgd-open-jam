import {
	Graphics,
} from 'pixi.js'
import { PIXELS_PER_METER } from '.'
import { store } from '../../store/store.js'
// import { RenderLayers } from '@components/render'
// import RAPIER from '@dimforge/rapier2d-compat'

// import { DEBUG, PIXELS_PER_METER } from '@utils/const'

let GRAPHICS = []

/**
 * Renders debug rectangles for all rigid bodies and colliders
 * added to the physics simulation.
 */
export function renderDebug() {
	const buffers = store.state.physicsWorld.debugRender()
	const vtx = buffers.vertices

	GRAPHICS.forEach(g => g.destroy())
	GRAPHICS = []

	for (let i = 0; i < vtx.length / 4; i += 1) {
		const g = new Graphics
		g.lineStyle(0.5, 0x00ff00, 1)
		g.moveTo(vtx[i * 4] * PIXELS_PER_METER, vtx[i * 4 + 1] * PIXELS_PER_METER)
		g.lineTo(vtx[i * 4 + 2] * PIXELS_PER_METER, vtx[i * 4 + 3] * PIXELS_PER_METER)
		g.closePath()
		GRAPHICS.push(g)

		store.state.viewport.addChild(g)
	}
}
