// Local imports
import { store } from '../store/store.js'





export function gameLoop() {
	const { isPaused } = store.state

	if (isPaused) {
		return
	}
}
