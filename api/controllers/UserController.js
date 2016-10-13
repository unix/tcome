/**
 * Created by WittBulter on 2016/10/12.
 * @description :: 管理用户及相关逻辑
 */


module.exports = {
	/**
	 *
	 * @api {GET} http://wittsay.cc/api/users/:id [show]
	 * @apiGroup Users
	 * @apiDescription 获取指定用户的信息
	 * @apiParam (path) {string} id 用户id
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	show: (req, res) =>{
		const id = req.params&& req.params.length? req.params[0]: ''
		if (!id) return res.badRequest({message: '至少需要用户id'})

		UserService.findUserForId(id, (err, userData) =>{
			if (err) return res.serverError()

			delete userData[0].password
			res.ok(userData[0])
		})
	}




}