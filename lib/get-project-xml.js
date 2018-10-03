expect.addSnapshotSerializer({
	test: value => typeof value === 'string' && value.includes('<Projects>'),
	print: xml => xml,
})

const getProjectXML = (props = {}) => {
	const attributes = Object.entries(props)
		.map(([key, value]) => `${key}="${value.replace(/"/g, '&quot;')}"`)
		.join(' ')
	return `<Projects><Project ${attributes}/></Projects>`
}

module.exports = getProjectXML
