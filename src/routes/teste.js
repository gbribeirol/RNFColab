module.exports = (app) => {
	app.get('/teste', (req, res) => {
		// app.src.controllers.home.index(app, req, res);
		res.send('teste')
	});
}
