/**
 * Created by WittBulter on 16/8/4.
 */

const fs = require('fs')

module.exports = app =>{
	fs.readdirSync(__dirname).forEach(file =>{
		if (file == "index.js") return;
		require('./' + file.substr(0, file.indexOf('.')))(app)
	})

	app.use((req, res, next) =>{
		res.status(404)
		if (req.headers.accept && req.headers.accept.indexOf('application/json') >= 0) {
			return res.json({status:0,message:'请求地址未找到!'})
		}
		res.end('页面未找到')
	});

	app.use((err, req, res, next) =>{
		res.status(err.status || 500)
		if (req.headers.accept && req.headers.accept.indexOf('application/json') >= 0) {
			return res.json({status:0,message:'服务器错误(500)'})
		}
		res.end('服务器错误')
	});
}