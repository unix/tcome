/**
 * Created by WittBulter on 2016/10/20.
 * @description :: 评论模型
 */

module.exports = {
	attributes: {
		// 分别记录发起人, 发起文章, 目标id
		authorId: {
			type: 'string',
			required: true,
		},
		articleId: {
			type: 'string',
			required: true,
		},
		targetId: {
			type: 'string',
		},

		content: {
			type: 'string',
			required: true,
			minLength: 5
		},



	},
}