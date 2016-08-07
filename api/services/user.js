/**
 * Created by WittBulter on 16/8/7.
 */
const userModel = require('../models/user')

module.exports = {
	addUser: user =>{
		return new Promise((resolve, reject) =>{
			userModel
				.collection.save(user, err => {
				if (err) return reject(err)
				resolve()
			})
		})
	}
}