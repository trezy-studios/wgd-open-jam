// Module imports
import PropTypes from 'prop-types'





// Local imports
import '../scss/reset.scss'
import '../scss/app.scss'





/**
 * @component
 */
export default function App(props) {
	const {
		Component,
		pageProps,
	} = props

	return (
		<Component {...pageProps} />
	)
}

App.propTypes = {
	Component: PropTypes.any.isRequired,
	pageProps: PropTypes.object.isRequired,
}
