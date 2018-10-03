const getProjectXML = require('../lib/get-project-xml')

expect.addSnapshotSerializer({
	test: value => typeof value === 'string' && value.includes('<Projects>'),
	print: xml => xml,
})

test('getProjectXML', () => {
	expect(getProjectXML()).toMatchSnapshot()
	expect(getProjectXML({key: 'value'})).toMatchSnapshot()
	expect(getProjectXML({key: 'value "with quotes"'})).toMatchSnapshot()
})
