const axios = require('axios')
const BASE_URL = 'https://api.netlify.com/api/v1'

const getBuildStatus = async ({slug, branch}) => {
	const siteurl = slug.includes('.') ? slug : `${slug}.netlify.com`
	const options = `page=1&per_page=1&branch=${branch || 'master'}`
	const {data} = await axios(`${BASE_URL}/sites/${siteurl}/deploys?${options}`)
	const [{build_id: buildId, state} = {}] = data || []
	if(!buildId || !state) throw new Error('netlify request error')
	return {buildId, state}
}

module.exports = async (...args) => {
	try {
		return await getBuildStatus(...args)
	}catch(e){
		return {state: 'other'}
	}
}
