/**
 * Created by WittBulter on 16/8/7.
 */

module.exports = (app, categoryController) =>{
	app.get('/category/:id/articles/:page', (req, res) => categoryController.getArticles(req, res))
}