module.exports = (paramName, extension) => ({params}, res, next) => {
	String(params[paramName]).endsWith(`.${extension}`) ? next() : next('route')
}

