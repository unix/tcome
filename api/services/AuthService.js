/**
 * Created by WittBulter on 2016/10/12.
 * @description :: 管理用户session等相关服务
 */
const bcrypt = require('bcrypt')
const uuid = require('node-uuid')

module.exports = {
	/**
	 *
	 * @param clientToken {string} 客户端session
	 * @param done {function}
	 * @return (err, sessionObj)
	 * @description :: 查找服务端可用session
	 */
	findSession: (clientToken, done) =>{
		Session
			.find({clientToken: clientToken})
			.exec((err, sessionArray) =>{
				if (err) return done(err)
				if (!sessionArray.length) return done(null, null)

				done(null, sessionArray[0])
			})
	},


	/**
	 *
	 * @param loginMessage {object} 用户邮件地址与密码明文
	 * @param done {function}
	 * @param req {object}
	 * @return (err, user, message)
	 * @description :: 在服务端创建一个session
	 */
	createSession: (loginMessage, req, done) =>{
		const {email, password} = loginMessage
		User
			.findOne({email: email}, (err, user) =>{
				if (err) return done(err)
				if (!user) return done(403, false, '未找到用户')

				bcrypt.compare(password, user.password, function (err, res){
					if (!res) return done(403, false, '密码有误')

					const returnUser = {
						email: user.email,
						createdAt: user.createdAt,
						userType: user.userType,
						userTitle: user.userTitle,
						username: user.username,
						id: user.id,
						token: uuid.v4()
					}
					Session
						.find({email: user.email})
						.exec((err, userSession) =>{
							if (userSession.length == 0){
								return Session
									.create({
										email: user.email,
										clientToken: returnUser.token,
										userID: user.id,
										username: user.username,
									})
									.exec((err, created) =>{
										return done(null, returnUser, '登录成功')
									})
							}
							Session
								.update({email: user.email}, {
									email: user.email,
									clientToken: returnUser.token,
									userID: user.id,
									username: user.username
								})
								.exec((err, updated) =>{
									return done(null, returnUser, '登录成功')
								})
						})
				})
			})
	},

	deleteSession: (email, done) =>{
		Session
			.destroy({email: email})
			.exec(err =>{
				if (err) return done(err)
				done(null)
			})
	}
}