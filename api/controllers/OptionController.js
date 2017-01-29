/**
 * Created by WittBulter on 2017/1/29.
 */

module.exports = {

	/**
	 *
	 * @api {GET} http://wittsay.cc/api/option [show]
	 * @apiGroup Option
	 * @apiDescription 查看博客基础信息
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	show: (req, res) =>{
		OptionService.findOptionAll('', (err, options) =>{
			if (err) return res.serverError()

			if (options && options[0]) return res.ok(options[0])
			return res.ok({})
		})
	},

	/**
	 *
	 * @api {PUT} http://wittsay.cc/api/option [update]
	 * @apiGroup Option
	 * @apiDescription 修改博客基础信息(如果没有则自动创建) 需要管理员权限或更高
	 * @apiParam (path) {string} [blogName] 博客名称
	 * @apiParam (body) {string} [blogSubhead] 博客副标题
	 * @apiParam (body) {array} [recommended] 博客推荐文章 每一项为文章对象
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	update: (req, res) =>{
		const {blogName, blogSubhead, recommended} = req.allParams()
		if (!blogName && !blogSubhead && !recommended){
			return res.badRequest({message: '至少需要修改一项'})
		}
		let option = {}
		if (blogName) option.blogName = blogName
		if (blogSubhead) option.blogSubhead = blogSubhead
		if (recommended&& recommended[0]) option.recommended = recommended

		const create = (option, res) =>{
			OptionService.createOption(option, (err, created)=>{
				if (err) return res.serverError()
				return res.ok(created)
			})
		}
		OptionService.findOptionAll('', (err, options) =>{
			if (err) return res.serverError()

			if (options.length == 0) return create(option, res)
			OptionService.updateOptionForID(options[0].id, option, (err, updated) =>{
				if (err) return res.serverError()

				res.ok(updated[0])
			})
		})
	}
}