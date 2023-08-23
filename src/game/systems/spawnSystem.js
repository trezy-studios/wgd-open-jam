// Local imports
import { createPlayerEntity } from '../entities/createPlayerEntity.js'
import { getSpawns } from '../entities/selectors/getSpawns.js'
import { store } from '../../store/store.js'





/** Moves entities based on their velocity. */
export function spawnSystem() {
	for (const properties of getSpawns()) {
		const {
			position,
			spawnType,
			spriteContainer,
		} = properties

		const { player } = store.state

		if ((spawnType === 'player') && !player) {
			createPlayerEntity(
				position.x,
				position.y,
				spriteContainer,
			)
		}
	}
}
