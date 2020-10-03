module.exports = (app) => {
	app.get('/createReqs', (req, res) => {
		app.src.controllers.req.createReqs(app, req, res);		
	});
};
