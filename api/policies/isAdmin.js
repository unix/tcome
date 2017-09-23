/**
 * Created by WittBulter on 2016/10/12.
 * @description :: 管理员[admin]权限判断
 */

module.exports = async(req, res, next) => {
  const email = req.headers.email
  try {
    const user = await UserService.findUserForMail(email)
    
    if (user && user.userType && user.userType == 'admin') return next()
    return res.forbidden({ message: '需要admin或更高权限' })
  } catch (err) {
    return res.serverError()
  }
}
