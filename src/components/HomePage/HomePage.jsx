// Local imports
import styles from './HomePage.module.scss'

import { Page } from '../Page/Page.jsx'





/** @component */
export function HomePage() {
	return (
		<Page className={styles['home-page']}>
			<div className={styles['hero']}>
				{'Hello world!'}
			</div>
		</Page>
	)
}
