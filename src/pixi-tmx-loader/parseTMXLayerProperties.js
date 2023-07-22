/**
 * @typedef {{ [key: string]: * }} PropertiesObject
 */

/**
 * Parses a property's value based on its type.
 *
 * @param {PropertiesObject} accumulator The object on which parsed properties will be attached.
 * @param {Node} propertyNode The node representing the property data.
 * @returns {PropertiesObject} The accumulator, including the parsed property.
 */
function reduceProperty(accumulator, propertyNode) {
	const propertyName = propertyNode.getAttribute('name')
	const propertyType = propertyNode.getAttribute('type')
	let propertyValue = propertyNode.getAttribute('value')

	switch (propertyType) {
		case 'bool':
			if (propertyValue === 'true') {
				propertyValue = true
			} else if (propertyValue === 'false') {
				propertyValue = false
			}
			break

		case 'float':
			propertyValue = parseFloat(propertyValue)
			break

		case 'int':
			propertyValue = parseInt(propertyValue, 10)
			break

		default:
	}

	accumulator[propertyName] = propertyValue

	return accumulator
}

/**
 * Parses property nodes from a TMX layer.
 *
 * @param {Node} layerNode The node representing the layer.
 * @returns {PropertiesObject} The complete properties object.
 */
export function parseTMXLayerProperties(layerNode) {
	const propertyElements = Array.from(layerNode.querySelectorAll('properties > property'))
	const properties = {}

	Array.from(layerNode.attributes).forEach(attribute => {
		properties[attribute.name] = attribute.value
	})

	propertyElements.reduce(reduceProperty, properties)

	return properties
}
