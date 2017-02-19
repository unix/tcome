/**
 * Created by WittBulter on 2016/10/12.
 * @description :: 管理用户及相关逻辑
 */
const uuid = require('node-uuid')

module.exports = {
	/**
	 *
	 * @api {GET} http://wittsay.cc/v1/users/:id [show]
	 * @apiGroup User
	 * @apiDescription 获取指定用户的信息
	 * @apiParam (path) {string} id 用户id
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	show: async (req, res) =>{
		const {id} = req.params
		if (!id) return res.badRequest({message: '至少需要用户id'})
		try {
			let user = await UserService.findUserForId(id)
			if (!user|| !user.id) return res.notFound({message: '未找到此用户'})
			delete user.password
			res.ok(user)
		} catch (err){
			return res.serverError()
		}
	},

	/**
	 *
	 * @api {GET} http://wittsay.cc/v1/user [show]
	 * @apiGroup User
	 * @apiDescription 获取当前登录用户的信息
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	self: async (req, res) =>{
		const userID = req.headers.userID
		try {
			let user = await UserService.findUserForId(userID)
			delete user.password
			res.ok(user)
		} catch (err){
			return res.serverError()
		}
	},

	/**
	 *
	 * @api {GET} http://wittsay.cc/v1/users/:id/resource [getResource]
	 * @apiGroup User
	 * @apiDescription 获取指定用户的信息
	 * @apiParam (path) {string} id 用户id
	 * @apiParam (path) {string} resource 资源名 支持[article, comment]
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	resource: async (req, res) =>{
		const {id, resource} = req.params
		if (!id) return res.badRequest({message: '至少需要用户id'})
		try {
			if (resource == 'article'){
				return res.ok(await UserService.findArticle(id))
			}
			if (resource == 'comment'){
				return res.ok(await UserService.findComment(id))
			}
			return res.badRequest({message: '需要指定合法资源'})
		} catch (err){
			return res.serverError()
		}
	},

	/**
	 *
	 * @api {GET} http://wittsay.cc/v1/user/type [userType]
	 * @apiGroup User
	 * @apiDescription 获取默认的用户类型
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	userType: async (req, res) =>{
		try {
			const types = await UserService.findUserType()
			res.ok(types)
		} catch (err){
			return res.serverError()
		}
	},

	/**
	 *
	 * @api {POST} http://wittsay.cc/v1/user [create]
	 * @apiGroup User
	 * @apiDescription 创建一个用户 无需权限
	 * @apiParam (body) {string} email 用户邮件 用作登录
	 * @apiParam (body) {string} password 用户密码 6-20位之间
	 * @apiParam (body) {string} username 用户名
	 * @apiParam (body) {string} [phone] 手机号码
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	create: async (req, res) =>{
		const {username, password, email, phone} = req.allParams()
		if (!/^[0-9a-zA-Z]+@(([0-9a-zA-Z]+)[.])+[a-z]{2,4}$/.test(email)){
			return res.badRequest({message: '邮件地址不符合规范'})
		}
		if (!password || password.length < 6 || password.length > 20){
			return res.badRequest({message: '密码不符合规则'})
		}
		const token = uuid.v4()

		try {
			const created = await UserService.createUser({
				email: email,
				password: password,
				username: username? username: '新用户',
				phone: phone? phone: '0',
				userType: 'notActive',
				userTitle: '未激活会员',
				activeTarget: token
			})
			const info = await UserService.sendMail({
				id: created.id,
				email: email,
				subject: '维特博客-帐号激活',
				token: token,
			})
			res.ok({message: '注册邮件已发送'})
		} catch (err){
			return res.serverError()
		}
	},

	/**
	 *
	 * @api {PUT} http://wittsay.cc/v1/user [update]
	 * @apiGroup User
	 * @apiDescription 修改一个用户信息
	 * @apiParam (body) {string} [username] 用户名
	 * @apiParam (body) {string} [phone] 手机号码
	 * @apiParam (body) {string} [avatar] 头像图片地址
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	update: async (req, res) =>{
		const {username, phone, avatar} = req.allParams()
		const userID = req.headers.userID
		if (!username && !phone && !avatar){
			return res.badRequest({message: '至少需要修改一个参数'})
		}
		let user = {};
		if (username) user.username = username;
		if (phone) user.phone = phone;
		if (avatar) user.avatar = avatar;
		try {
			let updated = await UserService.updateUserForID(userID)
			delete updated[0].password
			return res.ok(updated[0])
		} catch (err){
			return res.serverError()
		}
	},

	/**
	 *
	 * @api {POST} http://wittsay.cc/v1/users/:id/validate [validate]
	 * @apiGroup User
	 * @apiDescription 修改一个用户信息
	 * @apiParam (body) {string} token 验证token
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	validate: async (req, res) =>{
		const {id} = req.params
		const {token} = req.allParams()
		if (!id|| !token) return res.badRequest({message: '缺少参数'})
		try {
			const user = await UserService.findUserForId(id)
			if (!user || !user.id) return res.notFound({message: '未找到此用户'})
			if (user.activeTarget != token) return res.forbidden({message: '验证失败'})
			const updated = await UserService.updateUserForID(id,  {
				userType: 'member',
				userTitle: '会员',
				activeTarget: ''
			})
			res.ok(updated[0])
		} catch (err){
			return res.serverError()
		}
	}




}