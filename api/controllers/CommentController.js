/**
 * Created by WittBulter on 2016/10/20.
 * @description :: 评论相关逻辑
 */

module.exports = {

	/**
	 *
	 * @api {GET} http://wittsay.cc/api/comment/:id [show]
	 * @apiGroup Article
	 * @apiDescription 获取指定文章详细信息 任何权限
	 * @apiParam (path) {string} [id] 文章id
	 * @apiUse PAGE
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	show: (req, res) =>{

	},




	/**
	 *
	 * @api {POST} http://wittsay.cc/api/articles/:id [show]
	 * @apiGroup Article
	 * @apiDescription 获取指定文章详细信息 任何权限
	 * @apiParam (path) {string} id 需要评论的文章id
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */

	create: (req, res) =>{

	},


	destroy: (req, res) =>{

	}



}
