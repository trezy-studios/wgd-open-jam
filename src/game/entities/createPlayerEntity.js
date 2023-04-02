// Local imports
import { createActorEntity } from './createActorEntity.js'
import { spriteComponent } from '../components/spriteComponent.js'





/**
 * Creates a new entity for the player's character.
 *
 * @returns {object} The new entity.
 */
export function createPlayerEntity() {
	const player = createActorEntity({
		isPlayer: true,
		...spriteComponent('player-spritesheet', 'idle-south'),
	})

	player.size.height = player.sprite.sprite.height
	player.size.width = player.sprite.sprite.width
	player.velocity.speed = 1

	return player
}
