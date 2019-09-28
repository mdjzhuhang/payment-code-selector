const mockdata = require('./mock/codeData.json');

module.exports = {
	lintOnSave: false,
	devServer: {
		port: 8080,
		before(app) {
			app.get('/get/codeData', (req, res, next) => {
				res.json(mockdata);
			})
		}
	}
}