// Module imports
import { makeStore } from 'statery'





export const store = makeStore({
	/** @type {boolean} */
	areAssetsLoaded: false,

	/** @type {number} */
	assetLoadingProgress: 0,

	/** @type {null | object} */
	camera: null,

	/** @type {null | import('@hmans/controlfreak').Controller} */
	controller: null,

	/** @type {boolean} */
	isInitialising: false,

	/** @type {boolean} */
	isLoadingAssets: false,

	/** @type {boolean} */
	isMapInitialised: false,

	/** @type {boolean} */
	isPaused: false,

	/** @type {boolean} */
	isUploadingAssetsToGPU: false,

	/** @type {null | object} */
	player: null,

	/** @type {null | import('pixi.js').Application} */
	pixiApp: null,

	/** @type {null | import('pixi-viewport').Viewport} */
	viewport: null,

	/** @type {null | import('miniplex').World} */
	world: null,
})
