/**
 *
 * @param req
 * @param res
 * @param next {}
 * @returns {}
 * @description :: 接口登录认证逻辑
 */

module.exports = (req, res, next) =>{
	const clientToken = req.headers.authorization
	if (!clientToken) return res.forbidden({message: '未登录或token已过期'})

	AuthService.findSessionForToken(clientToken, (err, session) =>{
		if (!session) return res.forbidden({message: '未登录或token已过期'})
		/**
		 *
		 * @description 通过验证, 将email保存在header中 后续验证不再查询email
		 */
		req.headers.email = session.email
		req.headers.userID = session.userID
		req.headers.username = session.username

		return next()
	})
}