// Local imports
import { createSelector } from './createSelector.js'
import { getPositionedEntities } from './getPositionedEntities.js'





/** Retrieves all entities which are capable of moving. */
export const getMovingEntities = createSelector(() => getPositionedEntities().with('velocity'))
