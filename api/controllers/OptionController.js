/**
 * Created by WittBulter on 2017/1/29.
 */

module.exports = {

	/**
	 *
	 * @api {GET} http://wittsay.cc/v1/option [show]
	 * @apiGroup Option
	 * @apiDescription 查看博客基础信息
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	show: async (req, res) =>{
		try{
			const options = await OptionService.findOptionAll()
			if (!options || !options[0]) return res.ok({})
			const promises = options[0].recommended.map(id => ArticleService.findArticleForID(id))
			const recommended = await Promise.all(promises)

			return res.ok(Object.assign(options[0], {recommended: recommended}))
		} catch (err){
			return res.serverError()
		}
	},

	/**
	 *
	 * @api {PUT} http://wittsay.cc/v1/option [update]
	 * @apiGroup Option
	 * @apiDescription 修改博客基础信息(如果没有则自动创建) 需要管理员权限或更高
	 * @apiParam (path) {string} [blogName] 博客名称
	 * @apiParam (body) {string} [blogSubhead] 博客副标题
	 * @apiParam (body) {string[]} [recommended] 博客推荐文章 每一项为文章id
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	update: async (req, res) =>{
		const {blogName, blogSubhead, recommended} = req.allParams()
		if (!blogName && !blogSubhead && !recommended){
			return res.badRequest({message: '至少需要修改一项'})
		}
		let option = {}
		if (blogName) option.blogName = blogName
		if (blogSubhead) option.blogSubhead = blogSubhead
		if (recommended && recommended[0]) option.recommended = recommended.filter(v => typeof v === 'string')

		try{
			const allOptions = await OptionService.findOptionAll()
			if (!allOptions || allOptions.length == 0){
				const created = await OptionService.createOption(option)
				return res.ok(created)
			}
			const [updated] = await OptionService.updateOptionForID(allOptions[0].id, option)
			const promises = updated.recommended.map(id => ArticleService.findArticleForID(id))
			const recommended = await Promise.all(promises)

			res.ok(Object.assign(updated, {recommended: recommended}))
		} catch (err){
			return res.serverError()
		}
	}
}