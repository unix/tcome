/**
 * Created by WittBulter on 2016/10/12.
 * @description :: 文章模型
 */


const map = () => this.tags.forEach(tag => emit(tag, 1))
const reduce = (k, values) =>{
	let total = 0
	values.forEach(value => total += value)
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
		tags: {
			type: 'array'
		},

	},

	afterCreate: (article, done) =>{
		this.updateTags()
		done()
	},

	updateTags: () =>{
		Article.native((err, collection) =>{
			if (err) return res.serverError(err)
			collection.mapReduce(map, reduce, {out: 'tags'})
		})
	}
}
