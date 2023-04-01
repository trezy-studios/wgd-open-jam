// Local imports
import { createSelector } from './createSelector.js'
import { getRenderableEntities } from './getRenderableEntities.js'





/** Retrieves all entities which have a position. */
export const getPositionedEntities = createSelector(() => getRenderableEntities().with('position'))
