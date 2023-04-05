// Module imports
import {
	ExtensionType,
	settings,
} from '@pixi/core'
import { Spritesheet } from '@pixi/spritesheet'
import {
	checkExtension,
	LoaderParserPriority,
} from '@pixi/assets'





// Local imports
import { parseXML } from './parseXML.js'
import * as path from './path.js'





/** @type {import('@pixi/assets').LoaderParser} */
export const TSXLoader = {
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
		return checkExtension(url, '.tsx')
	},

	/**
	 * Load a TSX file.
	 *
	 * @param {string} url The URL of the TSX file.
	 * @param {import('@pixi/assets').LoadAsset} asset The TSX file asset.
	 * @param {import('@pixi/assets').Loader} loader The loader that is handling this asset.
	 * @returns {import('@pixi/assets').Texture | import('@pixi/assets').Texture[]} The loaded textures.
	 */
	async load(url, asset, loader) {
		const response = await settings.ADAPTER.fetch(url)

		const tsxString = await response.text()

		const tsxDOM = parseXML(tsxString)

		const tsxObject = {
			meta: {
				app: 'https://www.mapeditor.org/',
				columnCount: Number(tsxDOM.getAttribute('columns')),
				tileCount: Number(tsxDOM.getAttribute('tilecount')),
				version: tsxDOM.getAttribute('tiledversion'),
			},
			spritesheet: null,
			tile: {
				height: Number(tsxDOM.getAttribute('tileheight')),
				width: Number(tsxDOM.getAttribute('tilewidth')),
			},
		}

		const imageNode = tsxDOM.querySelector('image')

		const assetBasePath = asset.src.replace(path.basename(asset.src), '')

		const atlas = {
			frames: {},
			meta: {
				image: path.join(assetBasePath, imageNode.getAttribute('source')),
				format: 'RGBA8888',
				size: {
					h: Number(imageNode.getAttribute('height')),
					w: Number(imageNode.getAttribute('width')),
				},
				scale: 1
			},
			animations: {},
		}

		const { columnCount } = tsxObject.meta
		const rowCount = tsxObject.meta.tileCount / columnCount

		let rowIndex = 0

		while (rowIndex < rowCount) {
			let columnIndex = 0

			while (columnIndex < columnCount) {
				atlas.frames[(columnCount * rowIndex) + columnIndex + 1] = {
					frame: {
						h: tsxObject.tile.height,
						w: tsxObject.tile.width,
						x: tsxObject.tile.width * columnIndex,
						y: tsxObject.tile.height * rowIndex,
					},
					sourceSize: {
						h: tsxObject.tile.height,
						w: tsxObject.tile.width,
					},
					spriteSourceSize: {
						h: tsxObject.tile.height,
						w: tsxObject.tile.width,
						x: 0,
						y: 0,
					},
				}
				columnIndex += 1
			}

			rowIndex += 1
		}

		// Parse animated tiles.
		atlas.animations = Array
			.from(tsxDOM.querySelectorAll('tile'))
			.reduce((accumulator, tileNode) => {
				const animationNode = tileNode.querySelector('animation')

				if (animationNode) {
					accumulator[Number(tileNode.getAttribute('id'))] = Array
						.from(animationNode.querySelectorAll('frame'))
						.map(frameNode => Number(frameNode.getAttribute('tileid')))
				}

				return accumulator
			}, {})

		const texture = await loader.load(atlas.meta.image)

		tsxObject.spritesheet = new Spritesheet(texture, atlas)

		await tsxObject.spritesheet.parse()

		return tsxObject
	},

	/**
	 *
	 * @param {import('@pixi/assets').Texture | import('@pixi/assets').Texture[]} texture
	 */
	unload(texture) {
		if (Array.isArray(texture)) {
			texture.forEach((t) => t.destroy(true))
		}
		else {
			texture.destroy(true)
		}
	}
}
