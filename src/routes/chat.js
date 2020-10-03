module.exports = (app) => {
	app.get('/chatLogin', (req, res) => {
		app.src.controllers.chat.login(app, req, res);
	});

	app.post('/chat', (req, res) => {
		app.src.controllers.chat.posts(app, req, res);
	});

	app.get('/chat', (req, res) => {
		app.src.controllers.chat.posts(app, req, res);
	});
}
