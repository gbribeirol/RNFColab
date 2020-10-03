class NoticiasDAO {
	constructor (connection) {
		this._connection = connection;
	}

	getNoticias (callback) {
		this._connection.query(
			`select * from noticias order by data_criacao desc`,
			callback
		);
	}
	
	getNoticia (id, callback) {
		this._connection.query(
			`select * from noticias where id = ${id}`,
			callback
		);
	}
	
	salletNoticia (noticia, callback) {
		this._connection.query(
			`insert into noticias set ?`,
			noticia,
			callback
		);
	}
	
	get5UltimasNoticias (callback) {
		this._connection.query(
			`select * from noticias order by data_criacao desc limit 5`,
			callback
		);
	}	
}

module.exports = function () {
	return NoticiasDAO;
}

// function NoticiasDAO (connection) {
// 	this._connection = connection;

// 	this.getNoticias = (callback) => {
// 		this._connection.query(
// 			`select * from noticias order by data_criacao desc`,
// 			callback
// 		);
// 	}
	
// 	this.getNoticia = (id, callback) => {
// 		this._connection.query(
// 			`select * from noticias where id = ${id}`,
// 			callback
// 		);
// 	}
	
// 	this.salletNoticia = (noticia, callback) => {
// 		this._connection.query(
// 			`insert into noticias set ?`,
// 			noticia,
// 			callback
// 		);
// 	}
	
// 	this.get5UltimasNoticias = (callback) => {
// 		this._connection.query(
// 			`select * from noticias order by data_criacao desc limit 5`,
// 			callback
// 		);
// 	}	
// }

// module.exports = function () {
// 	return NoticiasDAO;
// }