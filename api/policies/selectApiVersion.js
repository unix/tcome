/**
 * Created by WittBulter on 2016/12/24.
 * @description :: Api version
 */

module.exports = function (req, res, next) {
  if (req.url.startsWith('/v1')) {
    req.url = req.url.split('/v1')[1]
    return next()
  }
  return res.notFound()
}
