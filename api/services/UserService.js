/**
 * Created by WittBulter on 16/8/25.
 * @description :: 用户相关服务
 */

const bcrypt = require('bcrypt')
const request = require('request')
const email = require('../../config/email')
const nodemailer = require('nodemailer')

const makeMailHtml = (user) =>{
	return `
			<div style="padding:0;width:798px;overflow:hidden;margin:0 auto;font-family:'Microsoft YaHei';font-size:14px;border:solid 1px #ddd">
			<div class="m_3988312461716272715adM adM">	
			</div><div style="width:100%;min-height:120px;margin:0 0 54px;background:#136fb8">
			<div class="m_3988312461716272715adM adM">    	</div>
			<span style="font-size:28px;line-height:36px;font-family:'Microsoft YaHei';color:#fff;float:left;margin:38px 0 0 48px">
			维特博客 · <span class="il">WittSay</span>.cc</span>        
			<em style="float:right;font-size:18px;line-height:30px;color:#fff;margin:48px 64px 0 0">专注&nbsp;沉淀&nbsp;讨论</em>    
			</div> <div style="margin:0;padding:0 0 0 49px">    	
			<h3 style="margin:0;font-size:16px;color:#333333;line-height:24px">维特博客帐号激活</h3>        
			<p style="margin:0;padding:20px 0 12px 0;color:#555555">您好！您于刚刚注册维特博客账号，请在24小时内点击以下链接，<wbr>完成操作：</p>
			
	        <a href="http://test.wittsay.cc/register/${user.id}/${user.token}" 
	        style="margin:0;line-height:18px;color:#78c1f6;font-size:12px" target="_blank" >
	        http://test.wittsay.cc/register/${user.id}/${user.token} </a>        
	        <p style="color:#999999;margin:0;padding:10px 0 80px 0">(若无法点击链接请复制到地址栏访问；您若未注册维特博客请忽略<wbr>此邮件，敬请谅解)</p>
            <div style="margin:0;padding:0;width:682px;border-bottom:#999999 solid 1px"></div>        
            <h2 style="padding:0;font-size:16px;line-height:24px;font-weight:normal;color:#333333;font-style:italic;margin:22px 0 22px 0">感谢您的注册</h2>
            <p style="margin:0;padding:0 0 10px;line-height:22px;width:100%;overflow:hidden">
           
            </div><div style="width:700px;padding:0 49px;margin:0;min-height:61px;background:#f2f2f2">    	
            <span style="float:left;line-height:61px;color:#999999">本邮件由维特博客系统自动发出，请勿直接回复</span>        
            <span style="float:right;line-height:61px;color:#999999">© support · 维特博客  <span class="il">WittSay</span>.cc</span>
            <div class="yj6qo"></div><div class="adL"> </div></div><div class="adL"> </div></div><div class="adL"></div>
		`
}

module.exports = {
	/**
	 *
	 * @param userMail {string} 用户邮件地址
	 * @param done {function} 回调参数
	 * @return done {obj| array} (错误信息| 已创建用户)
	 * @description :: 按邮箱地址查询用户
	 */
	findUserForMail: (email, done) =>{
		User
			.findOne({email: email})
			.exec((err, user) =>{
				if (err) return done(err)
				done(null, user)
			})
	},

	/**
	 *
	 * @param userMail {string} 用户邮件地址
	 * @param done {function} 回调参数
	 * @description :: 按邮箱地址查询用户
	 */
	findUserForId: (id, done) =>{
		User
			.findOne({id: id})
			.exec((err, userData) =>{
				if (err) return done(err)
				done(null, userData)
			})
	},

	/**
	 *
	 * @param filter {any} 过滤条件
	 * @param cb {function} 回调参数
	 * @return cb {obj| array} (错误信息| 已创建用户)
	 * @description :: 查询所有用户
	 */
	findUserAll: (filter = null, cb) =>{
		User
			.find({})
			.exec((err, dataArray) =>{
				if (err) return cb(err)
				cb(null, dataArray)
			})
	},

	findUserType: (filter = undefined, done) =>{
		done(null, User.getDefault())
	},

	/**
	 *
	 * @param user {obj} 用户对象
	 * @param cb {function} 回调参数
	 * @return cb {obj| obj} (错误信息| 已创建用户)
	 * @description :: 按对象创建用户
	 */
	createUser: (user, cb) =>{
		User
			.create(user)
			.exec((err, created) =>{
				if (err) return cb(err)
				cb(null, created)
			})
	},

	/**
	 *
	 * @param oldPassword {string} 用户原密码
	 * @param newPassword {string} 用户新密码
	 * @param done {func} 回调函数
	 */
	compareUser: (newPassword, oldPassword, done) =>{
		bcrypt.compare(newPassword, oldPassword, (err, res) =>{
			if (err) return done(err)
			if (!res) return done(null, false)
			done(null, true)
		})
	},

	updateUserForID: (id, newUser, done) =>{
		User
			.update({id: id}, newUser)
			.exec((err, updated) =>{
				if (err) return done(err)
				done(null, updated)
			})
	},

	sendMail: (user, done) =>{
		const mailOptions = {
			from: '维特博客<support@wittsay.cc>', // sender address mailfrom must be same with the user
			to: user.email, // list of receivers
			subject: user.subject, // Subject line
			html: makeMailHtml(user), // html body
		}
		const transporter = nodemailer.createTransport({
			"host": email.mailhost,
			"port": 25,
			"secureConnection": false, // use SSL
			"auth": {
				"user": email.user,
				"pass": email.pass
			}
		})
		transporter.sendMail(mailOptions, (err, info) =>{
			if(err) return done(err, info)
			done(info)
		})

	},
	findArticle: (id, done) =>{
		Article
			.find({authorId: id})
			.exec((err, articles) =>{
				if (err) return done(err)
				done(null, articles)
			})
	},
	findComment: (id, done) =>{
		Comment
			.find({authorId: id, sort: 'createdAt DESC' })
			.paginate({limit: 5})
			.exec((err, comments) =>{
				if (err) return done(err)
				done(null, comments)
			})
	},

}