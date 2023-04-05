export function basename(paths, extension) {
	const split = paths.split('/')

	let basename = split.pop()

	if (extension) {
		basename = basename.replace(new RegExp(extension.replace('.', '\\.', '')))
	}

	return basename.replace(/\/+$/, '')
}

export function join(...paths) {
	const parsedPaths = paths
		.reduce((accumulator, path) => {
			const normalisedPath = path
				.replace(/^\//, '')
				.replace(/\/$/, '')

			normalisedPath
				.split('/')
				.forEach(segment => {
					switch (segment) {
						case '..':
							accumulator.pop()
							break

						case '.':
							break

						default:
							accumulator.push(segment)
					}
				})

			return accumulator
		}, [])

	return `/${parsedPaths.join('/')}`
}
