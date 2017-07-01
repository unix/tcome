/**
 * Created by WittBulter on 2017/1/31.
 */
const request = require('request')
const QiNiuCloud = require('qiniu')

// 个人qiniu密钥配置
QiNiuCloud.conf.ACCESS_KEY = process.env.QINIU_ACCESS_KEY
QiNiuCloud.conf.SECRET_KEY = process.env.QINIU_SECRET_KEY

module.exports = {

	/**
	 *
	 * @api {POST} http://wittsay.cc/v1/image [create]
	 * @apiGroup Image
	 * @apiDescription 上传一张图片 需要登录
	 * @apiParam (body) {string} image base64编码图片 转码后长度需小于2400000
	 * @apiParam (body) {string} size 图片原大小
	 * @apiUse CODE_200
	 * @apiUse CODE_500
	 */
	upload: (req, res) =>{
		let {image, size} = req.allParams()
		if (!image|| !size) return res.badRequest({message: '参数错误'})
		if (image.length > 2400000) return res.badRequest({message: '图片过大，请压缩后再尝试'})
		const token = new QiNiuCloud.rs.PutPolicy('static').token()
		if (image.includes('base64,')) image = image.split('base64,')[1]

		request({
			url: `http://up.qiniu.com/putb64/${size}`,
			port: 8080,
			method: 'POST',
			body: image,
			headers: {
				'User-Agent': 'nodejs',
				'Content-Type': 'application/octet-stream',
				'Authorization': `UpToken ${token}`,
			}
		}, (err, response, body) =>{
			if (err) return res.serverError(err)

			res.ok(body)
		})
	}
}