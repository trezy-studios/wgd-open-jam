// Module imports
import { Assets } from 'pixi.js'
import { CompositeTilemap } from '@pixi/tilemap'





// Local imports
import { store } from '../store/store.js'





export function initialiseMap() {
	const { viewport } = store.state

	const map = new CompositeTilemap()

	map.tile(Assets.get('grass'), 0, 0)

	viewport.addChild(map)

	store.set(() => ({ map }))
}
