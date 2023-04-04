// Module imports
import { makeStore } from 'statery'





export const store = makeStore({
	/** @type {boolean} */
	areAssetsLoaded: false,

	/** @type {number} */
	assetLoadingProgress: 0,

	/** @type {object} */
	camera: null,

	/** @type {import('@hmans/controlfreak').Controller} */
	controller: null,

	/** @type {boolean} */
	isInitialising: false,

	/** @type {boolean} */
	isLoadingAssets: false,

	/** @type {boolean} */
	isPaused: false,

	/** @type {boolean} */
	isUploadingAssetsToGPU: false,

	/** @type {import('pixi.js').TilingSprite} */
	map: null,

	/** @type {object} */
	player: null,

	/** @type {import('pixi.js').Application} */
	pixiApp: null,

	/** @type {import('pixi-viewport').Viewport} */
	viewport: null,

	/** @type {import('miniplex').World} */
	world: null,
})
