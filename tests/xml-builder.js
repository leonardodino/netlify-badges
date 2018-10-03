const getProjectXML = require('../lib/get-project-xml')

test('getProjectXML', () => {
	expect(getProjectXML()).toMatchSnapshot()
	expect(getProjectXML({key: 'value'})).toMatchSnapshot()
	expect(getProjectXML({key: 'value "with quotes"'})).toMatchSnapshot()
})
