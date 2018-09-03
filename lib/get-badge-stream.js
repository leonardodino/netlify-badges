const axios = require('axios')
const {readable} = require('is-stream')
const BASE_URL = 'https://img.shields.io'
const options = {headers: {Accept: 'image/svg+xml'}, responseType: 'stream'}

const getBadgeStream = async ({label, color}) => {
	const url = `${BASE_URL}/badge/netlify-${label}-${color}.svg`
	const {data, status} = await axios({url, ...options})
	if(status >= 400 || !readable(data)) throw new Error('badge request error')
	return data
}

module.exports = getBadgeStream
