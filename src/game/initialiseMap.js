// Module imports
import { Assets } from 'pixi.js'





// Local imports
import { renderMapLayers } from '../helpers/renderMapLayers.js'
import { store } from '../store/store.js'





/**
 * Creates and stores the map.
 */
export function initialiseMap() {
	const { viewport } = store.state

	const mapData = Assets.get('town-map')

	renderMapLayers(mapData.layers, viewport)

	store.set(() => ({ isMapInitialised: true }))
}
