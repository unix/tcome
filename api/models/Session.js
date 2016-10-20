/**
 * Created by WittBulter on 2016/10/12.
 * @description :: 储存用户会话资料
 */

module.exports = {
	attributes: {
		email: {
			type: 'email',
			required: true
		},
		clientToken: {
			type: 'string',
		},
		userID: {
			type: 'string'
		},
		userName: {
			type: 'string'
		}
	}
}