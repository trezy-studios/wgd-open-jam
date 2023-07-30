// Module imports
import { Assets } from 'pixi.js'





// Local imports
import { createCollider } from './physics/createCollider.js'
import { createSpawnEntity } from './entities/createSpawnEntity.js'
import { createStaticBody } from './physics/createRigidBody.js'
import { store } from '../store/store.js'





/**
 * Creates and stores the map.
 */
export function initialiseEntities() {
	const { viewport } = store.state

	const mapData = Assets.get('world')

	const level = mapData.levels[0]

	level.layers.forEach((layer, layerIndex) => {
		if (layer.entities) {
			const layerContainer = viewport.getChildAt(layerIndex)

			layer.entities.forEach(entity => {
				switch (entity.EntityType) {
					case 'Spawn':
						createSpawnEntity(
							entity.position.x,
							entity.position.y,
							entity.SpawnType,
							layerContainer,
						)
						break

					case 'Collision': {
						const staticBody = createStaticBody(
							(entity.position.x) + (entity.width / 2),
							(entity.position.y) + (entity.height / 2),
						)

						createCollider('rectangle', {
							height: entity.height,
							width: entity.width,
						}, staticBody)
						break
					}

					default:
				}
			})
		}
	})

	store.set(() => ({ isEntitiesInitialised: true }))
}
