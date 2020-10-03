module.exports.login = function (app, req, res) {
	res.render("chat/login", { dados: {}, erros: {} });
}

module.exports.posts = function (app, req, res) {
	let dados = req.body;

	req.assert('nickname','Nome ou nickname deve conter entre 3 e 15 caracteres').len(3, 15);
	
	let erros = req.validationErrors();

	if (erros) {
		res.render("chat/chatLogin", { dados, erros })
		return;
	}

	app.get('io').emit(
		'msgToClient',
		{ nickname: dados.nickname, message: ' acabou de entrar no chat' }
	)

	res.render("chat/posts", { dados });
}
