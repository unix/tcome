/**
 * Created by WittBulter on 2016/12/27.
 * description :: 已激活权限判断
 */
module.exports = (req, res, next) =>{
	UserService.findUserForMail(req.allParams().email, (err, user) =>{
		if (!user || !user.email) return res.forbidden({message: '该邮箱未注册'})
		if (user.userType == 'notActive') return res.forbidden({message: '该用户需要先进行验证'})
		if (user.userType == 'prisoner') return res.forbidden({message: '该用户已被禁用'})

		return next()
	})
}