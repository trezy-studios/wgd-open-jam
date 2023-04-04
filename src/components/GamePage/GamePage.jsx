// Module imports
import dynamic from 'next/dynamic'





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
		<Game />
	)
}
