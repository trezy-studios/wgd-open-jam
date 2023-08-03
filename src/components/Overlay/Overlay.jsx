// Module imports
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





// Local imports
import styles from './Overlay.module.scss'





/**
 * Renders the background for an overlay.
 *
 * @component
 */
export function Overlay(props) {
	const {
		children,
		isVisible,
	} = props

	const compiledClassName = useMemo(() => {
		return classnames({
			[styles['overlay']]: true,
			[styles['is-visible']]: isVisible,
		})
	}, [isVisible])

	return (
		<div className={compiledClassName}>
			<div className={styles['overlay-background']} />

			{children}
		</div>
	)
}

Overlay.defaultProps = {
	children: null,
	isVisible: false,
}

Overlay.propTypes = {
	children: PropTypes.node,
	isVisible: PropTypes.bool,
}
