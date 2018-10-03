const express = require('express')
const handler = require('./lib/async-handler')
const states = require('./lib/states.json')
const getBuildStatus = require('./lib/get-build-status')
const getBadgeStream = require('./lib/get-badge-stream')
const filterExtensionMiddleware = require('./lib/middlewares/filter-extension')

const app = express()
app.set('query parser', 'simple')

app.get(
	'/:filename',
	filterExtensionMiddleware('filename', 'svg'),
	(req, res, next) => {
		req.getBuildStatus = () => getBuildStatus({
			slug: req.params.filename.replace(/\.svg$/, ''),
			branch: req.query.branch,
		})
		next()
	},
	handler(async (req, res) => {
		const {state = 'unknown'} = await req.getBuildStatus()
		res.type('svg').set({ETag: state})
		if(req.get('if-none-match') === state) return res.status(304).end()
		const badgeStream = await getBadgeStream(states[state] || states.other)
		badgeStream.pipe(res)
	})
)

const listener = require.main === module && app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

module.exports = app
