/**
 * Created by WittBulter on 2017/1/10.
 */

modulex.exports = {
	attributes: {
		// 分别记录发起人, 目标人, 信息记录
		authorId: {
			type: 'string',
			required: true,
		},
		authorName: {
			type: 'string',
		},
		targetId: {
			type: 'string',
			required: true,
		},
		targetName: {
			type: 'string',
		},
		content: {
			type: 'array'
		}
	},
}