/**
 * Created by WittBulter on 16/8/7.
 */
const userService = require('../services/user')
const reply = require('../../config/reply')

module.exports = {
	// 注册 创建一个用户
	register: (req, res) =>{
		userService.addUser({username: 'lizhendong'})
			.then(_ => reply.success(res))
			.catch(err => reply.serverError(res))
	},

	// 更新用户信息
	updateUser: (req, res) =>{

	}
}