// Module imports
import { DndProvider } from 'react-dnd'
import dynamic from 'next/dynamic'
import { HTML5Backend } from 'react-dnd-html5-backend'





// Dynamic imports
const Game = dynamic(() => {
	return import('../Game/Game.jsx')
		.then(mod => mod.Game)
}, { ssr: false })





/**
 * Renders necessary components for the game.
 *
 * @component
 */
export function GamePage() {
	return (
		<DndProvider backend={HTML5Backend}>
			<Game />
		</DndProvider>
	)
}
