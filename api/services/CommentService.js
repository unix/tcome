/**
 * Created by WittBulter on 2016/10/20.
 * @description :: 评论相关服务
 */


module.exports = {
	createComment: (comment, done) =>{
		Comment
			.create(comment)
			.exec((err, created) =>{
				if (err) return done(err)
				done(null, created)
			})
	}
}