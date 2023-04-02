// Module imports
import { makeStore } from 'statery'





export const store = makeStore({
	/** @type {boolean} */
	areAssetsLoaded: false,

	/** @type {number} */
	assetLoadingProgress: 0,

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

	/** @type {object} */
	player: null,

	/** @type {import('pixi.js').Application} */
	pixiApp: null,

	/** @type {import('miniplex').World} */
	world: null,
})
