// Local imports
import { createActorEntity } from './createActorEntity.js'
import { spriteComponent } from '../components/spriteComponent.js'
import { store } from '../../store/store.js'





/**
 * Creates a new entity for the player's character.
 *
 * @param {number} x The entity's initial X position.
 * @param {number} y The entity's initial X position.
 * @returns {object} The new entity.
 */
export function createPlayerEntity(x, y) {
	const {
		playerContainer,
		viewport,
	} = store.state

	const player = createActorEntity(x, y, {
		isPlayer: true,
		...spriteComponent({
			defaultAnimationName: 'idle-south',
			spriteContainer: playerContainer,
			spritesheetName: 'player-spritesheet',
		}),
	})

	player.size.height = player.sprite.sprite.height
	player.size.width = player.sprite.sprite.width
	player.velocity.speed = 3

	viewport.follow(player.sprite.spriteContainer, {
		radius: 50,
		speed: 50,
	})

	return player
}
