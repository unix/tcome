/**
 * Created by WittBulter on 2016/10/12.
 * @description :: 文章相关逻辑
 */
const trimHtml = require('trim-html')

module.exports = {

	/**
	 *
	 * @api {GET} http://wittsay.cc/api/articles/:id [show]
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
	show: (req, res) =>{
		const {id} = req.params
		if (!id) {
			const {page, per_page} = req.allParams()
			return ArticleService.findArticleAll({
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
	 * @api {PUT} http://wittsay.cc/api/articles/:id [update]
	 * @apiGroup Article
	 * @apiDescription 修改指定文章 需要管理员权限或更高
	 * @apiParam (path) {string} id 文章id
	 * @apiParam (body) {string} [title] 文章标题
	 * @apiParam (body) {string} [content] 文章内容
	 * @apiParam (body) {string} [thumbnail] 标题图
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	update: (req, res) =>{
		const {id} = req.params
		const {title, content, thumbnail} = req.allParams()
		if (!id) return res.badRequest({message: '至少需要指定文章id'})
		if (!title && !content&& !thumbnail) return res.badRequest({message: '至少需要修改一项'})
		if (title.length < 5|| content.length < 5) return res.badRequest({message: '文章内容过少'})
		let article = {}
		if (title) article.title = title
		if (content) article.content = content
		if (thumbnail) article.thumbnail = thumbnail

		ArticleService.updateArticle(id, article, (err, updated) =>{
			if (err) return res.serverError()

			res.ok(updated[0])
		})

	},


	/**
	 *
	 * @api {POST} http://wittsay.cc/api/article [create]
	 * @apiGroup Article
	 * @apiDescription 创建一篇文章 需要登录
	 * @apiParam (body) {string} title 文章标题
	 * @apiParam (body) {string} content 文章内容
	 * @apiParam (body) {string} [thumbnail] 文章缩略图
	 * @apiParam (body) {array} [tags] 标签tags
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	create: (req, res) =>{
		const {title, content, tags, thumbnail} = req.allParams()
		if (!title || !content) return res.badRequest({message: '缺少body参数'})
		if (content.length < 100){
			return res.badRequest({message: '文章过短'})
		}
		const abstract = trimHtml(content, {limit: 50}).html

		ArticleService.createArticle({
			title: title,
			content: content,
			thumbnail: thumbnail? thumbnail: '',
			tags: tags? tags: [],
			authorId: req.headers.userID,
			authorName: req.headers.username,
			abstract: abstract,
			articleType: 'isReview'
		}, (err, created) =>{
			if (err) return res.serverError()

			res.ok(created)
		})

	},

	/**
	 *
	 * @api {DELETE} http://wittsay.cc/api/articles/:id [destroy]
	 * @apiGroup Article
	 * @apiParam (path) {string} id 文章id
	 * @apiDescription 删除指定文章 需要管理员或更高权限
	 * @apiUse PAGE
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	destroy: () =>{
		const {id} = req.params
		if (!id) return res.badRequest({message: '需要文章id'})

		ArticleService.updateArticle(id, {articleType: 'isDestroy'}, (err, updated) =>{
			if (err) return res.serverError()

			res.ok(updated[0])
		})
	},


	/**
	 *
	 * @api {GET} http://wittsay.cc/api/articles/:keyword/search [search]
	 * @apiGroup Article
	 * @apiDescription 按关键字搜索文章 任何权限
	 * @apiParam (path) {string} keyword 关键字
	 * @apiUse PAGE
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	search: (req, res) =>{
		const {keyword} = req.params
		const {page, per_page} = req.allParams()
		ArticleService.findArticleForKeyword(keyword, {
			page: page? page: 1,
			per_page: per_page? per_page: 14,
		}, (err, articles) =>{
			if (err) return res.serverError()

			res.ok(articles)
		})
	},

}