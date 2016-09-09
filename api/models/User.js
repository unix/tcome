/**
 * User.js
 *
 * @description :: 用户模型
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
		email: {
			type: 'email',
			required: true
		},
		phone: {
			type: 'string'
		},
		isAdmin: {
			type: 'boolean',
			defaultsTo: false
		},
		avatar: 'string',


	},
	beforeCreate: (values, cb) =>{
		bcrypt.genSalt(10, (err, salt) =>{
			bcrypt.hash(values.password, salt, (err, hash) =>{
				if (err) return cb(err)
				values.password = hash
				cb()
			})
		})
	}

}

