// Local imports
import { createSelector } from './createSelector.js'
import { store } from '../../../store/store.js'





/** Retrieves all player entities. */
export const getPlayers = createSelector(() => store.state.world.with('isPlayer'))
