/**
 * Created by WittBulter on 16/8/25.
 * @description :: 用户相关服务
 */

const bcrypt = require('bcrypt')

module.exports = {
	/**
	 *
	 * @param userMail {string} 用户邮件地址
	 * @param cb {function} 回调参数
	 * @return cb {obj| array} (错误信息| 已创建用户)
	 * @description :: 按邮箱地址查询用户
	 */
	findUser: (userMail, cb) =>{
		User
			.find({email: userMail})
			.exec((err, dataArray) =>{
				if (err) return cb(err)
				cb(null, dataArray)
			})
	},

	/**
	 *
	 * @param userMail {string} 用户邮件地址
	 * @param cb {function} 回调参数
	 * @return cb {obj| array} (错误信息| 已创建用户)
	 * @description :: 按邮箱地址查询用户
	 */
	findUserForId: (id, cb) =>{
		User
			.findOne({id: id})
			.exec((err, userData) =>{
				if (err) return cb(err)
				cb(null, userData)
			})
	},

	/**
	 *
	 * @param filter {any} 过滤条件
	 * @param cb {function} 回调参数
	 * @return cb {obj| array} (错误信息| 已创建用户)
	 * @description :: 查询所有用户
	 */
	findUserAll: (filter= null, cb) =>{
		User
			.find({})
			.exec((err, dataArray) =>{
				if (err) return cb(err)
				cb(null, dataArray)
			})
	},

	/**
	 *
	 * @param user {obj} 用户对象
	 * @param cb {function} 回调参数
	 * @return cb {obj| obj} (错误信息| 已创建用户)
	 * @description :: 按对象创建用户
	 */
	createUser: (user, cb) =>{
		User
			.create(user)
			.exec((err, created) =>{
				if (err) return cb(err)
				cb(null, created)
			})
	},

	/**
	 *
	 * @param oldPassword {string} 用户原密码
	 * @param newPassword {string} 用户新密码
	 * @param done {func} 回调函数
	 */
	compareUser: (newPassword, oldPassword, done) =>{
		bcrypt.compare(newPassword, oldPassword, (err, res) =>{
			if (err) return done(err)
			if (!res) return done(null, false)
			done(null, true)
		})
	},

	updateUser: (newUser, oldUser, done) =>{
		User
			.update({id: oldUser.id}, newUser)
			.exec((err, updated) =>{
				if (err) return done(err)
				done(null, updated)
			})
	},


}