// Module imports
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import PropTypes from 'prop-types'
import { useStore } from 'statery'





// Local imports
import styles from './Sprite.module.scss'

import { store } from '../../store/store.js'





/**
 * Renders a sprite from a spritesheet.
 *
 * @component
 * @param {object} props All props.
 */
export function Sprite(props) {
	const {
		height,
		url,
		width,
		x,
		y,
	} = props

	const { spriteCache } = useStore(store)

	const [isRendered, setIsRendered] = useState(false)
	const [isRendering, setIsRendering] = useState(false)

	const canvasRef = useRef(null)

	const renderSprite = useCallback(async() => {
		setIsRendering(true)

		if (canvasRef.current) {
			const spritesheet = await spriteCache.getSpritesheet(url)
			const canvasElement = /** @type {HTMLCanvasElement} */ (canvasRef.current)

			canvasElement.width = (width * window.devicePixelRatio) * 0.5
			canvasElement.height = (height * window.devicePixelRatio) * 0.5

			const context = canvasElement.getContext('2d', { alpha: true })

			context.drawImage(spritesheet, x, y, width, height, 0, 0, width, height)

			setIsRendered(true)
		}

		setIsRendering(false)
	}, [
		height,
		setIsRendered,
		setIsRendering,
		spriteCache,
		url,
		width,
		x,
		y,
	])

	const containerProps = useMemo(() => {
		return {
			className: styles['sprite-container'],
			style: {
				height: height * 4,
				width: width * 4,
			},
		}
	}, [
		height,
		width,
	])

	useEffect(() => {
		if (!isRendered && !isRendering) {
			renderSprite()
		}
	}, [
		isRendered,
		isRendering,
		renderSprite,
	])

	return (
		<div {...containerProps}>
			<canvas
				ref={canvasRef}
				className={styles['sprite']} />
		</div>
	)
}

Sprite.defaultProps = {
	height: 8,
	width: 8,
}

Sprite.propTypes = {
	height: PropTypes.number,
	url: PropTypes.string.isRequired,
	width: PropTypes.number,
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
}
