// Module imports
import { Viewport } from 'pixi-viewport'





// Local imports
import { position } from '../components/position.js'
import { size } from '../components/size.js'
import { store } from '../../store/store.js'





/**
 * Creates a new entity for the camera.
 *
 * @returns {object} The new entity.
 */
export function createCameraEntity() {
	const {
		pixiApp,
		world,
	} = store.state

	const viewport = new Viewport({
		events: pixiApp.renderer.events,

		screenHeight: window.innerHeight / 4,
		screenWidth: window.innerWidth / 4,
		worldHeight: 200,
		worldWidth: 200,
	})

	store.set(() => ({ viewport }))

	pixiApp.stage.addChild(viewport)

	const camera = world.add({
		...position(),
		...size(),
		isCamera: true,
	})

	return camera
}
