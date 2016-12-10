/**
 * Created by WittBulter on 2016/10/20.
 * @description :: 评论相关逻辑
 */

module.exports = {

	/**
	 *
	 * @api {GET} http://wittsay.cc/api/articles/:id/comment [show]
	 * @apiGroup Comment
	 * @apiDescription 获取文章评论 无需权限
	 * @apiParam (path) {string} id 文章id
	 * @apiUse PAGE
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	show: (req, res) =>{
		const {id} = req.params
		if (!id) return res.badRequest({message: '缺少文章id'})

		CommentService.findCommentForArticle(id, (err, comments) =>{
			if (err) return res.serverError()

			res.ok(comments)
		})
	},




	/**
	 *
	 * @api {POST} http://wittsay.cc/api/articles/:id/comment [create]
	 * @apiGroup Comment
	 * @apiDescription 对文章创建一个评论 需要登录
	 * @apiParam (path) {string} id 需要评论的文章id
	 * @apiParam (body) {string} content 评论内容 5<content<500
	 * @apiParam (body) {string} [targetId] 指定回复/@用户
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */

	create: (req, res) =>{
		const {id} = req.params
		const {content, targetId} = req.allParams()
		if (!id) return res.badRequest({message: '缺少文章id'})
		if (!content) return res.badRequest({message: '缺少评论内容'})
		if (content.length < 5 || content.length > 500) return res.badRequest({message: '评论内容不符合规范'})

		CommentService.createComment({
			authorId: req.headers.userID,
			authorName: req.headers.username,
			articleId: id,
			targetId: targetId? targetId: null,
			content: content
		}, (err, created) =>{
			if (err) return res.serverError()
			// 每更新评论  为文章更新字段
			CommentService.findCommentLength(id, (err, comments) =>{
				if (err) return res.serverError()

				ArticleService.updateArticle(id, {
					commentTotal: comments.length
				}, (err, updated) =>{
					if (err) return res.serverError()

					res.ok(created)
				})
			})
		})
	},


	destroy: (req, res) =>{

	}



}
