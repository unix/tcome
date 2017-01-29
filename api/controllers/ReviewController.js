/**
 * Created by WittBulter on 2017/1/29.
 */

module.exports = {

	/**
	 *
	 * @api {GET} http://wittsay.cc/api/reviews/:id [showReviewArticles]
	 * @apiGroup Review
	 * @apiDescription 获取需要审核的文章 需要Admin或更高权限
	 * @apiParam (path) {string} [id] 文章id
	 * @apiUse PAGE
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	show: (req, res) =>{
		const {id} = req.params
		if (!id) {
			const {page, per_page} = req.allParams()
			return ArticleService.findReviewAll({
				page: page? page: 1,
				per_page: per_page? per_page: 14,
			}, (err, articles) =>{
				if (err) return res.serverError()

				res.ok(articles)
			})
		}

		ArticleService.findArticleForID(id, (err, article) =>{
			if (err) return res.serverError()
			if (!article) return res.notFound({message: '未找到文章'})

			const {readTotal, authorId} = article
			UserService.findUserForId(authorId, (err, user) =>{
				if (err) return res.serverError()

				// 每次取单篇文章时更新文章本身阅读数量
				// 单次写操作会影响接口等待时间，非重要逻辑异步处理事务，不等待写操作结束
				ArticleService.updateArticle(id, {
					readTotal: readTotal? readTotal + 1: 2
				}, (err, updated) =>{})
				res.ok(Object.assign({avatar: user.avatar? user.avatar: ''}, article))
			})
		})
	},

	/**
	 *
	 * @api {PUT} http://wittsay.cc/api/reviews/:id/active [reviewArticle]
	 * @apiGroup Review
	 * @apiDescription 审核指定文章 需要管理员权限或更高
	 * @apiParam (path) {string} id 文章id
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	update: (req, res) =>{
		const id = req.params&& req.params.length? req.params[0]: ''
		if (!id) return res.badRequest({message: '至少需要指定文章id'})

		ArticleService.updateArticle(id, {articleType: 'isActive'}, (err, updated) =>{
			if (err) return res.serverError()

			res.ok(updated[0])
		})

	},
}