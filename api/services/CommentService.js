/**
 * Created by WittBulter on 2016/10/20.
 * @description :: 评论相关服务
 */


module.exports = {
	findCommentForUser: (id, done) =>{
		Comment
			.find({authorId: id, sort: 'createdAt DESC' })
			.paginate({limit: 10})
			.exec((err, comments) =>{
				if (err) return done(err)
				done(null, comments)
			})
	},

	createComment: (comment, done) =>{
		Comment
			.create(comment)
			.exec((err, created) =>{
				if (err) return done(err)
				done(null, created)
			})
	}
}