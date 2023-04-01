// Module imports
import { makeStore } from 'statery'





export const store = makeStore({
	/** @type {boolean} */
	isPaused: false,

	player: null,

	/** @type {import('pixi.js').Application} */
	pixiApp: null,

	/** @type {import('miniplex').World} */
	world: null,
})
