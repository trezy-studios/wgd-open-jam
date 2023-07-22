/**
 * Generates static bodies for objects in a TMX file.
 *
 * @param {Node} dom The DOM of the TMX.
 * @returns {{
 * 	height: number,
 * 	width: number,
 * 	x: number,
 * 	y: number,
 * }} An object representing the size and position of the static body.
 */
export function parseTMXObjects(dom) {
	const objectNodes = Array.from(dom.querySelectorAll('objectgroup > object'))

	return objectNodes.map(objectNode => ({
		height: Number(objectNode.getAttribute('height')),
		width: Number(objectNode.getAttribute('width')),
		x: Number(objectNode.getAttribute('x')),
		y: Number(objectNode.getAttribute('y')),
	}))
}
