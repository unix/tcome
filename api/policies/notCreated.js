/**
 *
 * @param req
 * @param res
 * @param next
 * @description :: 用户创建权限验证 检查数据库中是否已经有用户
 */
module.exports = function (req, res, next){
	UserService.findUser(req.allParams().email, (err, users) =>{
		if (users.length > 0) return res.forbidden({message: '该邮箱已被注册'})
		return next()
	})
}