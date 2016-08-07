/**
 * Created by WittBulter on 16/8/7.
 */

const mongoose = require('mongoose')
const conn = require("./mongo")

conn.model('Users', new mongoose.Schema({
	username: String,           //用户名
	passwordHash: String,
	passwordSalt: String,
	created_at: Date,           //创建时间
	summary: String,            //简介
	email: String,
	phone: Number,
	userType: Number,           //用户类型,普通用户为0
}))

module.exports = conn.model('Users')


