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

	const map = []

	const mapData = Assets.get('metropolis')

	mapData.layers.forEach(layer => {
		const layerTilemap = new CompositeTilemap

		layer.tiles.forEach(tile => {
			if (!tile?.texture) {
				console.warn('Attempted to load tile which has no texture')
				return
			}

			const tileOptions = {}

			layerTilemap.tile(tile.texture, tile.x, tile.y, tileOptions)
		})

		map.push(layerTilemap)

		viewport.addChild(layerTilemap)
	})

	store.set(() => ({ map }))
}
