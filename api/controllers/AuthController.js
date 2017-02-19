/**
 * AuthController
 *
 * @description :: 用户会话相关逻辑
 */

module.exports = {
	/**
	 * @apiDefine CODE_500
	 * @apiSuccessExample {json} Response 500 Example
	 *   HTTP/1.1 500 Internal Server Error
	 *   {
     *     "message": "服务器错误"
     *   }
	 */

	/**
	 * @apiDefine CODE_400
	 * @apiSuccessExample {json} Response 400 Example
	 *   HTTP/1.1 400 Internal Server Error
	 *   {
     *     "message": "语法错误提示(如果有)"
     *   }
	 */

	/**
	 * @apiDefine CODE_403
	 * @apiSuccessExample {json} Response 400 Example
	 *   HTTP/1.1 403 Internal Server Error
	 *   {
     *     "message": "错误内容"
     *   }
	 */

	/** js
	 * @apiDefine CODE_200
	 * @apiSuccessExample {json} Response 200 Example
	 *   HTTP/1.1 200 OK
	 *   {
	 *     "code": 200
	 *   }
	 */

	/** js
	 * @apiDefine CODE_204
	 * @apiSuccessExample {json} Response 204 Example
	 *   HTTP/1.1 204 OK
	 */

	/** js
	 * @apiDefine PAGE
	 * @apiParam (param) {number} [page] 页码数(默认1)
	 * @apiParam (param) {number} [per_page] 每页显示数量(默认14)
	 */

	/**
	 *
	 * @api {ANY} http://wittsay.cc/v1/session [Authorization]
	 * @apiGroup Authorization
	 * @apiDescription 接口权限验证
	 * @apiParam (header) {string} Authorization 用户验证token
	 */

	/**
	 *
	 * @api {POST} http://wittsay.cc/v1/session [login]
	 * @apiGroup Session
	 * @apiDescription 用户登录,获取用户session
	 * @apiParam (body) {string} email 用户名
	 * @apiParam (body) {string} password 用户密码
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	login: (req, res) =>{
		const {email, password} = req.allParams()
		if (!email || !password) return res.badRequest({message: '需要邮件地址与密码'})
		AuthService.authUser(email, password)
			.then(response =>{
				let {status, user, msg} = response
				if (!status) return res.forbidden({message: msg})

				if (user.password) delete user.password
				return res.ok({message: msg, user: user})
			})
			.catch(err =>{
				return res.serverError(err)
			})
	},

	/**
	 *
	 * @api {DELETE} http://wittsay.cc/v1/session [logout]
	 * @apiGroup Session
	 * @apiDescription 用户登出,注销用户session
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 * @apiSuccessExample {json} Response 400 Example
	 *   HTTP/1.1 400 Interface Error
	 *   {
	 *     "code": 400,
	 *     "message": "xxx"
	 *   }
	 */
	logout: (req, res) =>{
		console.log(213);
		const email = req.headers.email
		AuthService.deleteSession(email, err =>{
			if (err) return res.serverError()
			res.status(204)
			return res.json({})
		})
	}
};

