/**
 * Retrieves the texture for a tile from a tileset.
 *
 * @param {string} tileID The ID of the tile.
 * @param {*} tileset The tileset to retrieve the texture from.
 * @returns {import('pixi.js').Texture} The tile texture.
 */
export function getTileTextureFromTileset(tileID, tileset) {
	const compiledIDString = `${tileset.id}::${tileID}`
	return tileset.spritesheet.textures[compiledIDString]
}