/**
 * User.js
 *
 * @description :: 用户模型 不与后台发生通信,中间件验证类型
 */

const bcrypt = require('bcrypt')
DEFAULT_TYPE = [{
	type: 'admin',
	title: '管理员',
},{
	type: 'member',
	title: '会员',
},{
	type: 'prisoner',
	title: '禁言',
}]

module.exports = {

	attributes: {
		username: {
			type: 'string',
			required: true
		},
		password: {
			type: 'string',
			required: true
		},
		/**
		*  用户类型
		*  管理员-admin
		*  普通会员用户-member
	    *  被禁止的-prisoner
		* */
		userType: {
			type: 'string',
			enum: ['admin', 'member', 'prisoner'],
			required: true
		},
		userTitle: {
			type: 'string',
			required: true
		},
		email: {
			type: 'email',
			required: true
		},
		phone: {
			type: 'string'
		},

	},
	beforeCreate: (values, cb) =>{
		bcrypt.genSalt(10, (err, salt) =>{
			bcrypt.hash(values.password, salt, (err, hash) =>{
				if (err) return cb(err)
				values.password = hash
				cb()
			})
		})
	},
	beforeUpdate: (values, cb) =>{
		if (!values.password) return cb()
		bcrypt.genSalt(10, (err, salt) =>{
			bcrypt.hash(values.password, salt, (err, hash) =>{
				if (err) return cb(err)
				values.password = hash
				cb()
			})
		})
	},

	getDefault: () =>{
		return DEFAULT_TYPE
	}

}

