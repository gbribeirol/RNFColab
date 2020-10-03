module.exports = (app) => {
	app.get('/noticias', (req, res) => {
		app.src.controllers.noticias.noticias(app, req, res);		
	});

	app.get('/noticia', (req, res) => {
		app.src.controllers.noticias.noticia(app, req, res);
	});
};
