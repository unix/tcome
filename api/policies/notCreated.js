/**
 *
 * @param req
 * @param res
 * @param next
 * @description :: 用户创建权限验证 检查数据库中是否已经有用户
 */
module.exports = function (req, res, next){
	UserService.findUserForMail(req.allParams().email, (err, user) =>{
		if (!user) return res.forbidden({message: '该邮箱已被注册'})
		return next()
	})
}