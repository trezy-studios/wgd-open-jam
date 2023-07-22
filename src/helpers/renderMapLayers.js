// Module imports
import {
	Container,
	Sprite,
} from 'pixi.js'





// Local imports
import { store } from '../store/store.js'





/**
 * Renders map layers.
 *
 * @param {object[]} layers The layer to be rendered.
 * @param {Container} targetContainer The container into which new layers will be rendered.
 * @returns {null | Container} A Pixi container containing all tiles and/or sub layers.
 */
export function renderMapLayers(layers, targetContainer) {
	layers.forEach(layer => {
		if ((typeof layer.properties.isRenderable === 'boolean') && !layer.properties.isRenderable) {
			return null
		}

		const container = new Container

		container.name = layer.properties.name

		if ((typeof layer.properties.isPlayer === 'boolean') && layer.properties.isPlayer) {
			store.set(() => ({ playerContainer: container }))
		} else {
			if (layer.tiles?.length) {
				layer.tiles.forEach(tile => {
					if (!tile?.texture) {
						// console.warn('Attempted to load tile which has no texture')
						return
					}

					const sprite = new Sprite(tile.texture)

					sprite.x = tile.x
					sprite.y = tile.y

					container.addChild(sprite)
				})
			}

			if (layer.layers?.length) {
				renderMapLayers(layer.layers, container)
			}
		}

		targetContainer.addChild(container)
	})

	return targetContainer
}
