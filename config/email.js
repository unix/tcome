/**
 * Created by WittBulter on 2016/10/25.
 * @description ::  邮件相关服务支持
 */
const {email} = require('../ecosystem.config')

/**
 *
 * @type {{mailhost: string, user: string, pass: string, support: string}}
 * @description ::
 *  这是email链接信息配置，默认使用的是sendcloud
 *  如果你参与此项目开发，请联系此项目所有者 或自行配置
 *  配置格式与此相同即可
 */
module.exports = {

	mailhost: email.mailhost,
	user: email.user,
	pass: email.pass,
	support: email.support
}