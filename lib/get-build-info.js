const axios = require('axios')
const BASE_URL = 'https://api.netlify.com/api/v1'
const DASH_URL = 'https://app.netlify.com'

// https://github.com/erikdoe/ccmenu/wiki/Multiple-Project-Summary-Reporting-Standard

// name: String
// activity: [Sleeping, Building, CheckingModifications]
// lastBuildStatus: [Success, Failure, Exception, Unknown]
// lastBuildTime: Date
// webUrl: Url

const stateToBuildStatus = state => (({
	ready: 'Success',
	error: 'Failure',
	other: 'Exception',
})[state] || 'Unknown')

const stateToActivity = state => (({
	building: 'Building',
	other: 'CheckingModifications',
})[state] || 'Sleeping')

const getBuildInfo = async ({slug, branch}) => {
	const siteurl = slug.includes('.') ? slug : `${slug}.netlify.com`
	const options = `page=1&per_page=2${branch ? `&branch=${branch}` : ''}`
	const {data} = await axios(`${BASE_URL}/sites/${siteurl}/deploys?${options}`)
	const [latestBuild = {}, previousBuild = {}] = data || []

	const name = `netlify | ${slug}${branch ? ` #${branch}` : ''}`
	const webUrl = `${DASH_URL}/sites/${slug}/deploys/${latestBuild.id}`

	const activity = stateToActivity(latestBuild.state)
	const relevantBuild = activity === 'Building' ? previousBuild : latestBuild
	const lastBuildStatus = stateToBuildStatus(relevantBuild.state)
	const lastBuildTime = relevantBuild.updated_at
	return {name, webUrl, activity, lastBuildStatus, lastBuildTime}
}

module.exports = getBuildInfo
