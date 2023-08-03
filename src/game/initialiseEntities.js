// Module imports
import { Assets } from 'pixi.js'





// Local imports
import { createCollider } from './physics/createCollider.js'
import { createSpawnEntity } from './entities/createSpawnEntity.js'
import { createStaticBody } from './physics/createRigidBody.js'
import { createTriggerEntity } from './entities/createTriggerEntity.js'
import { store } from '../store/store.js'





/**
 * Creates and stores the map.
 */
export function initialiseEntities() {
	const { viewport } = store.state

	const mapData = Assets.get('world')

	const { levels } = mapData

	levels.forEach(level => {
		level.layers.forEach((layer, layerIndex) => {
			if (layer.entities) {
				const layerContainer = viewport.getChildAt(layerIndex)

				layer.entities.forEach(entity => {
					switch (entity.EntityType) {
						case 'Collision': {
							const staticBody = createStaticBody(
								(entity.position.x) + (entity.width / 2) + level.worldPosition.x,
								(entity.position.y) + (entity.height / 2) + level.worldPosition.y,
							)

							createCollider('rectangle', {
								height: entity.height,
								width: entity.width,
							}, staticBody)
							break
						}

						case 'Spawn':
							createSpawnEntity(
								entity.position.x,
								entity.position.y,
								entity.SpawnType,
								layerContainer,
							)
							break

						case 'Trigger':
							createTriggerEntity(entity, level)
							break

						default:
					}
				})
			}
		})
	})

	store.set(() => ({ isEntitiesInitialised: true }))
}
