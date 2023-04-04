// Module imports
import {
	Assets,
	TilingSprite,
} from 'pixi.js'
import { Viewport } from 'pixi-viewport'





// Local imports
import { position } from '../components/position.js'
import { size } from '../components/size.js'
import { store } from '../../store/store.js'





export function createCameraEntity() {
	const {
		pixiApp,
		world,
	} = store.state

	const viewport = new Viewport({
		// the interaction module is important for wheel to work properly when renderer.view is placed or scaled
		events: pixiApp.renderer.events,

		screenHeight: window.innerHeight / 4,
		screenWidth: window.innerWidth / 4,
		worldHeight: 200,
		worldWidth: 200,
	})

	const map = new TilingSprite(Assets.get('grass'), 100, 100)

	viewport.addChild(map)

	store.set(() => ({
		map,
		viewport,
	}))

	pixiApp.stage.addChild(viewport)

	const camera = world.add({
		...position(),
		...size(),
		isCamera: true,
	})

	return camera
}
