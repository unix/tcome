/**
 * Created by WittBulter on 16/8/4.
 */

const fs = require('fs')

module.exports = app =>{
	fs.readdirSync(__dirname).forEach(file =>{
		if (file == "index.js") return;
		let thisController;
		try {
			thisController = require(`${global.__APP_PATH}/api/controllers/${file}`)
		} catch (err) {
			console.log(`无法找到路由对应的控制器[${file}], 错误信息: ${err}`);
		}
		require(`${global.__APP_PATH}/routes/${file}`)(app, thisController)
	})

	app.use((req, res, next) =>{
		res.status(404)
		if (req.headers['content-type'].includes('application/json')) {
			return res.json({status:0,message:'请求地址未找到!'})
		}
		res.end('页面未找到')
	});

	app.use((err, req, res, next) =>{
		res.status(err.status || 500)
		if (req.headers['content-type'].includes('application/json')) {
			return res.json({status:0,message:'服务器错误(500)'})
		}
		res.end('服务器错误')
	});
}