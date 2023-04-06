// Module imports
import { Assets } from 'pixi.js'
import { CompositeTilemap } from '@pixi/tilemap'





// Local imports
import { store } from '../store/store.js'





/**
 * Creates and stores the map.
 */
export function initialiseMap() {
	const { viewport } = store.state

	const map = new CompositeTilemap

	const mapData = Assets.get('metropolis')

	mapData.layers.forEach(layer => {
		layer.forEach(tile => {
			if (!tile) {
				return
			}

			map.tile(tile.texture, tile.x, tile.y)
		})
	})

	viewport.addChild(map)

	store.set(() => ({ map }))
}
