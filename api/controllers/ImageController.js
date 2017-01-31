/**
 * Created by WittBulter on 2017/1/31.
 */

module.exports = {

	/**
	 *
	 * @api {POST} http://wittsay.cc/api/image [create]
	 * @apiGroup Image
	 * @apiDescription 上传一张图片 需要登录
	 * @apiParam (body) {string} image 图片
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	upload: (req, res) =>{
		// const {image} = req.allParams()
		// console.log(image);

		res.ok({message: 'ok'})
	}
}