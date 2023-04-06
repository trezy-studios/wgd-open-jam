// Module imports
import {
	checkExtension,
	LoaderParserPriority,
} from '@pixi/assets'
import {
	ExtensionType,
	settings,
} from '@pixi/core'





// Local imports
import { parseXML } from './parseXML.js'
import * as path from './path.js'





/** @type {import('@pixi/assets').LoaderParser} */
export const TMXLoader = {
	extension: {
		type: ExtensionType.LoadParser,
		priority: LoaderParserPriority.High,
	},

	/**
	 * Tests the asset's path to determine if we it should be handled by this loader.
	 *
	 * @param {string} url The URL of the asset.
	 * @returns {boolean} Whether to handle the asset.
	 */
	test(url) {
		return checkExtension(url, '.tmx')
	},

	/**
	 * Load a TMX file.
	 *
	 * @param {string} url The URL of the TMX file.
	 * @param {import('@pixi/assets').LoadAsset} asset The TMX file asset.
	 * @param {import('@pixi/assets').Loader} loader The loader being used to load this asset.
	 * @returns {import('@pixi/assets').Texture | import('@pixi/assets').Texture[]} The loaded textures.
	 */
	async load(url, asset, loader) {
		const response = await settings.ADAPTER.fetch(url)

		const tmxString = await response.text()

		const tmxDOM = parseXML(tmxString)

		const tilesetNodes = Array.from(tmxDOM.querySelectorAll('tileset'))

		const assetBasePath = asset.src.replace(path.basename(asset.src), '')

		const tmxObject = {
			layers: null,
			meta: {
				app: 'https://www.mapeditor.org/',
				isInfinite: tmxDOM.getAttribute('infinite'),
				nextLayerID: tmxDOM.getAttribute('nextlayerid'),
				nextObjectID: tmxDOM.getAttribute('nextobjectid'),
				orientation: tmxDOM.getAttribute('orientation'),
				renderOrder: tmxDOM.getAttribute('renderorder'),
				version: tmxDOM.getAttribute('tiledversion'),
			},
			tile: {
				height: Number(tmxDOM.getAttribute('tileheight')),
				width: Number(tmxDOM.getAttribute('tilewidth')),
			},
			tilesets: null,
			size: {
				height: Number(tmxDOM.getAttribute('height')),
				width: Number(tmxDOM.getAttribute('width')),
			},
		}

		const tilesetArray = await Promise.all(tilesetNodes.map(async tilesetNode => {
			const tileset = await loader.load({
				src: path.join(assetBasePath, tilesetNode.getAttribute('source')),
			})

			return {
				globalTileID: Number(tilesetNode.getAttribute('firstgid')),
				tileset,
			}
		}))

		tmxObject.tilesets = tilesetArray.reduce((accumulator, tileset) => {
			accumulator[tileset.globalTileID] = tileset.tileset
			return accumulator
		}, {})

		const tilesetGIDs = Object
			.keys(tmxObject.tilesets)
			.map(Number)
			.sort()
			.reverse()

		tmxObject.layers = Array
			.from(tmxDOM.querySelectorAll('layer'))
			.map(layer => {
				const dataNode = layer.querySelector('data')

				const tileGIDs = dataNode
					.innerHTML
					.trim()
					.split(',')

				return tileGIDs.map((tileGID, index) => {
					if (tileGID === 0) {
						return null
					}

					const tilesetGID = tilesetGIDs.find(gid => (gid <= tileGID))
					const tileset = tmxObject.tilesets[tilesetGID]
					const tileID = (tileGID - tilesetGID) + 1

					return {
						height: tileset.tile.height,
						texture: tileset.spritesheet.textures[tileID],
						width: tileset.tile.width,
						x: (index - (Math.floor(index / tmxObject.size.width) * tmxObject.size.width)) * tileset.tile.width,
						y: Math.floor(index / tmxObject.size.width) * tileset.tile.height,
					}
				})
			})

		return tmxObject
	},
}
