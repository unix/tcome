/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

	/***************************************************************************
	 *                                                                          *
	 * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
	 * etc. depending on your default view engine) your home page.              *
	 *                                                                          *
	 * (Alternatively, remove this and add an `index.html` file in your         *
	 * `assets` directory)                                                      *
	 *                                                                          *
	 ***************************************************************************/

	// 'GET /doc': (req, res) =>{
	// 	res.send(__dirname)
	// },
	// '/*': {policy: 'selectApiVersion', skipAssets: true},

	// 用户登录
	'post /v1/session': 'AuthController.login',
	// 用户登出 注销session
	'delete /v1/session': 'AuthController.logout',

	// 文章
	'get /v1/articles': 'ArticleController.show',
	'get /v1/articles/:id': 'ArticleController.show',
	'post /v1/article': 'ArticleController.create',
	'put /v1/articles/:id': 'ArticleController.update',
	'delete /v1/articles/:id': 'ArticleController.destroy',

	// 文章评论
	'get /v1/articles/:id/comment': 'CommentController.show',
	'post /v1/articles/:id/comment': 'CommentController.create',
	'delete /v1/comments/:id': 'CommentController.destroy',

	// 审核文章
	'get /v1/reviews': 'ReviewController.show',
	'get /v1/reviews/:id': 'ReviewController.show',
	'put /v1/reviews/:id/active': 'ReviewController.update',

	// 用户
	'get /v1/users/:id': 'UserController.show',
	'get /v1/users/:id/:resource': 'UserController.resource',
	'post /v1/users/:id/validate': 'UserController.validate',
	'get /v1/user/type': 'UserController.userType',
	'post /v1/user': 'UserController.create',




	/***************************************************************************
	 *                                                                          *
	 * Custom routes here...                                                    *
	 *                                                                          *
	 * If a request to a URL doesn't match any of the custom routes above, it   *
	 * is matched against Sails route blueprints. See `config/blueprints.js`    *
	 * for configuration options and examples.                                  *
	 *                                                                          *
	 ***************************************************************************/

};
