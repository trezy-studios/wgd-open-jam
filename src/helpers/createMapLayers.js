// Module imports
import {
	Container,
	Sprite,
} from 'pixi.js'





/**
 * Creates layers from the world map data.
 *
 * @param {object} mapData The map to create layers from.
 * @param {Container} targetContainer The container into which new layers will be rendered.
 */
export function createMapLayers(mapData, targetContainer) {
	const layerCache = {}

	const { levels } = mapData

	levels.forEach(level => {
		const { layers } = level

		layers.forEach(layer => {
			let layerContainer = layerCache[layer.name]

			if (!layerContainer) {
				layerContainer = new Container
				layerContainer.name = layer.name
				layerCache[layer.name] = layerContainer
			}

			if (layer.tiles?.length) {
				layer.tiles.forEach(tile => {
					if (!tile?.texture) {
						// console.warn('Attempted to load tile which has no texture')
						return
					}

					const sprite = new Sprite(tile.texture)

					sprite.x = (tile.position.x * tile.width) + level.worldPosition.x
					sprite.y = (tile.position.y * tile.height) + level.worldPosition.y

					layerContainer.addChild(sprite)
				})
			}

			targetContainer.addChild(layerContainer)
		})

		return targetContainer
	})
}
