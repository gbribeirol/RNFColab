const express = require('express')
// let expressValidator = require('express-validator')
const bodyParser = require('body-parser')
const cors = require('cors')
const consign = require('consign')
const app = express()

app.use(express.static('./src/public'))
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(expressValidator())
app.use(cors({ origin: true }))

app.set('view engine', 'ejs')
app.set('views', './src/views')

// eslint-disable-next-line promise/catch-or-return
consign()
	.include('src/routes')
	// .then('src/config/connMySql.js')
	// .then('src/config/connSocket.js')
	.then('src/models')
	.then('src/controllers')
	.into(app)

module.exports = app
