/**
 *
 * @param req
 * @param res
 * @param next {}
 * @returns {}
 * @description :: 接口登录认证逻辑
 */

module.exports = async(req, res, next) => {
  const clientToken = req.headers.authorization
  if (!clientToken) return res.forbidden({ message: '未登录或token已过期' })
  
  try {
    const session = await AuthService.findSessionForToken(clientToken)
    if (!session) return res.forbidden({ message: '未登录或token已过期' })
    
    req.headers.email = session.email
    req.headers.userID = session.userID
    req.headers.username = session.username
    return next()
  } catch (err) {
    return res.serverError(err)
  }
}
