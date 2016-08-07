/**
 * Created by WittBulter on 16/8/7.
 */

module.exports = {
	success: (res, code = 200) =>{
		res.status(code)
		res.json({message: 'success'})
	},
	serverError: (res, code = 500) =>{
		res.status(code)
		res.json({message: 'server error'})
	},
	parameterError: (res, code = 403) =>{
		res.status(code)
		res.json({message: 'parameter error'})
	}
}