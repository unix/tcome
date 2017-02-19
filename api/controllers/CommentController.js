/**
 * Created by WittBulter on 2016/10/20.
 * @description :: 评论相关逻辑
 */

module.exports = {

	/**
	 *
	 * @api {GET} http://wittsay.cc/v1/articles/:id/comment [show]
	 * @apiGroup Comment
	 * @apiDescription 获取文章评论 无需权限
	 * @apiParam (path) {string} id 文章id
	 * @apiUse PAGE
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	show: async (req, res) =>{
		const {id} = req.params
		if (!id) return res.badRequest({message: '缺少文章id'})
		try {
			const comments = await CommentService.findCommentForArticle(id)
			res.ok(comments)
		} catch (err){
			return res.serverError()
		}
	},




	/**
	 *
	 * @api {POST} http://wittsay.cc/v1/articles/:id/comment [create]
	 * @apiGroup Comment
	 * @apiDescription 对文章创建一个评论 需要登录
	 * @apiParam (path) {string} id 需要评论的文章id
	 * @apiParam (body) {string} content 评论内容 5<content<500
	 * @apiParam (body) {string} [targetId] 指定回复/@用户
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */

	create: async (req, res) =>{
		const {id} = req.params
		const {content, targetId} = req.allParams()
		if (!id) return res.badRequest({message: '缺少文章id'})
		if (!content) return res.badRequest({message: '缺少评论内容'})
		if (content.length < 5 || content.length > 500) return res.badRequest({message: '评论内容不符合规范'})

		try {
			const article = await ArticleService.findArticleForID(id)
			if (!article) return res.badRequest({message: '无效的文章id'})
			const [created, updated] = await Promise.all([
				CommentService.createComment({
					authorId: req.headers.userID,
					authorName: req.headers.username,
					articleId: article.id,
					articleName: article.title,
					targetId: targetId? targetId: null,
					content: content
				}),
				ArticleService.updateArticle(id, {commentTotal: article.commentTotal + 1})
			])
			res.ok(created)

		} catch (err){
			return res.serverError()
		}
	},


	destroy: (req, res) =>{

	}



}
