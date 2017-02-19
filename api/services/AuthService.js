/**
 * Created by WittBulter on 2016/10/12.
 * @description :: 管理用户session等相关服务
 */
const bcrypt = require('bcrypt')
const uuid = require('node-uuid')

module.exports = {
	findSessionForToken: (clientToken, done) =>{
		Session
			.findOne({clientToken: clientToken})
			.exec((err, session) =>{
				if (err) return done(err)
				if (!session) return done(null, null)

				done(null, session)
			})
	},

	findSessionForMail: email =>{
		return Session.findOne({email: email})
	},

	updateSessionForMail: (email, session) =>{
		return Session.update({email: email}, session)
	},

	createSession: session =>{
		return Session.create(session)
	},


	authUser: async (email, password) =>{
		try {
			const user = await UserService.findUserForMail(email)
			if (!user) return {status: false, user: null, msg: '未找到用户'}

			const isApproved = await bcrypt.compareSync(password, user.password)
			if (!isApproved) return {status: false, user: null, msg: '密码有误'}

			const newSession = {
				email: user.email,
				username: user.username,
				userID: user.id,
				clientToken: uuid.v4()
			}
			const session = await AuthService.findSessionForMail(user.email)
			if (!session){
				await AuthService.createSession(newSession)
				return {status: true, user: Object.assign(newSession, user), msg: '创建登录状态成功'}
			}
			await AuthService.updateSessionForMail(user.email, newSession)
			return {status: true, user: Object.assign(newSession, user), msg: '更新登录状态成功'}
		} catch (err){
			return Promise.reject(err)
		}
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