// Module imports
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





// Local imports
import styles from './Page.module.scss'





/**
 * Wrap normal pages (i.e. documents) with this component. The only page that _shouldn't_ be wrapped with this component is the game.
 *
 * @component
 */
export function Page(props) {
	const {
		children,
		className,
	} = props

	const compiledClassName = useMemo(() => {
		return classnames(className, styles['page'])
	}, [className])

	return (
		<div className={compiledClassName}>
			{children}
		</div>
	)
}

Page.defaultProps = {
	children: null,
	className: '',
}

Page.propTypes = {
	/** The contents of this component. */
	children: PropTypes.node,

	/** Additional classes to be applied. */
	className: PropTypes.string,
}
