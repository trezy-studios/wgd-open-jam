// Module imports
import classnames from 'classnames'
import NextLink from 'next/link.js'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





// Local imports
import styles from './Link.module.scss'

import { ExternalLink } from '../ExternalLink/ExternalLink.jsx'





/**
 * Handles ambiguous links, wrapping them with whichever component is most appropriate.
 *
 * @component
 */
export function Link(props) {
	const {
		children,
		className,
		href,
		// isAuxiliary,
		// isButton,
		// isLink,
		// isPrimary,
	} = props

	const compiledClassName = useMemo(() => {
		return classnames(className, styles['link'], {
			// [buttonStyles.button]: isButton,
			// [buttonStyles['is-auxiliary']]: isButton && isAuxiliary,
			// [buttonStyles['is-link']]: isButton && isLink,
			// [buttonStyles['is-primary']]: isButton && isPrimary,
		})
	}, [
		className,
		// isAuxiliary,
		// isButton,
		// isLink,
		// isPrimary,
	])

	// eslint-disable-next-line security/detect-unsafe-regex
	if (/^(?:https?:)?\/\//u.test(href)) {
		return (
			<ExternalLink
				className={compiledClassName}
				href={href}>
				{children}
			</ExternalLink>
		)
	}

	return (
		<NextLink
			className={compiledClassName}
			href={href}>
			{children}
		</NextLink>
	)
}

Link.defaultProps = {
	children: null,
	className: '',
	// isAuxiliary: false,
	// isButton: false,
	// isLink: false,
	// isPrimary: false,
}

Link.propTypes = {
	/** The contents of the component. */
	children: PropTypes.node,

	/** Additional classes to be applied to the component. */
	className: PropTypes.string,

	/** The URL to which this link leads. */
	href: PropTypes.string.isRequired,

	// /** Whether or not this link is used for an auxiliary action (only valid if `isButton` is true). */
	// isAuxiliary: PropTypes.bool,

	// /** Whether or not this component should look like a button. */
	// isButton: PropTypes.bool,

	// /** Whether or not this link should look like a link (only valid if `isButton` is true). */
	// isLink: PropTypes.bool,

	// /** Whether or not this link is used for a primary action (only valid if `isButton` is true). */
	// isPrimary: PropTypes.bool,
}
