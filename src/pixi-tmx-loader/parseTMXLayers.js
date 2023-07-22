// Local imports
import { parseTMXLayerProperties } from './parseTMXLayerProperties.js'





/**
 * @typedef {object} ParsedLayer
 * @property {undefined | ParsedLayer[]} [layers] An array of sub layers (group layers only).
 * @property {object} properties All core and custom properties.
 * @property {undefined | object[]} [tiles] An array of tiles (tile layers only).
 */

/**
 * Recursively parses the layers of a TMX file to generate a usable object structure.
 *
 * @param {Node} nodeToParse The node to parse.
 * @param {object} config Additional configuration.
 * @param {number[]} config.tilesetGIDs A sorted list of global first IDs for tilesets.
 * @param {object} config.tilesets Tilesets that are available in the source TMX.
 * @param {number} config.width The width of the TMX.
 * @returns {ParsedLayer[]} The compiled layer structure.
 */
export function parseTMXLayers(nodeToParse, config) {
	const {
		tilesetGIDs,
		tilesets,
		width,
	} = config

	const layerNodes = Array.from(nodeToParse.querySelectorAll(':scope > layer, :scope > group'))

	return layerNodes.map(layerNode => {
		const result = { properties: parseTMXLayerProperties(layerNode) }

		if (layerNode.nodeName === 'group') {
			result.layers = parseTMXLayers(layerNode, config)
		} else {
			const dataNode = layerNode.querySelector('data')

			const tileGIDs = dataNode
				.innerHTML
				.trim()
				.split(',')

			result.tiles = tileGIDs.map((tileGIDString, index) => {
				const tileGID = Number(tileGIDString)

				if (tileGID === 0) {
					return null
				}

				const tilesetGID = tilesetGIDs.find(gid => (gid <= tileGID))
				const tileset = tilesets[tilesetGID]
				const tileID = (tileGID - tilesetGID) + 1

				return {
					height: tileset.tile.height,
					texture: tileset.spritesheet.textures[tileID],
					width: tileset.tile.width,
					x: (index - (Math.floor(index / width) * width)) * tileset.tile.width,
					y: Math.floor(index / width) * tileset.tile.height,
				}
			})
		}

		return result
	})
}
