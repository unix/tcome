/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt')

module.exports = {

	attributes: {
		name: {
			type: 'string'
		},
		phone: {
			type: 'string'
		},
		password: {
			type: 'string',
			required: true
		},
		email: {
			type: 'email',
		},
		isAdmin: {
			type: 'boolean',
			defaultsTo: false
		}
	},

	beforeCreate: (values, cb) =>{
		bcrypt.genSalt(10, (err, salt) =>{
			bcrypt.hash(values.password, salt, (err, hash) =>{
				if(err) return cb(err)
				values.password = hash
				// 执行用户定义回调
				cb&& cb()
			})
		})
	}
};

