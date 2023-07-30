// Module imports
import { Assets } from 'pixi.js'





// Local imports
import { createMapLayers } from '../helpers/createMapLayers.js'
import { store } from '../store/store.js'





/**
 * Creates and stores the map.
 */
export function initialiseMap() {
	const { viewport } = store.state

	const mapData = Assets.get('world')

	createMapLayers(mapData, viewport)

	store.set(() => ({ isMapInitialised: true }))
}
