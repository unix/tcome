/**
 * Created by WittBulter on 16/8/7.
 */
const userService = require('../services/user')

module.exports = {
	// 注册 创建一个用户
	register: (req, res) =>{
		userService.addUser({username: 'lizhendong'})
			.then(_ =>{
				res.status(200)
				res.json({message: 'ok'})
			})
			.catch(err =>{
				res.status(500)
				res.json({message: 'error'})
			})
	},

	// 更新用户信息
	updateUser: (req, res) =>{

	}
}