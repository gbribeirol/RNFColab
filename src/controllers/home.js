module.exports.index = (app, req, res) => {
	// let conn = app.src.config.connMySql();
	// let dao = new app.src.models.NoticiasDAO(conn);

	// dao.get5UltimasNoticias((error, result) => {
		res.render("home/index", { noticias : [] });
	// });
}