// Local imports
// import { getCameras } from '../entities/selectors/getCameras.js'
// import { getPlayers } from '../entities/selectors/getPlayers.js'
// import { store } from '../../store/store.js'





/** Updates the camera's position based on the player character's position. */
export function cameraSystem() {
	// const { canvas } = store.state

	// for (const camera of getCameras()) {
	// 	camera.size.height = canvas.height
	// 	camera.size.width = canvas.width

	// 	const focusArea = {
	// 		height: null,
	// 		width: null,
	// 		x: null,
	// 		y: null,
	// 	}

	// 	for (const player of getPlayers()) {
	// 		if (!focusArea.x) {
	// 			focusArea.x = player.position.x
	// 		} else {
	// 			focusArea.x = Math.min(focusArea.x, player.position.x)
	// 		}

	// 		if (!focusArea.y) {
	// 			focusArea.y = player.position.y
	// 		} else {
	// 			focusArea.y = Math.min(focusArea.y, player.position.y)
	// 		}

	// 		if (!focusArea.width) {
	// 			focusArea.width = player.size.width
	// 		} else {
	// 			focusArea.width = Math.max(focusArea.width, focusArea.x + player.size.width)
	// 		}

	// 		if (!focusArea.height) {
	// 			focusArea.height = player.size.height
	// 		} else {
	// 			focusArea.height = Math.max(focusArea.height, focusArea.y + player.size.height)
	// 		}
	// 	}

	// 	const centerPoint = {
	// 		x: focusArea.x + (focusArea.width / 2),
	// 		y: focusArea.y + (focusArea.height / 2),
	// 	}

	// 	camera.position.x = (camera.size.width / 2) - (centerPoint.x * 2)
	// 	camera.position.y = (camera.size.height / 2) - (centerPoint.y * 2)
	// }
}
