/**
 * Created by WittBulter on 2017/2/18.
 */

module.exports = {
	findArticlesForTag: (tagString, done) =>{
		Article
			.find({
				where: {tags: {contains: tagString}},
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

	findTagsAll: (pageSize, done) =>{
		Tags
			.find({
				where: {},
				sort: {'createdAt': -1},
			})
			.paginate({limit: per_page? per_page: 14, page: page? page: 1,})
			.exec((err, tags) =>{
				if (err) return done(err)
				done(null, tags)
			})
	},
	findTagsForString: (tagName, done) =>{
		Tags
			.findOne({name: tagName})
			.exec((err, tag) =>{
				if (err) return done(err)
				done(null, tag)
			})
	},
	createTag: (tag, done) =>{
		Tags
			.create(tag)
			.exec((err, created) =>{
				if (err) return done(err)
				done(null, created)
			})
	},
	updateTagForID: (id, newTag, done) =>{
		Tags
			.update({id: id}, newTag)
			.exec((err, updated) =>{
				if (err) return done(err)
				done(null, updated)
			})
	},
	destroyTagForID: (id, done) =>{
		Tags
			.destroy({id: id})
			.exec(err =>{
				if (err) return done(err)
				done(null)
			})
	},

	// 非重要数据，不再回调与排除错误，仅作展示
	saveTags: (tags, done = () =>{}) =>{
		tags.forEach(v =>{
			TagService.findTagsForString(v, (err, tag) =>{
				if (tag&& tag.id){
					return TagService.updateTagForID(tag.id, Object.assign(tag, {value: tag.value + 1}),
						(err, updated) =>{}
					)
				}
				TagService.createTag({name: v, value: 1}, (err, tag) =>{})
			})
		})
	}
}