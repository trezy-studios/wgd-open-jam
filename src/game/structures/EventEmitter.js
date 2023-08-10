/**
 * An entity that emits events.
 */
export class EventEmitter {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	#listeners = {}





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	/**
	 * Triggers an event.
	 *
	 * @param {string} eventName The name of the event to be triggered.
	 * @param {*} [data] Data to be passed to listeners for this event.
	 */
	emit(eventName, data) {
		if (!this.#listeners[eventName]) {
			return
		}

		this.#listeners[eventName]?.forEach(listener => listener(data))
	}

	/**
	 * Attaches an event listener.
	 *
	 * @param {string} eventName The name of the event to remove the listener from.
	 * @param {Function} callback The listener to be removed.
	 */
	off(eventName, callback) {
		if (!this.#listeners[eventName]) {
			return
		}

		const listenerIndex = this.#listeners[eventName].findIndex(listener => {
			if (listener === callback) {
				return true
			}

			if (listener.originalCallback === callback) {
				return true
			}

			return false
		})

		if (listenerIndex > -1) {
			this.#listeners[eventName].splice(listenerIndex, 1)
		}
	}

	/**
	 * Attaches an event listener.
	 *
	 * @param {string} eventName The name of the event to listen for.
	 * @param {Function} callback The listener to be executed when the event is triggered.
	 */
	on(eventName, callback) {
		if (!this.#listeners[eventName]) {
			this.#listeners[eventName] = []
		}

		this.#listeners[eventName].push(callback)
	}

	/**
	 * Attaches an event listener that will be removed immediatley after the next time the event is triggered.
	 *
	 * @param {string} eventName The name of the event to listen for.
	 * @param {Function} callback The listener to be executed when the event is triggered.
	 */
	once(eventName, callback) {
		// eslint-disable-next-line jsdoc/require-jsdoc
		const listener = () => {
			callback()
			this.off(eventName, listener)
		}

		listener.originalCallback = callback

		this.on(eventName, listener)
	}
}
