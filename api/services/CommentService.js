/**
 * Created by WittBulter on 2016/10/20.
 * @description :: 评论相关服务
 */


module.exports = {
	findCommentForArticle: id =>{
		return Comment
			.find({
				articleId: id,
				sort: 'createdAt'
			})
	},

	findCommentForUser: id =>{
		return Comment
			.find({authorId: id, sort: 'createdAt DESC'})
			.paginate({limit: 5})
	},

	findCommentLength: (id, done) =>{
		Comment
			.find({
				articleId: id,
				sort: 'createdAt'
			}, {
				fields: ['id']
			})
			.exec((err, comments) =>{
				if (err) return done(err)
				done(null, comments)
			})
	},

	createComment: comment =>{
		return Comment.create(comment)
	}
}