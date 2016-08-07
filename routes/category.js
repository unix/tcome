/**
 * Created by WittBulter on 16/8/7.
 */

module.exports = (app, categoryController) =>{

	// 获取分类文章
	app.get('/category/:id/articles/:page', categoryController.getArticles)

}