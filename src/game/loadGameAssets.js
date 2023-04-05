// Module imports
import { Assets } from 'pixi.js'





// Local imports
import { ASSET_MANIFEST } from './ASSET_MANIFEST.js'
import { store } from '../store/store.js'





/**
 * Handles loading all initial game assets.
 */
export async function loadGameAssets() {
	const bundles = []

	let { pixiApp } = store.state

	const bundleNames = ASSET_MANIFEST.bundles.map(bundle => bundle.name)

	store.set(() => ({ isInitialising: true }))

	await Assets.init({ manifest: ASSET_MANIFEST })

	store.set(() => ({
		isLoadingAssets: true,
		isInitialising: false,
	}))

	let bundleIndex = 0

	/**
	 * Updates the global asset loading progress state.
	 *
	 * @param {number} progress The progress of the current bundle.
	 */
	const handleProgress = progress => {
		store.set(() => {
			const cumulativeProgress = bundleIndex + progress
			const totalProgress = cumulativeProgress / bundleNames.length

			return { assetLoadingProgress: totalProgress }
		})
	}

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
