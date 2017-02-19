/**
 * Created by WittBulter on 2017/1/29.
 */

module.exports = {

	/**
	 *
	 * @api {GET} http://wittsay.cc/v1/reviews/:id [showReviewArticles]
	 * @apiGroup Review
	 * @apiDescription 获取需要审核的文章 需要Admin或更高权限
	 * @apiParam (path) {string} [id] 文章id (查询id会自动抛弃query条件)
	 * @apiParam (query) {string} [status] 文章状态 包括: isReview:审核中, isActive:正常, isDestroy:已删除, all: 所有(默认)
	 * @apiUse PAGE
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	show: async (req, res) =>{
		const {id} = req.params

		try {
			if (!id){
				let {page, per_page, status} = req.allParams()
				if (status != 'isReview'&& status != 'isActive'&& status != 'isDestroy'){
					status = 'all'
				}
				const articles = await ArticleService.findReviewForType(status, page, per_page)
				return res.ok(articles)
			}
			const article = await ArticleService.findArticleForID(id)
			if (!article) return res.notFound({message: '未找到文章'})
			const [user, updated] = await Promise.all([
				UserService.findUserForId(article.authorId),
				ArticleService.updateArticle(id, {readTotal: article.readTotal? article.readTotal + 1: 2})
			])

			res.ok(Object.assign({avatar: user.avatar? user.avatar: ''}, updated[0]))
		} catch (err){
			return res.serverError()
		}
	},

	/**
	 *
	 * @api {PUT} http://wittsay.cc/v1/reviews/:id/:status [reviewArticle]
	 * @apiGroup Review
	 * @apiDescription 审核指定文章 需要管理员权限或更高
	 * @apiParam (path) {string} id 文章id
	 * @apiParam (path) {string} status 文章状态 包括: isReview:审核中, isActive:正常, isDestroy:已删除
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	update: async (req, res) =>{
		const {id, status} = req.params
		if (!id || !status) return res.badRequest({message: '参数错误'})
		if (status != 'isReview' && status != 'isActive' && status != 'isDestroy'){
			return res.badRequest({message: '状态错误'})
		}
		try {
			const updated = await ArticleService.updateArticle(id)
			res.ok(updated[0])
		} catch (err){
			return res.serverError()
		}
	},
}