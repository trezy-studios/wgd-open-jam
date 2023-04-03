// Module imports
import {
	Application,
	Assets,
	BaseTexture,
	SCALE_MODES,
} from 'pixi.js'





// Local imports
import { ASSET_MANIFEST } from './ASSET_MANIFEST.js'
import { store } from '../store/store.js'





/**
 * Handles loading all initial game assets.
 */
export async function loadGameAssets() {
	const bundles = []

	let { pixiApp } = store.state

	if (!pixiApp) {
		BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST
		pixiApp = new Application({
			antialias: false,
			autoDensity: true,
			resolution: window.devicePixelRatio || 1,
		})
		pixiApp.stage.setTransform(
			0,
			0,
			4,
			4,
			0,
			0,
			0,
			0,
			0,
		)

		store.set(() => ({ pixiApp }))
	}

	const bundleNames = ASSET_MANIFEST.bundles.map(bundle => bundle.name)

	store.set(() => ({ isInitialising: true }))

	await Assets.init({ manifest: ASSET_MANIFEST })

	store.set(() => ({
		isLoadingAssets: true,
		isInitialising: false,
	}))

	let bundleIndex = 0

	// eslint-disable-next-line jsdoc/require-returns
	/**
	 * Updates the global asset loading progress state.
	 *
	 * @param {number} progress The progress of the current bundle.
	 */
	const handleProgress = progress => store.set(() => {
		const cumulativeProgress = bundleIndex + progress
		const totalProgress = cumulativeProgress / bundleNames.length

		return { assetLoadingProgress: totalProgress }
	})

	while (bundleIndex < bundleNames.length) {
		const bundleName = bundleNames[bundleIndex]

		const bundle = await Assets.loadBundle(bundleName, handleProgress)
		bundles.push(bundle)

		bundleIndex += 1
	}

	store.set(() => ({
		assetLoadingProgress: bundleNames.length,
		isLoadingAssets: false,
		isUploadingAssetsToGPU: true,
	}))

	await pixiApp.renderer.prepare.upload(pixiApp.stage)

	store.set(() => ({
		areAssetsLoaded: true,
		isUploadingAssetsToGPU: false,
	}))
}