// Module imports
import {
	AnimatedSprite,
	Assets,
	Container,
} from 'pixi.js'





// Local imports
import { store } from '../../store/store.js'





/**
 * @typedef SpriteState
 * @property {object} sprite Whether this sprite is animated.
 * @property {boolean} sprite.isAnimated Whether this sprite is animated.
 * @property {boolean} sprite.isStaged Whether this sprite has been added to the Pixi stage.
 * @property {Function} sprite.setAnimation Updates the animation being used for the sprite.
 * @property {import('pixi.js').Sprite} sprite.sprite The sprite to be rendered.
 * @property {import('pixi.js').Container} sprite.spriteContainer The container of the sprite; mostly used for positioning.
 */

/**
 * Marks whether an entity is renderable.
 *
 * @param {object} config All config.
 * @param {string} config.defaultAnimationName The default animation.
 * @param {Function} [config.onChange] A method to be run when the sprite is changed.
 * @param {import('pixi.js').Container} [spriteContainer] A pre-initialised container for this sprite.
 * @param {string} config.spritesheetName The name of the source spritesheet.
 * @returns {SpriteState} The entity's sprite state.
 */
export function spriteComponent(config) {
	const { viewport } = store.state

	const {
		defaultAnimationName,
		onChange,
		spriteContainer,
		spritesheetName,
	} = config

	const state = {
		isAnimated: true,
		isStaged: true,
		setAnimation: null,
		sprite: null,
		spriteContainer: spriteContainer ?? new Container,
	}

	const spriteCache = {}

	if (!viewport.children.includes(state.spriteContainer)) {
		viewport.addChild(state.spriteContainer)
	}

	/**
	 * Updates the current sprite/animation.
	 *
	 * @param {string} animationName The name of the animation to update to.
	 * @returns {boolean} Whether the animation was updated successfully.
	 */
	state.setAnimation = animationName => {
		if (!spriteCache[animationName]) {
			const spritesheet = Assets.get(spritesheetName)
			spriteCache[animationName] = new AnimatedSprite(spritesheet.animations[animationName])
		}

		const sprite = spriteCache[animationName]

		if (sprite === state.sprite) {
			return true
		}

		sprite.animationSpeed = 0.1666
		sprite.play()

		if (state.sprite) {
			state.sprite.gotoAndStop(0)
			state.spriteContainer.removeChild(state.sprite)
		}

		state.spriteContainer.addChild(sprite)

		if (typeof onChange === 'function') {
			onChange(state.sprite, sprite)
		}

		state.sprite = sprite

		return true
	}

	state.setAnimation(defaultAnimationName)

	return { sprite: state }
}
