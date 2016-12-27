/**
 * Created by WittBulter on 2016/12/27.
 * description :: 已激活权限判断
 */
module.exports = (req, res, next) =>{
	UserService.findUser(req.allParams().email, (err, users) =>{
		if (users.length <= 0 || !users[0]|| !users[0].id) return res.forbidden({message: '该邮箱未注册'})
		if (users[0].userType == 'notActive') return res.forbidden({message: '该用户需要先进行验证'})
		if (users[0].userType == 'prisoner') return res.forbidden({message: '该用户已被禁用'})

		return next()
	})
}