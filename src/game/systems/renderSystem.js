// Local imports
// import { advanceFrame } from '../../store/helpers/advanceFrame.js'
import { getRenderableEntities } from '../entities/selectors/getRenderableEntities.js'
// import { prepareCanvas } from '../helpers/prepareCanvas.js'
// import { renderEntity } from '../helpers/renderEntity.js'
// import { renderMap } from '../helpers/renderMap.js'
import { store } from '../../store/store.js'





/** Renders the game. */
export function renderSystem() {
	const {
		// entityRenderOrder,
		viewport,
	} = store.state

	// prepareCanvas()

	// renderMap()

	const renderableEntitites = getRenderableEntities()

	for (const entity of renderableEntitites) {
		if (!entity.sprite.isStaged) {
			viewport.addChild(entity.sprite.spriteContainer)
			entity.sprite.isStaged = true
		}

		const horizontalMovement = entity.position.x - entity.sprite.spriteContainer.x
		const verticalMovement = entity.position.y - entity.sprite.spriteContainer.y

		if (entity.isPlayer && entity.sprite.isAnimated) {
			let animationDirection = 'south'
			let animationName = 'idle'

			if (horizontalMovement || verticalMovement) {
				animationName = 'walk'
			}

			if (verticalMovement < 0) {
				animationDirection = 'north'
			}

			if (horizontalMovement < 0) {
				entity.sprite.sprite.anchor.x = 1
				entity.sprite.sprite.scale.x = Math.abs(entity.sprite.sprite.scale.x) * -1
			} else if (horizontalMovement > 0) {
				entity.sprite.sprite.anchor.x = 0
				entity.sprite.sprite.scale.x = Math.abs(entity.sprite.sprite.scale.x)
			}

			entity.sprite.setAnimation(`${animationName}-${animationDirection}`)
		}

		entity.sprite.spriteContainer.x = entity.position.x
		entity.sprite.spriteContainer.y = entity.position.y
	}
}
