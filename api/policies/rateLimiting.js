/**
 * Created by WittBulter on 2016/10/20.
 * @param req
 * @param res
 * @param next
 * @description :: ratelimting 流量限制
 */
module.exports = async (req, res, next) =>{
	const intervalTimeInMillisecond = 300000
	const userID = req.headers.userID
	try {
		const archives = await CommentService.findCommentForUser(userID)
		if (!archives || archives.length == 0) return next()
		const time = new Date().getTime() - new Date(archives[0].createdAt).getTime()

		if (time < intervalTimeInMillisecond) return res.forbidden({message: '距离上次调用接口不足30秒'})
		return next()
	} catch (err){
		return res.serverError(err)
	}
}