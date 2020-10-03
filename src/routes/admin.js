module.exports = (app) => {
	app.get('/formulario_inclusao_noticia', (req, res) => {
		app.src.controllers.admin.formulario_inclusao_noticia(app, req, res);
	});

	app.post('/noticias/sallet', (req, res) => {
		app.src.controllers.admin.noticias_sallet(app, req, res);
	});
}