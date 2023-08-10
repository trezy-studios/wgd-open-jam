// Module imports
import {
	checkExtension,
	LoaderParserPriority,
} from '@pixi/assets'
import {
	ExtensionType,
	settings,
} from '@pixi/core'
import { Spritesheet } from '@pixi/spritesheet'





// Local imports
import { Convert } from './quicktype.ts'
import { getTileTextureFromTileset } from '../helpers/getTileTextureFromTileset.js'
import * as path from './path.js'





/**
 * @typedef {object} LDTKTileset
 * @property {number} id The tileset ID.
 * @property {object} meta Metadata about the tileset.
 * @property {number} meta.columnCount The number of columns in the tileset.
 * @property {number} meta.rowCount The number of rows in the tileset.
 * @property {number} meta.tileCount The number of tiles in the tileset.
 * @property {null} spritesheet The number of tiles in the tileset.
 * @property {object} tile Global tile information.
 * @property {number} tile.height The height of tiles.
 * @property {number} tile.width The width of tiles.
 */

/**
 * @typedef {object} LDTKObject
 * @property {object[]} levels An array of levels.
 * @property {object} meta Metadata about the generated data.
 * @property {string} meta.app The app used to generate the data.
 * @property {string} meta.version The version of the app that was used to generate the data.
 * @property {{ [key: string]: LDTKTileset }} tilesets A mapping of tileset IDs to tilesets.
 */





/** @type {import('@pixi/assets').LoaderParser} */
export const LDTKLoader = {
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
		return checkExtension(url, '.ldtk')
	},

	/**
	 * Load a TMX file.
	 *
	 * @param {string} url The URL of the TMX file.
	 * @param {import('@pixi/assets').LoadAsset} asset The TMX file asset.
	 * @param {import('@pixi/assets').Loader} loader The loader being used to load this asset.
	 * @returns {Promise<*>} The loaded textures.
	 */
	async load(url, asset, loader) {
		const response = await settings.ADAPTER.fetch(url)

		const ldtkText = await response.text()
		const ldtkJSON = Convert.toCoordinate(ldtkText)

		/** @type {LDTKObject} */
		const ldtkObject = {
			levels: [],
			meta: {
				app: ldtkJSON.__header__.app,
				version: ldtkJSON.__header__.appVersion,
			},
			tilesets: {},
		}

		const assetBasePath = asset.src.replace(path.basename(asset.src), '')

		let tilesetIndex = 0

		while (tilesetIndex < ldtkJSON.defs.tilesets.length) {
			const tilesetData = ldtkJSON.defs.tilesets[tilesetIndex]

			if (!tilesetData.relPath) {
				tilesetIndex += 1
				continue
			}

			const columnCount = tilesetData.__cWid
			const rowCount = tilesetData.__cHei
			const tilesetSrc = path.join(assetBasePath, tilesetData.relPath)

			const texture = await loader.load({ src: tilesetSrc })

			const tileset = {
				id: tilesetData.uid,
				meta: {
					columnCount,
					rowCount,
					tileCount: columnCount * rowCount,
				},
				spritesheet: null,
				tile: {
					height: tilesetData.tileGridSize,
					width: tilesetData.tileGridSize,
				},
			}

			/** @type {import('pixi.js').ISpritesheetData} */
			const atlas = {
				frames: {},
				meta: {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					format: 'RGBA8888',
					image: tilesetSrc,
					size: {
						h: tilesetData.pxHei,
						w: tilesetData.pxWid,
					},
					scale: '1',
				},
				animations: {},
			}

			const totalTiles = tilesetData.__cHei * tilesetData.__cWid
			let tileIndex = 0

			while (tileIndex < totalTiles) {
				const column = tileIndex % columnCount
				const row = Math.floor(tileIndex / columnCount)

				atlas.frames[`${tileset.id}::${tileIndex}`] = {
					frame: {
						h: tilesetData.tileGridSize,
						w: tilesetData.tileGridSize,
						x: tilesetData.tileGridSize * column,
						y: tilesetData.tileGridSize * row,
					},
					sourceSize: {
						h: tilesetData.tileGridSize,
						w: tilesetData.tileGridSize,
					},
					spriteSourceSize: {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						h: tilesetData.tileGridSize,
						w: tilesetData.tileGridSize,
						x: 0,
						y: 0,
					},
				}

				tileIndex += 1
			}

			tileset.spritesheet = new Spritesheet(texture, atlas)
			await tileset.spritesheet.parse()

			ldtkObject.tilesets[tilesetData.uid] = tileset
			tilesetIndex += 1
		}

		let levelIndex = 0

		while (levelIndex < ldtkJSON.levels.length) {
			let levelMeta = ldtkJSON.levels[levelIndex]

			const level = {
				layers: [],
				name: levelMeta.identifier,
				worldPosition: {
					x: levelMeta.worldX,
					y: levelMeta.worldY,
				},
			}

			if (levelMeta.fieldInstances) {
				levelMeta.fieldInstances?.forEach(fieldInstance => {
					level[fieldInstance.__identifier] = fieldInstance.__value
				})
			}

			if (levelMeta.externalRelPath) {
				const levelSrc = path.join(assetBasePath, levelMeta.externalRelPath)

				const levelResponse = await settings.ADAPTER.fetch(levelSrc)
				levelMeta = await levelResponse.json()

				ldtkJSON.levels[levelIndex] = levelMeta

				levelIndex += 1
			}

			let layerIndex = 0

			while (layerIndex < levelMeta.layerInstances.length) {
				const layerData = levelMeta.layerInstances[layerIndex]

				const layer = {
					iid: layerData.iid,
					name: layerData.__identifier,
				}

				if (['IntGrid', 'Tiles'].includes(layerData.__type)) {
					const tilesetID = layerData.__tilesetDefUid
					const tileset = ldtkObject.tilesets[tilesetID]

					const tilesData = layerData.autoLayerTiles.length
						? layerData.autoLayerTiles
						: layerData.gridTiles

					layer.tiles = []

					tilesData.forEach(tileData => {
						const flipBit = tileData.f
						const tileID = tileData.t
						const tilePositionX = tileData.px[0]
						const tilePositionY = tileData.px[1]

						layer.tiles.push({
							alpha: tileData.a,
							flipX: [1, 3].includes(flipBit),
							flipY: [2, 3].includes(flipBit),
							height: tileset.tile.height,
							id: tileID,
							position: {
								x: tilePositionX / tileset.tile.width,
								y: tilePositionY / tileset.tile.height,
							},
							size: {
								height: tileset.tile.height,
								width: tileset.tile.width,
							},
							texture: getTileTextureFromTileset(tileID, tileset),
							tilesetID,
							width: tileset.tile.width,
						})
					})
				} else if (layerData.__type === 'Entities') {
					layer.entities = layerData.entityInstances.map(entityInstance => {
						const entity = {
							height: entityInstance.height,
							iid: entityInstance.iid,
							name: entityInstance.__identifier,
							position: {
								x: entityInstance.px[0],
								y: entityInstance.px[1],
							},
							tags: entityInstance.__tags,
							width: entityInstance.width,
						}

						entityInstance.fieldInstances.forEach(fieldInstance => {
							entity[fieldInstance.__identifier] = fieldInstance.__value
						})

						return entity
					})
				}

				level.layers.unshift(layer)
				layerIndex += 1
			}

			ldtkObject.levels.push(level)
		}

		return ldtkObject
	},
}
