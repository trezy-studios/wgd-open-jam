// Module imports
import { makeStore } from 'statery'





export const store = makeStore({
	/** @type {import('@hmans/controlfreak').Controller} */
	controller: null,

	/** @type {boolean} */
	isPaused: false,

	/** @type {object} */
	player: null,

	/** @type {import('pixi.js').Application} */
	pixiApp: null,

	/** @type {import('miniplex').World} */
	world: null,
})
