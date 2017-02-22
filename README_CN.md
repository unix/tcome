### T-COME, [English](https://github.com/WittBulter/tcome/blob/master/README.md)
#### 你最好的博客

[预览](http://wittsay.cc/) &nbsp; [接口文档](http://wittsay.cc/doc)  &nbsp; 

这是基于NodeJs,MongoDB的博客系统服务端，负责基础API服务。  

如需要与之契合的前端项目请前往[前端项目](https://github.com/WittBulter/tcome-frontend)

## 特性
* 支持登录注册，管理
* 任何用户均可发表文章，文章审核机制
* 文章支持评论
* 规范的RESTfulAPI，高度可扩展性
* 搜索与各类配置
* 优雅，可维护性高的代码
* 更多特性正在开发中...

## 开发
需要编译环境，具体配置请参阅[node-gyp](https://github.com/nodejs/node-gyp)
```sh
* 安装依赖
$ npm install

* 安装全局sails
$ sudo npm install sails -g

* 安装全局grunt (可选，如果你真的需要)
$ sudo npm install grunt -g
```


**运行:**
```sh
* node版本 < 7.6.0 (npm start = node --harmony-async-await app.js)
$ npm start
* node版本 >= 7.6.0
$ sails lift
```

**生成文档:**
```sh
$ npm install apidoc -g
$ npm run api
```

**创建sails:**
```sh

$ sails generate api <foo>

$ sails generate model <foo> [attribute1:type1, attribute2:type2 ... ]

$ sails generate controller <foo> [action1, action2, ...]
```


## 团队
TCOME由WittBulter开发，如果你需要加入开发团队，请联系我:

[![Witt Bulter](http://obqqxnnm4.bkt.clouddn.com/11304944.gif?imageView2/1/w/100)](https://github.com/WittBulter) |  
:---:|
[Witt Bulter](https://github.com/WittBulter) |



