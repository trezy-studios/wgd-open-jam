// Module imports
import { Container } from 'pixi.js'





// Local imports
import { animatedSpriteComponent } from '../components/animatedSpriteComponent.js'
import { createActorEntity } from './createActorEntity.js'
import { Item } from '../structures/Item.js'
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
	const {
		colliderMap,
		viewport,
	} = store.state

	const spriteContainer = new Container
	const player = createActorEntity({
		components: {
			isPlayer: true,
			...animatedSpriteComponent({
				defaultAnimationName: 'idle-south',
				spriteContainer,
				spritesheetName: 'player-spritesheet',
			}),
		},
		inventory: {
			contents: {
				0: new Item('sword'),
				3: new Item('axe'),
			},
		},
		x,
		y,
	})

	container.addChild(spriteContainer)

	player.size.height = player.sprite.sprite.height
	player.size.width = player.sprite.sprite.width
	player.velocity.speed = 5

	viewport.follow(player.sprite.spriteContainer, {
		radius: 50,
		speed: 50,
	})

	colliderMap.set(player.collisionBody, player)

	store.set(() => ({ player }))

	return player
}
