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
	showArticles: async (req, res) =>{
		const {tag} = req.params
		if (!tag|| tag.length > 30) return res.badRequest({message: '需要正确的tag名'})
		try {
			const articles = await TagService.findArticlesForTag(tag)
			res.ok(articles)
		} catch (err){
			return res.serverError(err)
		}
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
	showTags: async (req, res) =>{
		const {page, per_page} = req.allParams()
		try {
			const tags = await TagService.findTagsAll(page, per_page)
			res.ok(tags)
		} catch (err){
			return res.serverError(err)
		}
	}
}