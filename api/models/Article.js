/**
 * Created by WittBulter on 2016/10/12.
 * @description :: 文章模型
 */


const map = function (){
	this.tags.forEach(tag => emit(tag, 1))
}
const reduce = function (k, values){
	var total = 0
	for (var i = 0; i < values.length; i++) {
		total += values[i];
	}
	return total
}

module.exports = {
	attributes: {
		title: {
			type: 'string',
			required: true,
			minLength: 1,
			maxLength: 50
		},
		content: {
			type: 'string',
			required: true,
			minLength: 5
		},
		abstract: {
			type: 'string',
			required: true
		},
		thumbnail: {
			type: 'string',
		},
		tags: {
			type: 'array'
		},
		authorName: {
			type: 'string',
		},
		authorId: {
			type: 'string',
			required: true,
		},
		readTotal: {
			type: 'integer',
			defaultsTo: 1
		},
		commentTotal: {
			type: 'integer',
			defaultsTo: 0
		},
		articleType: {
			type: 'string',
			enum: ['isReview', 'isActive', 'isDestroy'],
			required: true
		}

	},

	afterCreate: (article, done) =>{
		Article.native((err, collection) =>{
			if (err) return res.serverError(err)
			collection.mapReduce(map, reduce, {out: 'tags'})
		})
		done()
	},

}
