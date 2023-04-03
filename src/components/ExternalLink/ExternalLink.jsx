// Module imports
import PropTypes from 'prop-types'





/**
 * Renders a link to another domain.
 *
 * @component
 */
export function ExternalLink(props) {
	const {
		children,
		rel,
	} = props

	return (
		// eslint-disable-next-line react/forbid-elements
		<a
			{...props}
			rel={`noopener noreferrer ${rel}`}
			target={'_blank'}>
			{children}
		</a>
	)
}

ExternalLink.defaultProps = {
	rel: '',
}

ExternalLink.propTypes = {
	/** The contents of the component. */
	children: PropTypes.node.isRequired,

	/** The relationship of the linked domain. */
	rel: PropTypes.string,
}
