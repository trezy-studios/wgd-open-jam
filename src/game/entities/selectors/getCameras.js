// Local imports
import { createSelector } from './createSelector.js'
import { store } from '../../../store/store.js'





/** Retrieves all camera entities. */
export const getCameras = createSelector(() => store.state.world.with('isCamera'))
