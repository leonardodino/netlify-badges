const api = require('supertest')(require('..'))

describe('should return unknown badge on private site', () => {

	test('HEAD request', () =>
		api.head('/kunst.svg').expect(200).expect('Content-Type', /svg/)
	)

	test('GET request', () =>
		api.get('/kunst.svg')
			.expect(200)
			.expect('Content-Type', /svg/)
			.expect(({body}) => {
				if(!/unknown/.test(body)){
					throw new Error('body doens\'t contains unknown')
				}
			})
	)

	test('GET xml request', () => {
		api.get('/kunst.xml')
			.expect(404)
			.expect(({body}) => {
				if(/<\/Projects>/.test(body)){
					throw new Error('body mustn\'t contains Projects root')
				}
				if(!/<Project/.test(body)){
					throw new Error('body mustn\'t contains the project')
				}
			})
	})
})
