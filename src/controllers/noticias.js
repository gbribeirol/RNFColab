module.exports.noticias = (app, req, res) => {
	let conn = app.src.config.connMySql();
	let dao = new app.src.models.NoticiasDAO(conn);

	dao.getNoticias((error, result) => {
		res.render("noticias/noticias", { noticias : result });
	});
}

module.exports.noticia = (app, req, res) => {
	let conn = app.src.config.connMySql();
	let dao = new app.src.models.NoticiasDAO(conn);
	let id = req.query.id ? req.query.id : 10

	dao.getNoticia(id, (error, result) => {
		res.render("noticias/noticia", { noticia : result[0] });
	});	
}
