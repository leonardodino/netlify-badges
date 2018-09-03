const api = require('supertest')(require('..'))

describe('should return status badge on public site', () => {

	test('HEAD request', () =>
		api.head('/badges.svg').expect(200).expect('Content-Type', /svg/)
	)

	test('GET request', () => {
		api.get('/badges.svg')
			.expect(200)
			.expect('Content-Type', /svg/)
			.expect(({body}) => {
				if(!/<\/svg>/.test(body)){
					throw new Error('body doens\'t contains svg')
				}
			})
	})

})
