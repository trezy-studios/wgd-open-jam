// Local imports
import { createActorEntity } from './createActorEntity.js'
import { spriteComponent } from '../components/spriteComponent.js'
import { store } from '../../store/store.js'





/**
 * Creates a new entity for the player's character.
 *
 * @param {number} x The entity's initial X position.
 * @param {number} y The entity's initial Y position.
 * @param {import('pixi.js').Container} container The container i nwhich to render the entity.
 * @returns {object} The new entity.
 */
export function createPlayerEntity(x, y, container) {
	const { viewport } = store.state

	const player = createActorEntity(x, y, {
		isPlayer: true,
		...spriteComponent({
			defaultAnimationName: 'idle-south',
			spriteContainer: container,
			spritesheetName: 'player-spritesheet',
		}),
	})

	player.size.height = player.sprite.sprite.height
	player.size.width = player.sprite.sprite.width
	player.velocity.speed = 5

	viewport.follow(player.sprite.spriteContainer, {
		radius: 50,
		speed: 50,
	})

	store.set(() => ({ player }))

	return player
}
