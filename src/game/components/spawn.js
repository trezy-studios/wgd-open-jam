/**
 * Marks an entity as a spawn.
 *
 * @param {string} type Whether type of entity the spawn will spawn.
 * @returns {object} The entity's spawn state.
 */
export function spawn(type) {
	return {
		isSpawn: true,
		spawnType: type,
	}
}
