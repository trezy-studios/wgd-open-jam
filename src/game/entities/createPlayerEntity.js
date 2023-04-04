// Local imports
import { createActorEntity } from './createActorEntity.js'
import { spriteComponent } from '../components/spriteComponent.js'
import { store } from '../../store/store.js'





/**
 * Creates a new entity for the player's character.
 *
 * @returns {object} The new entity.
 */
export function createPlayerEntity() {
	const { viewport } = store.state

	const player = createActorEntity({
		isPlayer: true,
		...spriteComponent({
			defaultAnimationName: 'idle-south',
			onChange: (oldSprite, newSprite) => {
				viewport.follow(newSprite, {
					radius: 50,
					speed: 50,
				})
			},
			spritesheetName: 'player-spritesheet',
		}),
	})

	player.size.height = player.sprite.sprite.height
	player.size.width = player.sprite.sprite.width
	player.velocity.speed = 0.4

	return player
}
