/**
 * Parses an XML string into a DOM tree.
 *
 * @param {string} xmlString The string to be parsed.
 * @returns {Document} The parsed XML DOM tree.
 */
export function parseXML(xmlString) {
	const parser = new DOMParser

	const result = parser.parseFromString(xmlString, 'text/xml')

	const errorNode = result.querySelector('parsererror')

	if (errorNode) {
		throw new Error('error while parsing XML', errorNode.innerHTML)
	}

	const rootNode = result.documentElement

	return rootNode
}
