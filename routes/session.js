/**
 * Created by WittBulter on 16/8/6.
 */


module.exports = (app, AuthController) =>{
	// 登录
	app.post('/session', AuthController.toLogin)



}