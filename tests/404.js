const api = require('supertest')(require('..'))

describe('test intentional 404 routes', () => {
	test('root path', () => api.get('/').expect(404))
	test('paths without an extension', () => api.get('/abc').expect(404))
	test('paths not ending in ".svg"', () => api.get('/abc.png').expect(404))
	test('methods:POST', () => api.post('/badges.svg').expect(404))
	test('methods:PUT', () => api.put('/badges.svg').expect(404))
	test('methods:DELETE', () => api.delete('/badges.svg').expect(404))
	test('methods:PATCH', () => api.patch('/badges.svg').expect(404))
})
