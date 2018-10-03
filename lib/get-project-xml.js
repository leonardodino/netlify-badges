const serialize = ([key, value]) => `${key}="${value.replace(/"/g, '&quot;')}"`

const getProjectXML = props => {
	const attributes = Object.entries(props || {}).map(serialize).join(' ')
	return `<Projects><Project ${attributes}/></Projects>`
}

module.exports = getProjectXML
