/**
 * Created by WittBulter on 2016/10/20.
 * @description :: 评论相关逻辑
 */

module.exports = {

	/**
	 *
	 * @api {GET} http://wittsay.cc/api/comment/:id [show]
	 * @apiGroup Comment
	 * @apiDescription 获取指定文章详细信息 任何权限
	 * @apiParam (path) {string} [id] 文章id
	 * @apiUse PAGE
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	show: (req, res) =>{

	},




	/**
	 *
	 * @api {POST} http://wittsay.cc/api/comment [create]
	 * @apiGroup Comment
	 * @apiDescription 对文章创建一个评论 需要登录
	 * @apiParam (body) {string} articleId 需要评论的文章id
	 * @apiParam (body) {string} content 评论内容 5<content<500
	 * @apiParam (body) {string} [targetId] 指定回复/@用户
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */

	create: (req, res) =>{
		const {content, targetId, articleId} = req.allParams()
		if (!articleId) return res.badRequest({message: '缺少文章id'})
		if (!content) return res.badRequest({message: '缺少评论内容'})
		if (content.length < 5 || content.length > 500) return res.badRequest({message: '评论内容不符合规范'})

		CommentService.createComment({
			authorId: req.headers.userID,
			articleId: articleId,
			targetId: targetId? targetId: null,
			content: content
		}, (err, created) =>{
			if (err) return res.serverError()

			res.ok()
		})
	},


	destroy: (req, res) =>{

	}



}
