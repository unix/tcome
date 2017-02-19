/**
 * Created by WittBulter on 2016/10/12.
 * @description :: 文章相关逻辑
 */
const trimHtml = require('trim-html')

module.exports = {

	/**
	 *
	 * @api {GET} http://wittsay.cc/v1/articles/:id [show]
	 * @apiGroup Article
	 * @apiDescription 获取指定文章详细信息 任何权限
	 * @apiParam (path) {string} [id] 文章id
	 * @apiUse PAGE
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 * @apiSuccessExample {json} Response 400 Example
	 *   HTTP/1.1 400 Interface Error
	 *   {
	 *     "code": 400,
	 *     "message": "xxx"
	 *   }
	 */
	show: async (req, res) =>{
		const {id} = req.params
		try {
			if (!id){
				const {page, per_page} = req.allParams()
				const [count, articles] = await Promise.all([
					ArticleService.findArticleCount(),
					ArticleService.findArticleAll(page, per_page)
				])
				res.setHeader('total', count)
				return res.ok(articles)
			}

			const article = await ArticleService.findArticleForID(id)
			if (!article) return res.notFound({message: '未找到文章'})
			const [user, updated] = await Promise.all([
				UserService.findUserForId(article.authorId),
				ArticleService.updateArticle(id, {readTotal: article.readTotal? article.readTotal + 1: 2})
			])
			res.ok(Object.assign({avatar: user.avatar? user.avatar: ''}, updated[0]))
		} catch (err) {
			return res.serverError(err)
		}
	},

	/**
	 *
	 * @api {PUT} http://wittsay.cc/v1/articles/:id [update]
	 * @apiGroup Article
	 * @apiDescription 修改指定文章 需要登录 已删除或不存在文章无法修改
	 * @apiParam (path) {string} id 文章id
	 * @apiParam (body) {string} [title] 文章标题
	 * @apiParam (body) {string} [content] 文章内容
	 * @apiParam (body) {string} [thumbnail] 标题图
	 * @apiParam (body) {array} [tags] 标签tags
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	update: async (req, res) =>{
		const {id} = req.params
		const {title, content, thumbnail, tags} = req.allParams()
		const includesTags = tags && Object.prototype.toString.call(tags) === '[object Array]'&& tags.length > 0

		if (!id) return res.badRequest({message: '至少需要指定文章id'})
		if (!title && !content&& !thumbnail) return res.badRequest({message: '至少需要修改一项'})
		if (title.length < 5|| content.length < 5) return res.badRequest({message: '文章内容过少'})

	// 减少更新数量有助于提高更新速度
		let article = {articleType: 'isReview'}
		if (title) article.title = title
		if (content) article.content = content
		if (thumbnail) article.thumbnail = thumbnail
		if (includesTags){article.tags = tags}

		try {
			const art = await ArticleService.findArticleForID(id)
			if (!art || art.articleType === 'isDestroy') return res.badRequest({message: '文章已被删除'})
			if (art.authorId !== req.headers.userID) return res.forbidden({message: '仅只能修改自己发表的文章'})
			const updated = await ArticleService.updateArticle(id, article)
			if (includesTags) TagService.saveTags(tags)

			res.ok(updated[0])
		} catch (err){
			return res.serverError(err)
		}
	},


	/**
	 *
	 * @api {POST} http://wittsay.cc/v1/article [create]
	 * @apiGroup Article
	 * @apiDescription 创建一篇文章 需要登录
	 * @apiParam (body) {string} title 文章标题
	 * @apiParam (body) {string} content 文章内容
	 * @apiParam (body) {string} [thumbnail] 文章缩略图
	 * @apiParam (body) {array} [tags] 标签tags
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	create: async (req, res) =>{
		const {title, content, tags, thumbnail} = req.allParams()
		if (!title || !content) return res.badRequest({message: '缺少必要的文章参数'})
		if (content.length < 100){
			return res.badRequest({message: '文章过短'})
		}
		const abstract = trimHtml(content, {limit: 50}).html
		try {
			const created = await ArticleService.createArticle({
				title: title,
				content: content,
				thumbnail: thumbnail? thumbnail: '',
				tags: tags? tags: [],
				authorId: req.headers.userID,
				authorName: req.headers.username,
				abstract: abstract,
				articleType: 'isReview'
			})
			if (tags) TagService.saveTags(tags)

			res.ok(created)
		} catch (err){
			return res.serverError(err)
		}
	},

	/**
	 *
	 * @api {DELETE} http://wittsay.cc/v1/articles/:id [destroy]
	 * @apiGroup Article
	 * @apiParam (path) {string} id 文章id
	 * @apiDescription 删除指定文章 需要管理员或更高权限
	 * @apiUse PAGE
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	destroy: async () =>{
		const {id} = req.params
		if (!id) return res.badRequest({message: '需要文章id'})
		try {
			const updated = await ArticleService.updateArticle(id, {articleType: 'isDestroy'})
			res.ok(updated[0])
		} catch (err){
			return res.serverError()
		}
	},


	/**
	 *
	 * @api {GET} http://wittsay.cc/v1/articles/:keyword/search [search]
	 * @apiGroup Article
	 * @apiDescription 按关键字搜索文章 任何权限
	 * @apiParam (path) {string} keyword 关键字 (=allArticles返回全部)
	 * @apiUse PAGE
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	search: async (req, res) =>{
		const {keyword} = req.params
		const {page, per_page} = req.allParams()
		try {
			if (keyword === 'allArticles'){
				const allArticles = await ArticleService.findArticleAll(page, per_page)
				return res.ok(allArticles)
			}
			const searchArticles = await ArticleService.findArticleForKeyword(keyword, page, per_page)
			res.ok(searchArticles)
		} catch (err){
			res.serverError()
		}
	},

}