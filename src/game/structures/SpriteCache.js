/**
 * Manages sprites across the application.
 */
export class SpriteCache {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	/** @type {Map<string,HTMLImageElement>} */
	#imageCache = new Map





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	/**
	 * Retrieves an image component for a given path.
	 *
	 * @param {string} url The image URL.
	 * @returns {Promise<HTMLImageElement>} The retrieved element.
	 */
	async getSpritesheet(url) {
		let imageElement = this.#imageCache.get(url)

		if (!imageElement) {
			imageElement = new Image
			imageElement.src = url

			await imageElement.decode()

			this.#imageCache.set(url, imageElement)
		}

		return imageElement
	}
}
