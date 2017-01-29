/**
 * Created by WittBulter on 2017/1/29.
 * @description :: 博客基本配置信息
 */

module.exports = {
	attributes: {
		blogName: {
			type: 'string',
			required: true,
			defaultsTo: '维特博客'
		},
		blogSubhead: {
			type: 'string'
		},
		recommended: {
			type: 'array'
		}
	}
}