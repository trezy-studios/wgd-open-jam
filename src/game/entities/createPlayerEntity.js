// Local imports
import { createActorEntity } from './createActorEntity.js'
import { store } from '../../store/store.js'





/**
 * Creates a new entity for the player's character.
 *
 * @returns {object} The new entity.
 */
export function createPlayerEntity() {
	const { world } = store.state

	const player = createActorEntity()

	player.size.height = 10
	player.size.width = 10
	player.velocity.speed = 2

	world.addComponent(player, 'isPlayer', true)

	return player
}
