class ReqDAO {
	constructor (connection) {
		this._connection = connection;
	}

	createReqs (collection, callback) {

		collection.forEach(e => {
			_connection.collection("requirements").doc(e.id).set(e)
		});
		callback
		res.send('Requisitos criados!')
	}
}

module.exports = function () {
	return ReqDAO;
}
