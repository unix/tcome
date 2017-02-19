/**
 * Created by WittBulter on 2017/2/18.
 */

module.exports = {
	findArticlesForTag: tagString =>{
		return Article
			.find({
				where: {tags: {contains: tagString}},
				sort: {'createdAt': -1},
			}, {
				fields: ['id', 'title', 'createdAt', 'readTotal', 'commentTotal', 'authorName', 'thumbnail', 'articleType', 'abstract']
			})
			.paginate({limit: per_page? per_page: 14, page: page? page: 1,})
	},

	findTagsAll: (page, per_page) =>{
		return Tags
			.find({
				where: {},
				sort: {'createdAt': -1},
			})
			.paginate({limit: per_page? per_page: 14, page: page? page: 1,})
	},
	findTagsForString: tagName =>{
		return Tags.findOne({name: tagName})
	},
	createTag: tag =>{
		return Tags.create(tag)
	},
	updateTagForID: (id, newTag) =>{
		return Tags.update({id: id}, newTag)
	},
	destroyTagForID: id =>{
		return Tags.destroy({id: id})
	},

	// 非重要数据，不再回调与排除错误，仅作展示
	saveTagsAsync: async (tags) =>{
		try {
			for (let tag of tags){
				const tagObject = await TagService.findTagsForString(tag)
				if (!tagObject|| !tagObject.id){
					return await TagService.createTag({name: tag, value: 1})
				}
				await TagService.updateTagForID(tagObject.id, Object.assign(tagObject, {value: tagObject.value + 1}))
			}
		} catch (err){
			return Promise.reject(err)
		}
	}
}