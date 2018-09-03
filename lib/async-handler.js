const handler = fn => (req, res, next, ...args) => (
	new Promise(resolve => resolve(fn(req, res, next, ...args))).catch(next)
)

module.exports = handler