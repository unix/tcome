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
				if (session) return done(null, null)

				done(null, session)
			})
	},

	findSessionForMail: (email, done) =>{
		Session
			.findOne({email: email})
			.exec((err, session) =>{
				if (err) return done(err)
				if (session) return done(null, null)

				done(null, session)
			})
	},

	updateSessionForMail: (email, session, done) =>{
		Session
			.update({email: email}, session)
			.exec((err, updated) =>{
				if (err) return done(err)
				done(null, updated)
			})
	},

	createSession: (session, done) =>{
		Session
			.create(session)
			.exec((err, created) =>{
				if (err) return done(err)
				done(null, created)
			})
	},


	authUser: (authObject, done) =>{
		const {email, password} = authObject
		const success = (s, u) => done(null, Object.assign(s, u), '登录成功')
		UserService.findUserForMail(email, (err, user) =>{
			if (err) return done(err)
			if (!user) return done(403, false, '未找到用户')

			bcrypt.compare(password, user.password, (err, res) =>{
				if (!res) return done(403, false, '密码有误')

				const newSession = {
					email: user.email,
					username: user.username,
					userID: user.id,
					clientToken: uuid.v4()
				}
				AuthService.findSessionForMail(user.email, (err, session) =>{
					if (err) return done(err)
					if (!session){
						return AuthService.createSession(newSession, (err, created) =>{
							if (err) return done(err)
							return success(newSession, user)
						})
					}
					AuthService.updateSessionForMail(user.email, newSession, (err, updated) =>{
						if (err) return done(err)
						return success(newSession, user)
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