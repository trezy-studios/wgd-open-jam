// Module imports
import classnames from 'classnames'
import Image from 'next/image.js'
import { useRouter } from 'next/router.js'





// Local imports
import styles from './Banner.module.scss'

import BrandImage from '../../../public/brand/brand.png'
import { Link } from '../Link/Link.jsx'
import { useMemo } from 'react'





// Constants
const LINKS = [
	{
		label: 'Home',
		path: '/',
	},
	{
		label: 'Play',
		path: '/play',
	},
]





/**
 * The main navigation tool for the website.
 *
 * @component
 */
export function Banner() {
	const router = useRouter()

	const mappedLinks = useMemo(() => {
		return LINKS.map(link => {
			const className = classnames({
				[styles['is-active']]: router.asPath === link.path,
			})

			return (
				<Link
					key={`${link.path}-${link.label}`}
					className={className}
					href={link.path}>
					<span>
						{link.label}
					</span>
				</Link>
			)
		})
	}, [router])

	return (
		<div
			className={styles['banner']}
			role={'banner'}>
			<Link
				className={styles['brand']}
				href={'/'}>
				<Image
					alt={'Crafty'}
					fill
					priority
					quality={100}
					src={BrandImage} />
			</Link>

			<nav className={styles['site-nav']}>
				{mappedLinks}
			</nav>
		</div>
	)
}
