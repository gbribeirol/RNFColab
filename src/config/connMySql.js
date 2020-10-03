let mysql = require('mysql');

let connMySql = function () {
	return mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '12345',
		database : 'portal_noticias'
	});
}

module.exports = function (xx) {
	return connMySql;
}