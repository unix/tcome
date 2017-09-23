/**
 *
 * @param req
 * @param res
 * @param next
 * @description :: 用户激活，需要等待激活用户类型
 */
module.exports = async(req, res, next) => {
  const { id } = req.params
  if (!id) return res.badRequest({ message: '需要一个用户id' })
  try {
    const user = await UserService.findUserForId(id)
    
    if (!user || !user.id) return res.forbidden({ message: '该用户不存在' })
    if (user.userType != 'notActive') return res.forbidden({ message: '该用户无需再次验证' })
    if (!user.activeTarget) return res.forbidden({ message: '请重新发送验证邮件' })
    
    return next()
  } catch (err) {
    return res.serverError()
  }
}
