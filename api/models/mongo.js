/**
 * Created by WittBulter on 16/8/7.
 */

const mongoose = require('mongoose')

const mongo = require(`${global.__APP_PATH}/config/connections`).mongodbServer
const conn = mongoose
	.createConnection(`mongodb://${mongo.user}:${mongo.password}@${mongo.host}:${mongo.port}/${mongo.database}`)


module.exports = conn;