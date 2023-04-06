// Module imports
import {
	AnimatedSprite,
	Assets,
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
 */

/**
 * Marks whether an entity is renderable.
 *
 * @param {object} options All options.
 * @param {string} options.defaultAnimationName The default animation.
 * @param {string} [options.onChange] A method to be run when the sprite is changed.
 * @param {string} options.spritesheetName The name of the source spritesheet.
 * @returns {SpriteState} The entity's sprite state.
 */
export function spriteComponent(options) {
	const {
		defaultAnimationName,
		onChange,
		spritesheetName,
	} = options

	const state = {
		isAnimated: true,
		isStaged: true,
		setAnimation: null,
		sprite: null,
	}
	const spriteCache = {}

	/**
	 * Updates the current sprite/animation.
	 *
	 * @param {string} animationName The name of the animation to update to.
	 * @returns {boolean} Whether the animation was updated successfully.
	 */
	state.setAnimation = animationName => {
		const { viewport } = store.state

		if (!spriteCache[animationName]) {
			const spritesheet = Assets.get(spritesheetName)
			spriteCache[animationName] = new AnimatedSprite(spritesheet.animations[animationName])
		}

		const sprite = spriteCache[animationName]

		if (sprite === state.sprite) {
			return true
		}

		sprite.anchor.set(0.5, 0.5)
		sprite.animationSpeed = 0.1666
		sprite.play()

		if (state.sprite) {
			state.sprite.gotoAndStop(0)
			viewport.removeChild(state.sprite)
		}

		viewport.addChild(sprite)

		if (typeof onChange === 'function') {
			onChange(state.sprite, sprite)
		}

		state.sprite = sprite

		return true
	}

	state.setAnimation(defaultAnimationName)

	return {
		sprite: state,
	}
}
