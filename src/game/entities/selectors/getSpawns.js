// Local imports
import { createSelector } from './createSelector.js'
import { store } from '../../../store/store.js'





/** Retrieves all spawn entities. */
export const getSpawns = createSelector(() => store.state.world.with('isSpawn'))
