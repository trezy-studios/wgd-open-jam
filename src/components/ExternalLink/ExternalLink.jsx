// Module imports
import PropTypes from 'prop-types'





/**
 * Renders a link to another domain.
 *
 * @component
 */
export function ExternalLink(props) {
	const {
		className,
		children,
		rel,
	} = props

	return (
		// eslint-disable-next-line react/forbid-elements
		<a
			{...props}
			className={className}
			rel={`noopener noreferrer ${rel}`}
			target={'_blank'}>
			{children}
		</a>
	)
}

ExternalLink.defaultProps = {
	className: '',
	href: '',
	rel: '',
}

ExternalLink.propTypes = {
	/** The contents of the component. */
	children: PropTypes.node.isRequired,

	/** Additional classes to be applied to the component. */
	className: PropTypes.string,

	/** The URL to which this link points. */
	href: PropTypes.string,

	/** The relationship of the linked domain. */
	rel: PropTypes.string,
}
