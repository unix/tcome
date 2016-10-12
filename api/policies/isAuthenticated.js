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
	if (!clientToken){
		res.status(401)
		return res.json({message: '未登录或token已过期'})
	}

	AuthService.findSession(clientToken, (err, sessionData) =>{
		if (!sessionData){
			res.status(401)
			return res.json({message: '未登录或token已过期'})
		}
		/**
		 *
		 * @description 通过验证, 将email保存在header中 后续验证不再查询email
		 */
		req.headers.email = sessionData.email
		req.headers.userID = sessionData.userID
		return next()
	})
}