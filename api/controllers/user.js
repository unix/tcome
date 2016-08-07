/**
 * Created by WittBulter on 16/8/7.
 */

module.exports = {
	toLogin: (req, res) =>{
		res.status(200)
		return res.json({mesage: 'ok'})
	},
	toLogout: (req, res) =>{
		console.log('toLogout');
	}
}