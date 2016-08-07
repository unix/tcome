/**
 * Created by WittBulter on 16/8/6.
 */


module.exports = (app, AuthController) =>{
	app.post('/session', (req, res) => AuthController.toLogin(req, res))
}