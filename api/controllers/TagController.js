/**
 * Created by WittBulter on 2017/2/18.
 * @description :: article tag controller
 */

module.exports = {
	/**
	 *
	 * @api {GET} http://wittsay.cc/v1/articles/:tag/tag[show]
	 * @apiGroup Tag
	 * @apiDescription 获取指定tag下的文章列表
	 * @apiParam (path) {string} [tag] 标签名
	 * @apiUse PAGE
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 * @apiSuccessExample {json} Response 400 Example
	 *   HTTP/1.1 400 Interface Error
	 *   {
	 *     "code": 400,
	 *     "message": "xxx"
	 *   }
	 */
	showArticles: (req, res) =>{
		const {tag} = req.params
		if (!tag|| tag.length > 30) return res.badRequest({message: '需要正确的tag名'})

		TagService.findArticlesForTag(tag, (err, articles) =>{
			if (err) return res.serverError(err)

			res.ok(articles)
		})
	},

	/**
	 *
	 * @api {GET} http://wittsay.cc/v1/tags [showTags]
	 * @apiGroup Tag
	 * @apiDescription 获取所有tag 无需权限
	 * @apiParam (path) {string} [tag] 标签名
	 * @apiUse PAGE
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 * @apiSuccessExample {json} Response 400 Example
	 *   HTTP/1.1 400 Interface Error
	 *   {
	 *     "code": 400,
	 *     "message": "xxx"
	 *   }
	 */
	showTags: (req, res) =>{
		const {page, per_page} = req.allParams()

		TagService.findTagsAll({
			page: page? page: 1,
			per_page: per_page? per_page: 14,
		}, (err, tags) =>{
			if (err) return res.serverError(err)

			res.ok(tags)
		})
	}
}