// Module imports
import {
	BaseTexture,
	ExtensionType,
	settings,
	utils,
	ALPHA_MODES,
	MIPMAP_MODES,
} from '@pixi/core'
import {
	checkExtension,
	createTexture,
	LoaderParserPriority,
} from '@pixi/assets'





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
	 * @param {import('@pixi/assets').LoadAsset} asset
	 * @param {import('@pixi/assets').Loader} loader
	 * @returns {import('@pixi/assets').Texture | import('@pixi/assets').Texture[]} The loaded textures.
	 */
	async load(url, asset, loader) {
		const response = await settings.ADAPTER.fetch(url)

		const tmxString = await response.text()

		const tmxDOM = parseXML(tmxString)

		const tilesetNodes = Array.from(tmxDOM.querySelectorAll('tileset'))

		const assetBasePath = asset.src.replace(path.basename(asset.src), '')

		const tilesets = await Promise.all(tilesetNodes.map(async tilesetNode => {
			const tileset = await loader.load({
				src: path.join(assetBasePath, tilesetNode.getAttribute('source')),
			})

			return {
				globalTileID: Number(tilesetNode.getAttribute('firstgid')),
				src: path.join(assetBasePath, tilesetNode.getAttribute('source')),
				tileset,
			}
		}))

		console.log({ tilesets })

		return {
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
			tilesets,
			size: {
				height: Number(tmxDOM.getAttribute('height')),
				width: Number(tmxDOM.getAttribute('width')),
			},
		}

		// const textures = resources.map((resource) => {
		// 	const base = new BaseTexture(resource, {
		// 		mipmap: MIPMAP_MODES.OFF,
		// 		alphaMode: ALPHA_MODES.NO_PREMULTIPLIED_ALPHA,
		// 		resolution: utils.getResolutionOfUrl(url),
		// 		...asset.data,
		// 	})

		// 	return createTexture(base, loader, url)
		// })

		// return textures.length === 1 ? textures[0] : textures
	},

	// /**
	//  *
	//  * @param {import('@pixi/assets').Texture | import('@pixi/assets').Texture[]} texture
	//  */
	// unload(texture) {
	// 	if (Array.isArray(texture)) {
	// 		texture.forEach((t) => t.destroy(true))
	// 	}
	// 	else {
	// 		texture.destroy(true)
	// 	}
	// }
}
