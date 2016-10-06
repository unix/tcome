/**
 * User.js
 *
 * @description :: 用户模型 不与后台发生通信,中间件验证类型
 */

const bcrypt = require('bcrypt')
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
		*   用户类型
		*   开发者-developer  管理员-admin
		*   渠道经理-channel_manager    网站编辑-editor
		*   资源经理-resource_manager   销售经理-seller_manager     运营经理-marketing_manager
		* */
		userType: {
			type: 'string',
			enum: ['admin'],
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
	}

}

