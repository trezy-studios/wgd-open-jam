// Local imports
import { createSelector } from './createSelector.js'
import { store } from '../../../store/store.js'





/** Retrieves all renderable entities. */
export const getRenderableEntities = createSelector(() => store.state.world.with('isRenderable'))
