const s = ([key, value]) => `${key}="${String(value).replace(/"/g, '&quot;')}"`

const getProjectXML = props => {
	const attributes = Object.entries(props || {}).map(s).join(' ')
	return `<Projects><Project ${attributes}/></Projects>`
}

module.exports = getProjectXML
