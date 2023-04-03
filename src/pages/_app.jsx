// Module imports
import PropTypes from 'prop-types'





// Local imports
import '../scss/reset.scss'
import '../scss/app.scss'

import { Banner } from '../components/Banner/Banner.jsx'





/**
 * @component
 */
export default function App(props) {
	const {
		Component,
		pageProps,
	} = props

	return (
		<>
			<Banner />
			<Component {...pageProps} />
		</>
	)
}

App.propTypes = {
	Component: PropTypes.any.isRequired,
	pageProps: PropTypes.object.isRequired,
}
