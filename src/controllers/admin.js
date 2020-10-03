module.exports.formulario_inclusao_noticia = (app, req, res) => {
	res.render("admin/form_add_noticia", { noticia: {}, erros: {} });
}

module.exports.noticias_sallet = (app, req, res) => {
	let noticia = req.body;

	req.assert('titulo','Título é obrigatório').notEmpty();
	req.assert('resumo','Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
	req.assert('autor','Autor é obrigatório').notEmpty();
	req.assert('data_noticia','Data é obrigatório').isDate({ format: 'YYYY-MM-DD' });
	req.assert('noticia','Noticia é obrigatório').notEmpty();

	let erros = req.validationErrors();
  console.log(noticia)
	if (erros) {
		res.render("admin/form_add_noticia", { noticia, erros });
		return;
	}

	let conn = app.src.config.connMySql();
	let dao = new app.src.models.NoticiasDAO(conn);

	dao.salletNoticia(noticia, (error, result) => {
		res.redirect('/noticias');
	});	
}