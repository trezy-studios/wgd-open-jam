// Module imports
import fs from 'node:fs/promises'
import path from 'node:path'





async function findSpritesheets(rootPath, spritesheetsCollection = []) {
	const directoryContents = await fs.readdir(rootPath)

	directoryContents
		.filter(item => (path.extname(item) === '.json'))
		.forEach(item => spritesheetsCollection.push(path.join(rootPath, item)))

	let index = 0

	while (index < directoryContents.length) {
		const item = directoryContents[index]
		const itemPath = path.join(rootPath, item)
		const itemStats = await fs.stat(itemPath)

		if (itemStats.isDirectory()) {
			await findSpritesheets(itemPath, spritesheetsCollection)
		}

		index += 1
	}

	return spritesheetsCollection
}

const spritesheetsRootPath = path.resolve(process.cwd(), 'public', 'sprites')

const spritesheetPaths = await findSpritesheets(spritesheetsRootPath)

const spritesheetsAsText = await Promise.all(spritesheetPaths.map(itemPath => {
	return fs.readFile(itemPath, 'utf8')
}))

const spritesheets = spritesheetsAsText.map(item => {
	const parsedSpritesheet = JSON.parse(item)
	const spriteFrames = Object.keys(parsedSpritesheet.frames)

	parsedSpritesheet.animations = {}

	for (const tag of parsedSpritesheet.meta.frameTags) {
		const frames = []

		let index = tag.from

		while (index < tag.to) {
			frames.push(spriteFrames[index])
			index += 1
		}

		if (tag.direction === 'pingpong') {
			while (index > tag.from) {
				frames.push(spriteFrames[index])
				index -= 1
			}
		}

		parsedSpritesheet.animations[tag.name] = frames
	}

	return parsedSpritesheet
})

let spritesheetIndex = 0

while (spritesheetIndex < spritesheets.length) {
	const spritesheet = spritesheets[spritesheetIndex]
	const spritesheetPath = spritesheetPaths[spritesheetIndex]

	await fs.writeFile(spritesheetPath, JSON.stringify(spritesheet), 'utf8')

	spritesheetIndex += 1
}
