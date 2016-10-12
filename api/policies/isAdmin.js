/**
 * Created by WittBulter on 2016/10/12.
 * @description :: 管理员[admin]权限判断
 */

module.exports = (req, res, next) =>{
	UserService.findUser(req.headers.email, (err, users) =>{
		if (err) return res.serverError()

		const user = users[0]
		if (user&& user.userType&& user.userType== 'admin') return next()

		return res.forbidden({message: '需要admin或更高权限'})
	})

}