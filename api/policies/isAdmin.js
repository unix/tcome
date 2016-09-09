
/**
 *
 * @param req
 * @param res
 * @param next
 * @description :: 管理员[admin]权限判断
 */

module.exports = (req, res, next) =>{
	UserService.findUser(req.headers.email, (err, users) =>{
		const user = users[0]
		if (err) return res.serverError()
		if (user&& user.userType&& user.userType== 'admin'|| user.userType== 'developer'){
			return next()
		}
		res.status(404)
		return res.json({message: '需要admin或更高权限'})
	})

}