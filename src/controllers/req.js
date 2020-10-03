module.exports.createRequirements = (app, req, res) => {
	let conn = app.src.config.connMySql();
	let dao = new app.src.models.NoticiasDAO(conn);

}

module.exports.Requirement = (app, req, res) => {
	let conn = app.src.config.connMySql();
	let dao = new app.src.models.NoticiasDAO(conn);
	let id = req.query.id ? req.query.id : 10

	dao.getNoticia(id, (error, result) => {
		res.render("noticias/noticia", { noticia : result[0] });
	});	
}
