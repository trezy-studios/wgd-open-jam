// Local imports
import { getPlayers } from '../entities/selectors/getPlayers.js'
import { store } from '../../store/store.js'





/** Updates the player character's position based on controller inputs. */
export function controllerSystem() {
	const { controller } = store.state

	controller.update()

	for (const player of getPlayers()) {
		player.velocity.x = controller.controls.move.value.x * player.velocity.speed
		player.velocity.y = controller.controls.move.value.y * player.velocity.speed
	}
}
