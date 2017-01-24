/**
 * Created by WittBulter on 2016/10/12.
 * @description :: 管理用户及相关逻辑
 */
const uuid = require('node-uuid')

module.exports = {
	/**
	 *
	 * @api {GET} http://wittsay.cc/api/users/:id [show]
	 * @apiGroup User
	 * @apiDescription 获取指定用户的信息
	 * @apiParam (path) {string} id 用户id
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	show: (req, res) =>{
		const {id} = req.params
		if (!id) return res.badRequest({message: '至少需要用户id'})

		UserService.findUserForId(id, (err, userData) =>{
			if (err) return res.serverError()
			delete userData.password
			res.ok(userData)
		})
	},

	/**
	 *
	 * @api {GET} http://wittsay.cc/api/users/:id/resource [getResource]
	 * @apiGroup User
	 * @apiDescription 获取指定用户的信息
	 * @apiParam (path) {string} id 用户id
	 * @apiParam (path) {string} resource 资源名 支持[article, comment]
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	resource: (req, res) =>{
		const {id, resource} = req.params
		console.log(id, resource);
		if (!id) return res.badRequest({message: '至少需要用户id'})
		if (!resource|| (resource != 'article'&& resource != 'comment')){
			return res.badRequest({message: '需要指定合法资源'})
		}
		const map = {article: 'findArticle', comment: 'findComment'}

		UserService[map[resource]](id, (err, returnResources) =>{
			if (err) return res.serverError()
			res.ok(returnResources)
		})
	},

	/**
	 *
	 * @api {GET} http://wittsay.cc/api/user/type [userType]
	 * @apiGroup User
	 * @apiDescription 获取默认的用户类型
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	userType: (req, res) =>{
		UserService.findUserType(undefined, (err, typeArray) =>{
			if (err) return res.serverError()

			res.ok(typeArray)
		})
	},

	/**
	 *
	 * @api {POST} http://wittsay.cc/api/user [create]
	 * @apiGroup User
	 * @apiDescription 创建一个用户 无需权限
	 * @apiParam (body) {string} email 用户邮件 用作登录
	 * @apiParam (body) {string} password 用户密码 6-20位之间
	 * @apiParam (body) {string} username 用户名
	 * @apiParam (body) {string} [phone] 手机号码
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	create: (req, res) =>{
		const {username, password, email, phone} = req.allParams()
		// if (!email && !password) return res.badRequest({message: '只要需要指定帐号密码'})
		// if (password.length < 5 || password.length > 22) return res.badRequest({message: '密码不符合规范'})
		if (!/^[0-9a-zA-Z]+@(([0-9a-zA-Z]+)[.])+[a-z]{2,4}$/.test(email)){
			return res.badRequest({message: '邮件地址不符合规范'})
		}
		if (!password || password.length < 6 || password.length > 20){
			return res.badRequest({message: '密码不符合规则'})
		}
		const token = uuid.v4()
		UserService.createUser({
			email: email,
			password: password,
			username: username? username: '新用户',
			phone: phone? phone: '0',
			userType: 'notActive',
			userTitle: '未激活会员',
			activeTarget: token
		}, (err, created) =>{
			if (err) return res.serverError()

			return UserService.sendMail({
				id: created.id,
				email: email,
				subject: '维特博客-帐号激活',
				token: token,
			}, (err, info) =>{
				res.ok({message: '注册邮件已发送'})
			})

		})
	},

	/**
	 *
	 * @api {PUT} http://wittsay.cc/api/user [update]
	 * @apiGroup User
	 * @apiDescription 修改一个用户信息
	 * @apiParam (body) {string} [username] 用户名
	 * @apiParam (body) {string} [phone] 手机号码
	 * @apiParam (body) {string} [avatar] 头像图片地址
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	update: (req, res) =>{
		const {username, phone, avatar} = req.allParams()
		if (!username && !phone && !avatar){
			return res.badRequest({message: '至少需要修改一个参数'})
		}
		let user;
		if (username) user.username = username;
		if (phone) user.phone = phone;
		if (avatar) user.avatar = avatar;

		UserService.updateUserForID(req.headers.userID, user, (err, updated) =>{
			if (err) return res.serverError()

			delete updated[0].password
			return res.ok(updated[0])
		})
	},

	/**
	 *
	 * @api {POST} http://wittsay.cc/api/users/:id/validate [validate]
	 * @apiGroup User
	 * @apiDescription 修改一个用户信息
	 * @apiParam (body) {string} token 验证token
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	validate: (req, res) =>{
		const {id} = req.params
		const {token} = req.allParams()
		if (!id|| !token) return res.badRequest({message: '缺少参数'})

		UserService.findUserForId(id, (err, user) =>{
			if (err) return res.serverError()
			if (user.activeTarget != token) return res.forbidden({message: '验证失败'})
			UserService.updateUserForID(id, {
				userType: 'member',
				userTitle: '会员',
				activeTarget: ''
			}, (err, updated) =>{
				if (err) return res.serverError()
				res.ok(updated[0])
			})
		})
	}




}