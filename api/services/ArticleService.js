/**
 * Created by WittBulter on 2016/10/12.
 * @description :: 文章相关服务
 *
 */


module.exports = {
	findArticleForID: id =>{
		return Article.findOne({id: id})
	},
	findArticleCount: _ =>{
		return Article.count({})
	},
	findArticleAll: (page, per_page) =>{
		return Article
			.find({
				where: {articleType: 'isActive'},
				sort: {'createdAt': -1},
			}, {
				fields: ['id', 'title', 'createdAt', 'readTotal', 'commentTotal', 'authorName', 'thumbnail', 'abstract']
			})
			.paginate({limit: per_page? per_page: 14, page: page? page: 1,})
	},
	findReviewForType: (type, page, per_page) =>{
		const where = !type || type == 'all'? {articleType: {'!': ['isDestroy']}}: {articleType: type}
		return Article
			.find({
				where: where,
				sort: {'createdAt': -1},
			}, {
				fields: ['id', 'title', 'createdAt', 'readTotal', 'commentTotal', 'authorName', 'thumbnail', 'articleType', 'abstract']
			})
			.paginate({limit: per_page? per_page: 14, page: page? page: 1,})
	},


	updateArticle: (id, newArticle) =>{
		return Article.update({id: id}, newArticle)
	},

	createArticle: article =>{
		return Article.create(article)
	},

	destroyArticleForID: id =>{
		return Article.destroy({id: id})
	},

	findArticleForKeyword: (keyword, page, per_page) =>{
		return Article
			.find({
				where: {
					title: {'contains': keyword},
					articleType: 'isActive'
				},
				sort: {'createdAt': -1},
			}, {
				fields: ['id', 'title', 'createdAt', 'readTotal', 'commentTotal', 'authorName', 'thumbnail']
			})
			.paginate({limit: per_page? per_page: 14, page: page? page: 1,})
	}

}