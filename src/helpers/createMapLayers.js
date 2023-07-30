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
 * @returns {null | Container} A Pixi container containing all tiles and/or sub layers.
 */
export function createMapLayers(mapData, targetContainer) {
	const { layers } = mapData.levels[0]

	layers.forEach(layer => {
		const container = new Container

		container.name = layer.name

		if (layer.tiles?.length) {
			layer.tiles.forEach(tile => {
				if (!tile?.texture) {
					// console.warn('Attempted to load tile which has no texture')
					return
				}

				const sprite = new Sprite(tile.texture)

				sprite.x = tile.position.x * tile.width
				sprite.y = tile.position.y * tile.height

				container.addChild(sprite)
			})
		}

		targetContainer.addChild(container)
	})

	return targetContainer
}
