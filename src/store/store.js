// Module imports
import { makeStore } from 'statery'





// Local imports
import { Inventory } from '../game/Inventory.js'





export const store = makeStore({
	inventory: new Inventory,
	isPaused: false,
})
