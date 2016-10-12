/**
 * Created by WittBulter on 2016/10/12.
 * @description :: 文章相关逻辑
 */

module.exports = {

	/**
	 *
	 * @api {GET} http://wittsay.cc/api/article/:id [logout]
	 * @apiGroup Article
	 * @apiDescription 获取指定文章详细信息 任何权限
	 * @apiParam (path) {string} id 文章id
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 * @apiSuccessExample {json} Response 400 Example
	 *   HTTP/1.1 400 Interface Error
	 *   {
	 *     "code": 400,
	 *     "message": "xxx"
	 *   }
	 */

	show: (req, res) =>{
		const id = req.params&& req.params.length? req.params[0]: ''
		if (!id) return res.badRequest({message: '至少需要指定文章id'})




	}


}