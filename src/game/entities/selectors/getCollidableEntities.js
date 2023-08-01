// Local imports
import { createSelector } from './createSelector.js'
import { store } from '../../../store/store.js'





/** Retrieves all renderable entities. */
export const getCollidableEntities = createSelector(() => store.state.world.with('collisionBody'))
