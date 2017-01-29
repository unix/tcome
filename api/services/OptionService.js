/**
 * Created by WittBulter on 2017/1/29.
 */

module.exports = {
	findOptionAll: (rule = undefined, done) =>{
		Option
			.find()
			.exec((err, options) =>{
				if (err) return done(err)
				done(null, options)
			})
	},

	createOption: (option, done) =>{
		Option
			.create(option)
			.exec((err, created) =>{
				if (err) return done(err)
				done(null, created)
			})
	},

	updateOptionForID: (id, option, done) =>{
		Option
			.update({id: id}, option)
			.exec((err, updated) =>{
				if (err) return done(err)
				done(null, updated)
			})
	}
}