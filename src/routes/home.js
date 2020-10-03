module.exports = (app) => {
	app.get('/', (req, res) => {
		app.src.controllers.home.index(app, req, res);
	});
}

// module.exports = function (application) {
// 	application.get('/', function (req, res) {
// 		application.app.controllers.index.home(application, req, res);
// 	});
// }