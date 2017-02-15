/**
 * Created by WittBulter on 2016/10/12.
 * @description :: 文章相关服务
 *
 */


module.exports = {
	findArticleForID: (id, done) =>{
		Article
			.findOne({id: id})
			.exec((err, article) =>{
				if (err) return done(err)
				done(null, article)
			})
	},
	findArticleCount: done =>{
		Article
			.count({})
			.exec((err, count) =>{
				if (err) return done(err)
				done(null, count)
			})
	},
	findArticleAll: (pageSize, done) =>{
		const {page, per_page} = pageSize
		Article
			.find({
				where: {articleType: 'isActive'},
				sort: {'createdAt': -1},
			}, {
				fields: ['id', 'title', 'createdAt', 'readTotal', 'commentTotal', 'authorName', 'thumbnail', 'abstract']
			})
			.paginate({limit: per_page? per_page: 14, page: page? page: 1,})
			.exec((err, articles) =>{
				if (err) return done(err)
				done(null, articles)
			})
	},
	findReviewAll: (query, done) =>{
		const {page, per_page, status} = query
		const where = !status || status == 'all'? {articleType: {'!': ['isDestroy']}}: {articleType: status}
		Article
			.find({
				where: where,
				sort: {'createdAt': -1},
			}, {
				fields: ['id', 'title', 'createdAt', 'readTotal', 'commentTotal', 'authorName', 'thumbnail', 'articleType', 'abstract']
			})
			.paginate({limit: per_page? per_page: 14, page: page? page: 1,})
			.exec((err, articles) =>{
				if (err) return done(err)
				done(null, articles)
			})
	},


	updateArticle: (id, newArticle, done) =>{
		Article
			.update({id: id}, newArticle)
			.exec((err, updated) =>{
				if (err) return done(err)
				done(null, updated)
			})
	},

	createArticle: (article, done) =>{
		Article
			.create(article)
			.exec((err, created) =>{
				if (err) return done(err)
				done(null, created)
			})
	},

	destroyArticleForID: (id, done) =>{
		Article
			.destroy({id: id})
			.exec(err =>{
				if (err) return done(err)
				done(null)
			})
	},

	findArticleForKeyword: (keyword, pageSize, done) =>{
		const {page, per_page} = pageSize
		Article
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
			.exec((err, articles) =>{
				if (err) return done(err)
				done(null, articles)
			})
	}

}