/**
 * Created by WittBulter on 16/8/7.
 */

module.exports = (app, controller) =>{
	// 注册 创建用户
	app.post('/user', (req, res) => controller.register(req, res))

	// 更新 修改用户信息
	app.put('/user', (req, res) => controller.register(req, res))
}